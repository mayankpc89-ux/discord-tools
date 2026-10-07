import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DiscordTools - Free Discord Utilities",
    template: "%s | DiscordTools",
  },
  description:
    "Free Discord tools for timestamps, snowflakes, permissions, colors, Markdown, emojis and bot invites.",
  keywords: [
    "Discord tools",
    "Discord timestamp generator",
    "Discord snowflake decoder",
    "Discord permission calculator",
    "Discord color converter",
    "Discord emoji ID",
  ],
  openGraph: {
    title: "DiscordTools - Free Discord Utilities",
    description:
      "Fast, free Discord utilities for users, developers and server owners.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

