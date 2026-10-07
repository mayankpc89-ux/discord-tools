import type { Metadata } from "next";
import { SnowflakeTool, ToolPage } from "@/components/discord-tools";

export const metadata: Metadata = {
  title: "Discord Snowflake Decoder",
  description: "Decode a Discord snowflake ID and see the timestamp encoded inside it.",
  alternates: {
    canonical: "https://discord-tools-two.vercel.app/snowflake",
  },
};

export default function Page() {
  return (
    <ToolPage title="Discord Snowflake Decoder" description="Decode a Discord snowflake ID and see the timestamp encoded inside it.">
      <SnowflakeTool />
    </ToolPage>
  );
}
