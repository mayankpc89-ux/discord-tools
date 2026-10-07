"use client";

import { useMemo, useState } from "react";

type Tool = {
  id: string;
  icon: string;
  name: string;
  description: string;
};

const tools: Tool[] = [
  {
    id: "timestamp",
    icon: "🕐",
    name: "Timestamp Generator",
    description: "Create Discord timestamps for any date and time.",
  },
  {
    id: "snowflake",
    icon: "🔢",
    name: "Snowflake Decoder",
    description: "Convert a Discord ID into its creation timestamp.",
  },
  {
    id: "permissions",
    icon: "🔐",
    name: "Permission Calculator",
    description: "Calculate Discord permission integers.",
  },
  {
    id: "color",
    icon: "🎨",
    name: "Color Converter",
    description: "Convert HEX colors into RGB and decimal values.",
  },
  {
    id: "markdown",
    icon: "📝",
    name: "Markdown Preview",
    description: "Preview common Discord Markdown formatting.",
  },
  {
    id: "emoji",
    icon: "😀",
    name: "Emoji ID Extractor",
    description: "Extract names and IDs from Discord emoji.",
  },
  {
    id: "invite",
    icon: "🔗",
    name: "Bot Invite Generator",
    description: "Generate a Discord OAuth2 bot invite URL.",
  },
];

const formats = [
  ["t", "Short Time"],
  ["T", "Long Time"],
  ["d", "Short Date"],
  ["D", "Long Date"],
  ["f", "Date + Short Time"],
  ["F", "Full Date + Time"],
  ["R", "Relative Time"],
];

const permissions = [
  ["Administrator", BigInt("8")],
  ["View Audit Log", BigInt("128")],
  ["Manage Server", BigInt("32")],
  ["Manage Channels", BigInt("16")],
  ["Manage Roles", BigInt("268435456")],
  ["Manage Messages", BigInt("8192")],
  ["Kick Members", BigInt("2")],
  ["Ban Members", BigInt("4")],
  ["Moderate Members", BigInt("1099511627776")],
  ["Mention Everyone", BigInt("131072")],
  ["Send Messages", BigInt("2048")],
  ["Embed Links", BigInt("16384")],
  ["Attach Files", BigInt("32768")],
  ["Read Message History", BigInt("65536")],
  ["Connect", BigInt("1048576")],
  ["Speak", BigInt("2097152")],
];

function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

function AdSlot() {
  return (
    <div className="ad-slot">
      <span>Advertisement</span>
    </div>
  );
}

