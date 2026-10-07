import type { Metadata } from "next";
import { EmojiTool, ToolPage } from "@/components/discord-tools";

export const metadata: Metadata = {
  title: "Discord Emoji ID Extractor",
  description: "Extract Discord emoji names and IDs from emoji markup.",
  alternates: {
    canonical: "https://discord-tools-two.vercel.app/emoji",
  },
};

export default function Page() {
  return (
    <ToolPage title="Discord Emoji ID Extractor" description="Extract Discord emoji names and IDs from emoji markup.">
      <EmojiTool />
    </ToolPage>
  );
}

