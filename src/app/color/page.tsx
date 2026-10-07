import type { Metadata } from "next";
import { ColorTool, ToolPage } from "@/components/discord-tools";

export const metadata: Metadata = {
  title: "Discord Color Converter",
  description: "Convert HEX colors into RGB and Discord decimal color values.",
  alternates: {
    canonical: "https://discord-tools-two.vercel.app/color",
  },
};

export default function Page() {
  return (
    <ToolPage title="Discord Color Converter" description="Convert HEX colors into RGB and Discord decimal color values.">
      <ColorTool />
    </ToolPage>
  );
}
