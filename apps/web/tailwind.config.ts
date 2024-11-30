import daisyui from "daisyui";
// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [daisyui],
  presets: [sharedConfig],
};

export default config;
