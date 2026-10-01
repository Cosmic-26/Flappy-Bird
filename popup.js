const palettes = {
  calm: {
    label: "Calm",
    title: "A quiet exhale",
    description: "Cool blue and green tones offer a spacious, restorative color story.",
    colors: [
      ["Cloud Blue", "#DFF6FF", "Serenity"], ["Mint", "#49D6B5", "Ease"],
      ["Ocean Blue", "#1677FF", "Clarity"], ["Deep Teal", "#006D77", "Composure"],
      ["Navy", "#102A43", "Depth"], ["Sky", "#68C5FF", "Refreshment"],
      ["Sea Green", "#00A878", "Harmony"], ["Blue Black", "#081C24", "Reflection"]
    ]
  },
  energetic: {
    label: "Energetic",
    title: "Make it move",
    description: "Red, orange, and yellow create an unmistakably high-voltage palette.",
    colors: [
      ["Solar Yellow", "#FFE600", "Optimism"], ["Safety Orange", "#FF7A00", "Warmth"],
      ["Signal Red", "#FF1B1C", "Courage"], ["Hot Pink", "#FF3CAC", "Excitement"],
      ["Deep Red", "#A90000", "Determination"], ["Gold", "#FFB703", "Momentum"],
      ["Tangerine", "#FF5D00", "Adventure"], ["Berry", "#7B0000", "Power"]
    ]
  },
  cozy: {
    label: "Cozy",
    title: "Golden-hour comfort",
    description: "Burnished orange, cocoa, and cream shape a warm familiar atmosphere.",
    colors: [
      ["Cream", "#FFF0D5", "Contentment"], ["Honey", "#FFB000", "Comfort"],
      ["Clay", "#D95D39", "Groundedness"], ["Cinnamon", "#A53F2B", "Nurture"],
      ["Cocoa", "#3F1D16", "Security"], ["Peach", "#FFBE98", "Tenderness"],
      ["Rust", "#C44536", "Belonging"], ["Espresso", "#27110B", "Rest"]
    ]
  },
  focused: {
    label: "Focused",
    title: "Clear the noise",
    description: "Strong blue, cyan, and deep ink make information feel precise and ordered.",
    colors: [
      ["Ice", "#E5F6FF", "Openness"], ["Cyan", "#00B8D9", "Precision"],
      ["Royal Blue", "#0057FF", "Confidence"], ["Steel", "#315D73", "Resolve"],
      ["Ink", "#091C2C", "Authority"], ["Aqua", "#3DDCFF", "Clarity"],
      ["Blue Green", "#007C91", "Discipline"], ["Midnight", "#00111C", "Mastery"]
    ]
  },
  playful: {
    label: "Playful",
    title: "Joy in full color",
    description: "Purple, yellow, pink, and teal combine in an extroverted color celebration.",
    colors: [
      ["Lemon", "#FFF200", "Delight"], ["Candy Pink", "#FF4FA3", "Cheer"],
      ["Teal", "#00C2A8", "Freshness"], ["Purple", "#7B2CFF", "Whimsy"],
      ["Grape", "#40156B", "Imagination"], ["Orange", "#FF8A00", "Spark"],
      ["Aqua", "#00D9FF", "Curiosity"], ["Indigo", "#25104F", "Wonder"]
    ]
  },
  romantic: {
    label: "Romantic",
    title: "A love letter in color",
    description: "Blush, vivid red, and plum create a soft but expressive atmosphere.",
    colors: [
      ["Blush", "#FFD6E0", "Tenderness"], ["Rose", "#FF5D8F", "Gentleness"],
      ["Scarlet", "#E8174F", "Passion"], ["Berry", "#A60D3D", "Devotion"],
      ["Plum", "#4A1230", "Intimacy"], ["Petal", "#FFB3C6", "Admiration"],
      ["Magenta", "#D0006F", "Yearning"], ["Wine", "#2A0716", "Forever"]
    ]
  },
  dramatic: {
    label: "Dramatic",
    title: "Take the stage",
    description: "Electric purple, black, and silver create cinematic contrast with presence.",
    colors: [
      ["Lavender", "#E9DDFF", "Wonder"], ["Electric Violet", "#8A2EFF", "Intrigue"],
      ["Stage Purple", "#541388", "Mystery"], ["Hot Violet", "#C700FF", "Drama"],
      ["Near Black", "#121018", "Intensity"], ["Silver", "#B9B7C6", "Anticipation"],
      ["Indigo", "#3F0D7A", "Gravity"], ["Black", "#050508", "Command"]
    ]
  },
  fresh: {
    label: "Fresh",
    title: "Open the windows",
    description: "Bright green, turquoise, and sky blue create an optimistic sense of renewal.",
    colors: [
      ["Lime Mist", "#E8FFD1", "Renewal"], ["Lime", "#A8FF00", "Vitality"],
      ["Leaf", "#39B54A", "Growth"], ["Turquoise", "#00D4C7", "Lightness"],
      ["Forest", "#0A4B2A", "Resilience"], ["Sky", "#55D6FF", "Clarity"],
      ["Green", "#00A550", "Hope"], ["Evergreen", "#062817", "Revival"]
    ]
  },
  grounded: {
    label: "Grounded",
    title: "Rooted and real",
    description: "Olive, clay, and bark create a dependable, earth-led palette.",
    colors: [
      ["Stone", "#EEE7D7", "Reliability"], ["Moss", "#9AA14B", "Balance"],
      ["Olive", "#687D23", "Wisdom"], ["Clay", "#B85C38", "Sincerity"],
      ["Bark", "#332818", "Strength"], ["Sand", "#D8B384", "Calm"],
      ["Fern", "#44633F", "Trust"], ["Soil", "#1F180F", "Endurance"]
    ]
  },
  luxe: {
    label: "Luxe",
    title: "Quietly extravagant",
    description: "Gold, emerald, cream, and ink create a polished high-contrast palette.",
    colors: [
      ["Champagne", "#FFF3CC", "Refinement"], ["Gold", "#F4B400", "Celebration"],
      ["Emerald", "#007D52", "Sophistication"], ["Royal Purple", "#5A189A", "Allure"],
      ["Onyx", "#111111", "Exclusivity"], ["Pearl", "#FFFDF4", "Grace"],
      ["Garnet", "#8B1538", "Prestige"], ["Black Gold", "#201A0A", "Command"]
    ]
  }
};

