"use client";

import React from "react";
import { Tag } from "antd";

type PermissionValue =
  | string
  | string[]
  | Record<string, boolean>
  | null
  | undefined;

type Props = {
  value: PermissionValue;
};

const colorFor = (p: string) => {
  const key = p.toLowerCase();
  if (key.includes("super")) return "volcano";
  if (key.includes("delete") || key.includes("remove")) return "red";
  if (key.includes("download")) return "cyan";
  if (key.includes("upload")) return "purple";
  if (key.includes("action")) return "orange";
  if (key.includes("list")) return "gold";
  if (key.includes("create") || key.includes("add")) return "green";
  if (key.includes("update") || key.includes("edit")) return "blue";
  return "default";
};

export default function PermissionBadges({ value }: Props) {
  let perms: string[] = [];
  if (typeof value === "string") {
    perms = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  } else if (Array.isArray(value)) {
    perms = value as string[];
  } else if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    perms = Object.keys(obj).filter((k) => Boolean(obj[k]));
  }

  if (!perms || perms.length === 0) return <span>N/A</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {perms.map((p) => (
        <Tag key={p} color={colorFor(p)} className="text-xs font-medium">
          {p}
        </Tag>
      ))}
    </div>
  );
}
