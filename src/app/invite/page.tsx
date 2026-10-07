import type { Metadata } from "next";
import { InviteTool, ToolPage } from "@/components/discord-tools";

export const metadata: Metadata = {
  title: "Discord Bot Invite Generator",
  description: "Generate Discord OAuth2 bot invite URLs with your chosen permission integer.",
  alternates: {
    canonical: "https://discord-tools-two.vercel.app/invite",
  },
};

export default function Page() {
  return (
    <ToolPage title="Discord Bot Invite Generator" description="Generate Discord OAuth2 bot invite URLs with your chosen permission integer.">
      <InviteTool />
    </ToolPage>
  );
}