function TimestampTool() {
  const [date, setDate] = useState("");
  const [format, setFormat] = useState("F");

  const unix = date
    ? Math.floor(new Date(date).getTime() / 1000)
    : null;

  const timestamp = unix !== null ? `<t:${unix}:${format}>` : "";

  return (
    <div className="tool-panel">
      <h2>🕐 Discord Timestamp Generator</h2>
      <p className="muted">
        Create timestamps that automatically adapt to every user's timezone.
      </p>

      <label>Date and time</label>
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label>Format</label>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        {formats.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {timestamp && (
        <div className="output-box">
          <code>{timestamp}</code>
          <button onClick={() => copyText(timestamp)}>Copy</button>
        </div>
      )}

      {unix && (
        <div className="preview-box">
          <strong>Unix timestamp:</strong> {unix}
          <br />
          <strong>Local preview:</strong>{" "}
          {new Date(date).toLocaleString()}
        </div>
      )}
    </div>
  );
}

function SnowflakeTool() {
  const [id, setId] = useState("");

  let result = null;

  try {
    if (/^\d{15,25}$/.test(id)) {
      const snowflake = BigInt(id);
      const discordEpoch = BigInt("1420070400000");
      const milliseconds =
        Number((snowflake >> BigInt("22")) + discordEpoch);

      const date = new Date(milliseconds);

      result = {
        date,
        unix: Math.floor(milliseconds / 1000),
      };
    }
  } catch {}

  return (
    <div className="tool-panel">
      <h2>🔢 Discord Snowflake Decoder</h2>
      <p className="muted">
        Paste a Discord user, message, server or other snowflake ID.
      </p>

      <input
        placeholder="123456789012345678"
        value={id}
        onChange={(e) => setId(e.target.value.replace(/\D/g, ""))}
      />

      {result && (
        <div className="result-grid">
          <div>
            <span>Created</span>
            <strong>{result.date.toLocaleString()}</strong>
          </div>

          <div>
            <span>Unix</span>
            <strong>{result.unix}</strong>
          </div>

          <div>
            <span>Discord timestamp</span>
            <strong>{`<t:${result.unix}:F>`}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

function PermissionTool() {
  const [selected, setSelected] = useState<string[]>([]);

  const value = useMemo(() => {
    return permissions
      .filter(([name]) => selected.includes(name as string))
      .reduce((total, [, bit]) => total | (bit as bigint), BigInt("0"));
  }, [selected]);

  function toggle(name: string) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((x) => x !== name)
        : [...current, name]
    );
  }

  return (
    <div className="tool-panel">
      <h2>🔐 Discord Permission Calculator</h2>
      <p className="muted">
        Select permissions and generate the permission integer.
      </p>

      <div className="permission-grid">
        {permissions.map(([name]) => {
          const permission = name as string;

          return (
            <label className="check" key={permission}>
              <input
                type="checkbox"
                checked={selected.includes(permission)}
                onChange={() => toggle(permission)}
              />
              <span>{permission}</span>
            </label>
          );
        })}
      </div>

      <div className="output-box">
        <code>{value.toString()}</code>
        <button onClick={() => copyText(value.toString())}>Copy</button>
      </div>
    </div>
  );
}

function ColorTool() {
  const [color, setColor] = useState("#5865F2");

  const hex = color.replace("#", "");

  const rgb =
    hex.length === 6
      ? {
          r: parseInt(hex.substring(0, 2), 16),
          g: parseInt(hex.substring(2, 4), 16),
          b: parseInt(hex.substring(4, 6), 16),
        }
      : null;

  const decimal = rgb
    ? (rgb.r << 16) + (rgb.g << 8) + rgb.b
    : 0;

  return (
    <div className="tool-panel">
      <h2>🎨 Discord Color Converter</h2>
      <p className="muted">
        Convert HEX colors into RGB and Discord decimal colors.
      </p>

      <div className="color-row">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          value={color}
          maxLength={7}
          onChange={(e) => {
            let value = e.target.value;

            if (!value.startsWith("#")) value = "#" + value;

            setColor(value);
          }}
        />
      </div>

      {rgb && (
        <div className="result-grid">
          <div>
            <span>HEX</span>
            <strong>{color.toUpperCase()}</strong>
          </div>

          <div>
            <span>RGB</span>
            <strong>
              {rgb.r}, {rgb.g}, {rgb.b}
            </strong>
          </div>

          <div>
            <span>Decimal</span>
            <strong>{decimal}</strong>
          </div>
        </div>
      )}

      <div
        className="color-preview"
        style={{ background: color }}
      />
    </div>
  );
}

function MarkdownTool() {
  const [text, setText] = useState(
    "**Hello!**\n\nThis is *Discord Markdown*.\n\n`code`\n\n> Quote\n\n||spoiler||"
  );

  const preview = text
    .replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    )
    .replace(
      /\*(.*?)\*/g,
      "<em>$1</em>"
    )
    .replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    )
    .replace(
      /\|\|(.*?)\|\|/g,
      "<span class='spoiler'>$1</span>"
    )
    .replace(
      /^> (.*)$/gm,
      "<blockquote>$1</blockquote>"
    )
    .replace(/\n/g, "<br />");

  return (
    <div className="tool-panel">
      <h2>📝 Discord Markdown Preview</h2>
      <p className="muted">
        Preview common Discord Markdown formatting.
      </p>

      <div className="markdown-grid">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </div>
    </div>
  );
}

function EmojiTool() {
  const [text, setText] = useState("");

  const matches = [...text.matchAll(/<a?:([\w~]+):(\d+)>/g)];

  return (
    <div className="tool-panel">
      <h2>😀 Discord Emoji ID Extractor</h2>
      <p className="muted">
        Paste Discord emoji such as &lt;:name:123456789&gt;.
      </p>

      <textarea
        placeholder="<:party:123456789012345678>"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {matches.length > 0 && (
        <div className="emoji-results">
          {matches.map((match, index) => {
            const animated = match[0].startsWith("<a:");

            return (
              <div className="emoji-result" key={index}>
                <strong>{match[1]}</strong>
                <span>{match[2]}</span>
                <small>
                  {animated ? "Animated" : "Static"}
                </small>

                <button onClick={() => copyText(match[2])}>
                  Copy ID
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function InviteTool() {
  const [clientId, setClientId] = useState("");
  const [permissions, setPermissions] = useState("0");

  const url =
    clientId.length > 0
      ? `https://discord.com/oauth2/authorize?client_id=${encodeURIComponent(
          clientId
        )}&scope=bot%20applications.commands&permissions=${encodeURIComponent(
          permissions
        )}`
      : "";

  return (
    <div className="tool-panel">
      <h2>🔗 Discord Bot Invite Generator</h2>
      <p className="muted">
        Generate an OAuth2 invite URL for your Discord bot.
      </p>

      <label>Application / Client ID</label>
      <input
        placeholder="123456789012345678"
        value={clientId}
        onChange={(e) =>
          setClientId(e.target.value.replace(/\D/g, ""))
        }
      />

      <label>Permission integer</label>
      <input
        value={permissions}
        onChange={(e) =>
          setPermissions(e.target.value.replace(/\D/g, ""))
        }
      />

      {url && (
        <div className="output-box">
          <code>{url}</code>
          <button onClick={() => copyText(url)}>Copy</button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("timestamp");
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase())
  );

  function renderTool() {
    switch (active) {
      case "timestamp":
        return <TimestampTool />;
      case "snowflake":
        return <SnowflakeTool />;
      case "permissions":
        return <PermissionTool />;
      case "color":
        return <ColorTool />;
      case "markdown":
        return <MarkdownTool />;
      case "emoji":
        return <EmojiTool />;
      case "invite":
        return <InviteTool />;
      default:
        return <TimestampTool />;
    }
  }

  return (
    <div className="site">
      <header className="navbar">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => setActive("timestamp")}
          >
            <span className="brand-icon">✦</span>
            Discord<span>Tools</span>
          </button>

          <div className="nav-links">
            <a href="#tools">Tools</a>
            <a href="#about">About</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-badge">
            ⚡ Free • Fast • Browser-based
          </div>

          <h1>
            Simple tools for
            <br />
            <span>Discord users.</span>
          </h1>

          <p>
            Free utilities for Discord developers, server owners
            and everyday users. No account required.
          </p>

          <div className="hero-search">
            <span>⌕</span>
            <input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <div className="container" id="tools">
          <AdSlot />

          <section className="tool-cards">
            {filteredTools.map((tool) => (
              <button
                className={`tool-card ${
                  active === tool.id ? "selected" : ""
                }`}
                key={tool.id}
                onClick={() => {
                  setActive(tool.id);
                  window.scrollTo({
                    top: 700,
                    behavior: "smooth",
                  });
                }}
              >
                <div className="tool-icon">{tool.icon}</div>
                <div>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                </div>
                <span className="arrow">→</span>
              </button>
            ))}
          </section>

          <AdSlot />

          <section className="workspace">
            {renderTool()}
          </section>

          <AdSlot />

          <section className="about" id="about">
            <h2>Free Discord utilities</h2>
            <p>
              DiscordTools provides lightweight browser-based utilities
              for Discord users and developers. Your data is processed
              locally in your browser whenever possible.
            </p>

            <div className="feature-grid">
              <div>
                <strong>⚡ Fast</strong>
                <span>No unnecessary accounts or complicated setup.</span>
              </div>

              <div>
                <strong>🔒 Private</strong>
                <span>Most tools process data directly in your browser.</span>
              </div>

              <div>
                <strong>🆓 Free</strong>
                <span>Useful Discord utilities without paywalls.</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div>
          <strong>DiscordTools</strong>
          <span>Independent community utility website.</span>
        </div>

        <div>
          <span>© {new Date().getFullYear()} DiscordTools</span>
        </div>
      </footer>
    </div>
  );
}
