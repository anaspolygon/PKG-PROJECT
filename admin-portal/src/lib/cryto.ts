// lib/crypto.ts
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = crypto
  .createHash("sha256")
  .update(process.env.PAYLOAD_SECRET || "default_secret")
  .digest();

export function encryptPayload(data: object) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const json = JSON.stringify(data);
  let encrypted = cipher.update(json, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag().toString("hex");
  return JSON.stringify({ encrypted, iv: iv.toString("hex"), tag });
}

export function decryptPayload(payload: string) {
  const { encrypted, iv, tag } = JSON.parse(payload);
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(tag, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}
