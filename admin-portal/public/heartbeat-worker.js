// public/heartbeat-worker.js

const HEARTBEAT_TIMEOUT = 3000;   // consider a tab dead if no beat within 3s
const CHECK_INTERVAL_MS = 1000;   // check once per second

let lastBeatByClient = new Map(); // clientId -> timestamp
let checkTimer = null;
let isLoggingOut = false;

// Ensure immediate control on first registration
self.addEventListener("install", (event) => {
  self.skipWaiting?.();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Utility: single-flight logout
async function logoutNow() {
  if (isLoggingOut) return;
  isLoggingOut = true;
  try {
    await fetch("/api/logout", { method: "POST", keepalive: true });
  } catch (_) {
    // no UI here; best effort
  } finally {
    // After logout, reset state so a new session can start fresh
    lastBeatByClient.clear();
    isLoggingOut = false;
  }
}

// Periodic monitor—if no active clients have recent beats, logout
function ensureMonitor() {
  if (checkTimer) return;
  checkTimer = setInterval(async () => {
    const now = Date.now();

    // 1) Remove stale clients from the map
    for (const [clientId, ts] of lastBeatByClient.entries()) {
      if (now - ts > HEARTBEAT_TIMEOUT) {
        lastBeatByClient.delete(clientId);
      }
    }

    // 2) Ask the browser how many window clients actually exist
    const clientsList = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    // Filter down to ones we’ve seen heartbeats for recently
    const activeClients = clientsList.filter((c) => lastBeatByClient.has(c.id));

    if (activeClients.length === 0 && clientsList.length === 0) {
      // Truly no tabs left → logout
      clearInterval(checkTimer);
      checkTimer = null;
      await logoutNow();
    }
  }, CHECK_INTERVAL_MS);
}

self.addEventListener("message", async (event) => {
  const data = event.data || {};
  const type = data.type;

  // Identify the sender tab
  const source = event.source; // Client
  const clientId = source && source.id;

  if (type === "SKIP_WAITING") {
    self.skipWaiting?.();
    return;
  }

  if (type === "heartbeat" && clientId) {
    lastBeatByClient.set(clientId, Date.now());
    ensureMonitor();
    return;
  }

  if (type === "tab_unloading" && clientId) {
  // Remove this tab's heartbeat immediately
  lastBeatByClient.delete(clientId);

  // Delay the "is this last tab?" check slightly to avoid race
  setTimeout(async () => {
    const clientsList = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    // Filter out closed / stale ones
    const now = Date.now();
    const activeClients = clientsList.filter((c) =>
      lastBeatByClient.has(c.id) &&
      now - lastBeatByClient.get(c.id) < HEARTBEAT_TIMEOUT
    );

    // Only logout if absolutely no active client remains
    if (activeClients.length === 0) {
      await logoutNow();
    }
  }, 800); // 0.8s delay gives Chrome time to update its clients list

  return;
}

});
