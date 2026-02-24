export function getPayloadFromJWT(token: string) {
  const parts = token?.split(".");
  if (parts?.length !== 3 || !token) {
    throw new Error("Invalid token format");
  }
  return JSON.parse(atob(parts[1]));
}

export function getRoleFromJWT(token: string): string | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload.role || null;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export function extractRoleFromTokenObject(): string | null {
  try {
    const stored = localStorage.getItem("userInfo");
    if (!stored) return null;

    const tokenObject = JSON.parse(stored);
    const jwt = tokenObject?.token;

    if (!jwt || typeof jwt !== "string" || !jwt.includes(".")) {
      return null;
    }

    const payloadBase64 = jwt.split(".")[1];
    const padded = payloadBase64.padEnd(
      payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
      "="
    );
    const decodedPayload = JSON.parse(atob(padded));

    return decodedPayload?.role || null;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
