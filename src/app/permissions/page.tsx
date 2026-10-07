import type { Metadata } from "next";
import { PermissionTool, ToolPage } from "@/components/discord-tools";

export const metadata: Metadata = {
  title: "Discord Permission Calculator",
  description: "Calculate Discord permission integers for bots, roles and server permissions.",
  alternates: {
    canonical: "https://discord-tools-two.vercel.app/permissions",
  },
};

export default function Page() {
  return (
    <ToolPage title="Discord Permission Calculator" description="Calculate Discord permission integers for bots, roles and server permissions.">
      <PermissionTool />
    </ToolPage>
  );
}

