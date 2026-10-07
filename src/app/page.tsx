import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Discord Tools",
  description:
    "Free Discord utilities for timestamps, snowflakes, permissions, colors, Markdown, emojis and bot invites.",
};

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <div className="container nav-inner">
          <Link className="brand" href="/">
            DiscordTools
          </Link>
          <span className="nav-link">Free â€¢ Fast â€¢ No signup</span>
        </div>
      </nav>

      <div className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">DISCORD UTILITY TOOLKIT</p>
            <h1>Free Discord Tools</h1>
            <p>
              Fast, simple utilities for Discord users, developers and server
              owners.
            </p>
          </div>
        </section>

        <div className="ad-slot">
          <span>Advertisement</span>
        </div>

        <section className="tool-cards">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/${tool.id}`}
              className="tool-card"
            >
              <div className="tool-icon">{tool.icon}</div>
              <div>
                <h2>{tool.name}</h2>
                <p>{tool.description}</p>
              </div>
              <span className="tool-arrow">â†’</span>
            </Link>
          ))}
        </section>

        <section className="about">
          <h2>Useful Discord tools in one place</h2>
          <p>
            Generate timestamps, decode snowflake IDs, calculate permissions,
            convert colors, preview Markdown, extract emoji IDs and create bot
            invite links.
          </p>
        </section>

        <div className="ad-slot">
          <span>Advertisement</span>
        </div>
      </div>

      <footer>
        <div className="container">
          <strong>DiscordTools</strong>
          <p>
            Independent community utility website. Not affiliated with Discord
            Inc.
          </p>
        </div>
      </footer>
    </main>
  );
}
