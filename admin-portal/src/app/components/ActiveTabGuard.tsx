/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";

export default function ActiveTabGuard() {
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || startedRef.current) return;
    startedRef.current = true;

    const host = window.location.hostname;
    const allowedHosts = [
      "uat-admin-daos.primebank.com.bd",
      "admin-daos.primebank.com.bd",
    ];
    if (!allowedHosts.includes(host)) return;

    const HEARTBEAT_INTERVAL = 1000;

    let hbTimer: number | null = null;

    const startBeats = (post: (msg: any) => void) => {
      // start immediately so SW sees a beat right away
      post({ type: "heartbeat", timestamp: Date.now() });
      hbTimer = window.setInterval(() => {
        post({ type: "heartbeat", timestamp: Date.now() });
      }, HEARTBEAT_INTERVAL);
    };

    const stopBeats = () => {
      if (hbTimer) {
        clearInterval(hbTimer);
        hbTimer = null;
      }
    };

    const postToSW = (reg: ServiceWorkerRegistration) => (msg: any) => {
      // Prefer controller, fall back to active worker (first-load cases)
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(msg);
      } else if (reg.active) {
        reg.active.postMessage(msg);
      }
    };

    (async () => {
      if (!("serviceWorker" in navigator)) return;

      // Register with root scope so it controls all pages under the origin
      const reg = await navigator.serviceWorker.register(
        "/heartbeat-worker.js",
        {
          scope: "/",
        }
      );

      // Ask the new worker (if any) to skip waiting, then claim clients in 'activate'
      reg.installing?.postMessage?.({ type: "SKIP_WAITING" });
      reg.waiting?.postMessage?.({ type: "SKIP_WAITING" });

      const startWhenControlled = () => startBeats(postToSW(reg));

      if (navigator.serviceWorker.controller) {
        // Already controlled → start immediately
        startWhenControlled();
      } else {
        // Wait until the page becomes controlled without reload
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          startWhenControlled
        );
      }

      // Send "last tab unloading" signal ASAP; pagehide fires more reliably than unload
      const onPageHide = () =>
        postToSW(reg)({ type: "tab_unloading", timestamp: Date.now() });
      const onUnload = () =>
        postToSW(reg)({ type: "tab_unloading", timestamp: Date.now() });

      window.addEventListener("pagehide", onPageHide);
      window.addEventListener("unload", onUnload);

      // Cleanup on React unmount (navigating away within SPA)
      return () => {
        stopBeats();
        window.removeEventListener("pagehide", onPageHide);
        window.removeEventListener("unload", onUnload);
      };
    })();
    // throw new Error("unreachable");
  }, []);

  return null;
}
