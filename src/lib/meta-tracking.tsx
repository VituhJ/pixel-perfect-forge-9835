import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useEffect, useRef } from "react";
import { CHECKOUT_URL, PRODUCT } from "@/content";

export const META_PIXEL_ID = "1681485950220760";

export const META_PIXEL_BOOTSTRAP = `
  (function(f,b,e,v,n,t,s){
    if (f.location.hostname === "127.0.0.1" || f.location.hostname === "localhost") return;
    if (f.fbq) return;
    n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=true;n.version="2.0";n.queue=[];
    t=b.createElement(e);t.async=true;t.src=v;
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
  })(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
  if (window.fbq) {
    window.fbq("init", "${META_PIXEL_ID}");
    var pageViewEventId = "pageview:" + (window.crypto && window.crypto.randomUUID
      ? window.crypto.randomUUID()
      : Date.now() + "-" + Math.random().toString(36).slice(2));
    window.__META_INITIAL_PAGEVIEW_EVENT_ID = pageViewEventId;
    window.fbq("track", "PageView", {}, { eventID: pageViewEventId });
  }
`;

type MetaEventName = "PageView" | "InitiateCheckout";

type MetaEventInput = {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl: string;
  clientUserAgent?: string | undefined;
  fbp?: string | undefined;
  fbc?: string | undefined;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
    __META_INITIAL_PAGEVIEW_EVENT_ID?: string;
  }
}

type MetaPixelFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
  queue?: unknown[][];
};

function validateMetaEvent(data: MetaEventInput): MetaEventInput {
  if (data.eventName !== "PageView" && data.eventName !== "InitiateCheckout") {
    throw new Error("Evento do Meta Pixel inválido");
  }
  if (!/^[a-zA-Z0-9._:-]{12,160}$/.test(data.eventId)) {
    throw new Error("Identificador de evento inválido");
  }
  const sourceUrl = new URL(data.eventSourceUrl);
  if (sourceUrl.protocol !== "https:" && sourceUrl.protocol !== "http:") {
    throw new Error("URL de origem inválida");
  }
  return {
    eventName: data.eventName,
    eventId: data.eventId,
    eventSourceUrl: sourceUrl.toString().slice(0, 2048),
    clientUserAgent: data.clientUserAgent?.slice(0, 512),
    fbp: data.fbp?.slice(0, 255),
    fbc: data.fbc?.slice(0, 255),
  };
}

const sendMetaConversionEvent = createServerFn({ method: "POST" })
  .validator(validateMetaEvent)
  .handler(async ({ data }) => {
    const accessToken = process.env["META_CAPI_ACCESS_TOKEN"];
    if (!accessToken) return { sent: false, reason: "not_configured" as const };

    const pixelId = process.env["META_PIXEL_ID"] || META_PIXEL_ID;
    const apiVersion = process.env["META_GRAPH_API_VERSION"] || "v24.0";
    const { getRequest } = await import("@tanstack/react-start/server");
    const request = getRequest();
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientIp = request.headers.get("cf-connecting-ip")
      || request.headers.get("true-client-ip")
      || request.headers.get("x-real-ip")
      || request.headers.get("fly-client-ip")
      || forwardedFor;
    const userAgent = data.clientUserAgent || request.headers.get("user-agent");

    const userData: Record<string, string> = {};
    if (clientIp) userData["client_ip_address"] = clientIp;
    if (userAgent) userData["client_user_agent"] = userAgent;
    if (data.fbp) userData["fbp"] = data.fbp;
    if (data.fbc) userData["fbc"] = data.fbc;

    const event: Record<string, unknown> = {
      event_name: data.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: data.eventId,
      event_source_url: data.eventSourceUrl,
      action_source: "website",
      user_data: userData,
    };

    if (data.eventName === "InitiateCheckout") {
      event["custom_data"] = {
        currency: "BRL",
        value: 15,
        content_name: PRODUCT,
        content_type: "product",
      };
    }

    const body: Record<string, unknown> = { data: [event] };
    if (process.env["META_TEST_EVENT_CODE"]) body["test_event_code"] = process.env["META_TEST_EVENT_CODE"];

    const endpoint = new URL(`https://graph.facebook.com/${apiVersion}/${pixelId}/events`);
    endpoint.searchParams.set("access_token", accessToken);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const message = (await response.text()).slice(0, 500);
      console.error(`Meta Conversions API rejeitou o evento (${response.status}): ${message}`);
      return { sent: false, reason: "meta_api_error" as const };
    }

    const result = await response.json().catch(() => ({})) as { events_received?: number };
    console.info("Meta Conversions API aceitou o evento", {
      eventName: data.eventName,
      eventsReceived: result.events_received ?? null,
    });
    return { sent: true };
  });

function isLocalPreview() {
  return window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
}

function createEventId(prefix: string) {
  const randomPart = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}:${randomPart}`;
}

function getCookie(name: string) {
  const prefix = `${name}=`;
  const value = document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(prefix));
  return value ? decodeURIComponent(value.slice(prefix.length)) : undefined;
}

function setTrackingCookie(name: string, value: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=7776000; Path=/; SameSite=Lax${secure}`;
  return value;
}

function ensureFbp() {
  const existing = getCookie("_fbp");
  if (existing) return existing;
  const random = Math.floor(100000000 + Math.random() * 900000000);
  return setTrackingCookie("_fbp", `fb.1.${Date.now()}.${random}`);
}

function ensureFbc() {
  const existing = getCookie("_fbc");
  if (existing) return existing;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return undefined;
  return setTrackingCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`);
}

function loadMetaPixel() {
  if (window.fbq) return;

  const fbq: MetaPixelFunction = (...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else fbq.queue?.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
}

export function MetaTracking() {
  const sendServerEvent = useServerFn(sendMetaConversionEvent);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || isLocalPreview()) return;
    initialized.current = true;
    loadMetaPixel();

    const sendEvent = (
      eventName: MetaEventName,
      eventId = createEventId(eventName.toLowerCase()),
      browserEventAlreadySent = false,
    ) => {
      const fbp = ensureFbp();
      const fbc = ensureFbc();
      const customData = eventName === "InitiateCheckout"
        ? { currency: "BRL", value: 15, content_name: PRODUCT, content_type: "product" }
        : {};

      if (!browserEventAlreadySent) {
        window.fbq?.("track", eventName, customData, { eventID: eventId });
      }
      void sendServerEvent({
        data: {
          eventName,
          eventId,
          eventSourceUrl: window.location.href,
          clientUserAgent: window.navigator.userAgent,
          fbp,
          fbc,
        },
      }).catch(() => {
        // Browser tracking continues even if the server event is temporarily unavailable.
      });
    };

    const initialPageViewEventId = window.__META_INITIAL_PAGEVIEW_EVENT_ID;
    sendEvent(
      "PageView",
      initialPageViewEventId || createEventId("pageview"),
      Boolean(initialPageViewEventId),
    );

    const handleCheckoutClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.href !== new URL(CHECKOUT_URL, window.location.href).href) return;
      sendEvent("InitiateCheckout");
    };

    document.addEventListener("click", handleCheckoutClick, true);
    return () => document.removeEventListener("click", handleCheckoutClick, true);
  }, [sendServerEvent]);

  return null;
}

