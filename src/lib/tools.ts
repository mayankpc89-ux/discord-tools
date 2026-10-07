export type Tool = {
  id: string;
  icon: string;
  name: string;
  description: string;
};

export const tools: Tool[] = [
  {
    id: "timestamp",
    icon: "",
    name: "Timestamp Generator",
    description: "Create Discord timestamps for any date and time.",
  },
  {
    id: "snowflake",
    icon: "",
    name: "Snowflake Decoder",
    description: "Convert a Discord ID into its creation timestamp.",
  },
  {
    id: "permissions",
    icon: "",
    name: "Permission Calculator",
    description: "Calculate Discord permission integers.",
  },
  {
    id: "color",
    icon: "",
    name: "Color Converter",
    description: "Convert HEX colors into RGB and decimal values.",
  },
  {
    id: "markdown",
    icon: "",
    name: "Markdown Preview",
    description: "Preview common Discord Markdown formatting.",
  },
  {
    id: "emoji",
    icon: "",
    name: "Emoji ID Extractor",
    description: "Extract names and IDs from Discord emoji.",
  },
  {
    id: "invite",
    icon: "",
    name: "Bot Invite Generator",
    description: "Generate a Discord OAuth2 bot invite URL.",
  },
];


