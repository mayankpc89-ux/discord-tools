import type { Metadata } from "next";
import { MarkdownTool, ToolPage } from "@/components/discord-tools";

export const metadata: Metadata = {
  title: "Discord Markdown Preview",
  description: "Preview common Discord Markdown formatting before posting it in Discord.",
  alternates: {
    canonical: "https://discord-tools-two.vercel.app/markdown",
  },
};

export default function Page() {
  return (
    <ToolPage title="Discord Markdown Preview" description="Preview common Discord Markdown formatting before posting it in Discord.">
      <MarkdownTool />
    </ToolPage>
  );
}


