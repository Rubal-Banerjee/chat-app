import daisyui from "daisyui";
import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "plugins" | "presets" | "content"> = {
  content: ["./src/**/*.tsx"],
  plugins: [daisyui],
  presets: [sharedConfig],
};

export default config;
