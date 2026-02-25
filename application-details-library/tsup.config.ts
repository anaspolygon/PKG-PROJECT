import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "antd", "lucide-react", "clsx","next","react-select"],
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    // Copy CSS file to dist
    try {
      mkdirSync("dist", { recursive: true });
      copyFileSync(
        join("src", "styles", "accordion.css"),
        join("dist", "accordion.css"),
      );
      console.log("✓ CSS file copied to dist/");
    } catch (error) {
      console.error("Failed to copy CSS file:", error);
    }
  },
});