const picker = document.getElementById("mood-picker");
const grid = document.getElementById("swatch-grid");
const status = document.getElementById("status");
const title = document.getElementById("palette-title");
const description = document.getElementById("palette-description");
const count = document.getElementById("palette-count");

Object.entries(palettes).forEach(([key, palette]) => {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = palette.label;
  picker.append(option);
});

function renderPalette(key) {
  const palette = palettes[key] || palettes.calm;
  const [paper, line, accent, , dark] = palette.colors.map((color) => color[1]);

  document.documentElement.style.setProperty("--paper", paper);
  document.documentElement.style.setProperty("--line", line);
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--soft", dark);
  title.textContent = palette.title;
  description.textContent = palette.description;
  count.textContent = `${String(Object.keys(palettes).indexOf(key) + 1).padStart(2, "0")} / ${Object.keys(palettes).length}`;
  grid.replaceChildren();

  palette.colors.forEach(([name, hex, emotion]) => {
    const button = document.createElement("button");
    const nameLabel = document.createElement("span");
    const hexLabel = document.createElement("span");
    const luminance = hex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16));
    const textColor = (luminance[0] * 299 + luminance[1] * 587 + luminance[2] * 114) / 1000 > 155 ? "#211a17" : "#ffffff";

    button.type = "button";
    button.className = "swatch";
    button.style.backgroundColor = hex;
    button.style.color = textColor;
    button.setAttribute("aria-label", `${name}, ${hex}, ${emotion}. Copy HEX value.`);
    nameLabel.className = "swatch-name";
    nameLabel.textContent = name;
    hexLabel.className = "swatch-hex";
    hexLabel.textContent = hex;
    button.append(nameLabel, hexLabel);
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(hex);
        status.textContent = `${hex} copied to clipboard.`;
      } catch {
        status.textContent = `Selected ${name}: ${hex}.`;
      }
    });
    grid.append(button);
  });
}

picker.addEventListener("change", () => {
  localStorage.setItem("selectedMood", picker.value);
  renderPalette(picker.value);
  status.textContent = "Select a color to copy its HEX value.";
});

const savedMood = localStorage.getItem("selectedMood");
picker.value = Object.hasOwn(palettes, savedMood) ? savedMood : "calm";
renderPalette(picker.value);