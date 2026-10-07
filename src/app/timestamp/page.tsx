import type { Metadata } from "next";
import { TimestampTool, ToolPage } from "@/components/discord-tools";

export const metadata: Metadata = {
  title: "Discord Timestamp Generator",
  description: "Generate Discord timestamps from any date and time. Copy Discord timestamp formats instantly.",
  alternates: {
    canonical: "https://discord-tools-two.vercel.app/timestamp",
  },
};

export default function Page() {
  return (
    <ToolPage title="Discord Timestamp Generator" description="Generate Discord timestamps from any date and time. Copy Discord timestamp formats instantly.">
      <TimestampTool />
    </ToolPage>
  );
}
