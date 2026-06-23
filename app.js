const moduleDetails = {
  "asset-vault": {
    title: "Asset Vault",
    badge: "Storage Core",
    text: "Working vault for saved assets. Import files, create test assets, search, download, remove, and export the vault as a backup JSON file.",
    options: ["Store", "Import", "Download", "Remove", "Backup", "Restore"]
  },
  "sprite-lab": {
    title: "Create Sprite",
    badge: "Sprite Lab Live",
    text: "Working pixel-art sprite forge with repeatable seed generation, palette themes, metadata, PNG/JSON export, and one-tap saving into Asset Vault.",
    options: ["Creature DNA", "Seed", "Palette", "Stats", "PNG", "Save to Vault"]
  },
  "sprite-factory": {
    title: "Sprite Factory",
    badge: "Asset Pack",
    text: "Planned pack generator for themed sets: creatures, items, tiles, spell icons, palettes, atlases, metadata, and ZIP exports.",
    options: ["Monster Pack", "Item Pack", "Tileset", "Atlas", "Palette", "ZIP Export"]
  },
  "novel-generator": {
    title: "Book / Novel Generator",
    badge: "Story Engine",
    text: "Planned novel pipeline for premise, cast, world rules, chapter cards, scene lists, style rewrites, and a full story bible.",
    options: ["Premise", "Characters", "Outline", "Chapters", "Style", "Story Bible"]
  },
  "culture-generator": {
    title: "Culture Generator",
    badge: "Worldbuilding",
    text: "Planned civilization builder for laws, rituals, architecture, social conflicts, symbols, taboos, myths, and exportable dossiers.",
    options: ["Government", "Myths", "Laws", "Symbols", "Factions", "Dossier"]
  },
  "language-engine": {
    title: "Language / Name Engine",
    badge: "Naming System",
    text: "Planned root-based naming engine for consistent people, places, gods, monsters, items, cities, moons, and dictionaries.",
    options: ["Roots", "People", "Cities", "Gods", "Items", "Dictionary"]
  },
  "model-generator": {
    title: "3D Model Generator",
    badge: "WebGL Forge",
    text: "Planned procedural 3D creator for relics, weapons, crystals, masks, towers, ships, statues, and exportable model data.",
    options: ["Relic", "Weapon", "Crystal", "Mask", "Render", "Model JSON"]
  },
  "sound-generator": {
    title: "Monster Sound Generator",
    badge: "Audio Lab",
    text: "Planned Web Audio synthesizer for roars, hisses, clicks, growls, whispers, attack sounds, hurt sounds, and WAV exports.",
    options: ["Roar", "Attack", "Hurt", "Death", "Waveform", "WAV"]
  },
  "comic-generator": {
    title: "Comic Generator",
    badge: "Panel Maker",
    text: "Planned comic page builder for panel layouts, camera shots, silhouettes, speech bubbles, captions, sound effects, and PNG export.",
    options: ["Panels", "Bubbles", "Shots", "SFX", "Script", "PNG"]
  }
};

const palettePresets = {
  Nether: { outline: "#1e0505", body: "#c73a1a", shadow: "#6f1209", light: "#ffb347", accent: "#bb6cff", eye: "#fff7b2" },
  Forest: { outline: "#14230e", body: "#4e8b39", shadow: "#23441c", light: "#a6d96a", accent: "#e6df7a", eye: "#eefcc2" },
  Crystal: { outline: "#101829", body: "#52b5ff", shadow: "#184a7f", light: "#c6f1ff", accent: "#ae7fff", eye: "#ffffff" },
  Ocean: { outline: "#071c2e", body: "#1f7acc", shadow: "#0d4477", light: "#82d8ff", accent: "#3bf0c0", eye: "#ecffff" },
  Storm: { outline: "#121724", body: "#5872a2", shadow: "#293651", light: "#c8d6ff", accent: "#f4d03f", eye: "#f9f3e7" },
  Shadow: { outline: "#07070c", body: "#43415b", shadow: "#1f2030", light: "#9089c6", accent: "#e24fff", eye: "#f0d8ff" },
  Royal: { outline: "#1c0d21", body: "#7b2cbf", shadow: "#46186f", light: "#d7aaff", accent: "#ffd166", eye: "#fff0ca" },
  Poison: { outline: "#111d0b", body: "#70b82f", shadow: "#365d16", light: "#d5ff6f", accent: "#8b5cf6", eye: "#f7ffd0" },
  Machine: { outline: "#111111", body: "#8b8f96", shadow: "#50545b", light: "#d8dde5", accent: "#ff8a3d", eye: "#f1fbff" }
};

const autoPalettes = {
  Ember: "Nether",
  Tide: "Ocean",
  Storm: "Storm",
  Venom: "Poison",
  Bone: "Shadow",
  Crystal: "Crystal",
  Metal: "Machine",
  Solar: "Royal",
  Lunar: "Shadow",
  Fungal: "Forest",
  Dream: "Royal",
  Static: "Storm",
  Gravity: "Shadow"
};

const habitatMap = {
  Ember: ["lava deltas", "blackstone chasms", "magma tunnels"],
  Tide: ["sunken caverns", "tidal marshes", "flooded ruins"],
  Storm: ["thunder cliffs", "wind-carved mesas", "electro plains"],
  Venom: ["poison bogs", "toxic groves", "mire caverns"],
  Bone: ["ossuary valleys", "crypt dunes", "bone pits"],
  Crystal: ["glittering caves", "quartz ridges", "shard temples"],
  Metal: ["iron foundries", "abandoned forges", "gear warrens"],
  Solar: ["sun altars", "golden deserts", "radiant towers"],
  Lunar: ["moonlit marshes", "silver hollows", "twilight ruins"],
  Fungal: ["spore forests", "moss caverns", "rotting groves"],
  Dream: ["veil gardens", "sleeping temples", "mirage coasts"],
  Static: ["charged ruins", "glass plains", "wire storms"],
  Gravity: ["rift craters", "floating scars", "collapsed sanctums"]
};

const abilityMap = {
  Ember: ["Magma Hide", "Ash Pulse", "Cinder Rush"],
  Tide: ["Undertow Veil", "Mist Current", "Foam Bite"],
  Storm: ["Volt Pounce", "Cloud Lash", "Tempest Coil"],
  Venom: ["Spore Fang", "Toxin Bloom", "Bog Pulse"],
  Bone: ["Grave Husk", "Rattle Ward", "Pale Feast"],
  Crystal: ["Shard Shield", "Prism Burst", "Gem Resonance"],
  Metal: ["Iron Core", "Gear Rush", "Scrap Armor"],
  Solar: ["Sunflare Crest", "Radiant Roar", "Dawn Guard"],
  Lunar: ["Night Fade", "Moon Tether", "Eclipse Gaze"],
  Fungal: ["Spore Veil", "Mire Bloom", "Rot Root"],
  Dream: ["Mirage Step", "Velvet Sleep", "Dream Echo"],
  Static: ["Arc Snap", "Spark Skin", "Pulse Drive"],
  Gravity: ["Weight Crush", "Void Pull", "Singularity Shell"]
};

const typePrefixes = {
  Ember: ["Ash", "Cin", "Pyra", "Brim", "Scor"],
  Tide: ["Mira", "Tide", "Aqua", "Cora", "Neru"],
  Storm: ["Volt", "Temp", "Skyr", "Thun", "Raik"],
  Venom: ["Vile", "Toxi", "Mire", "Noxa", "Spor"],
  Bone: ["Grav", "Ossi", "Maro", "Skul", "Pale"],
  Crystal: ["Crys", "Prism", "Shard", "Gleam", "Facet"],
  Metal: ["Ferr", "Cog", "Steel", "Rivet", "Chrom"],
  Solar: ["Sol", "Auri", "Heli", "Ray", "Lux"],
  Lunar: ["Luna", "Nyx", "Sel", "Dusk", "Noct"],
  Fungal: ["Mush", "Spora", "Mire", "Rot", "Myco"],
  Dream: ["Vel", "Som", "Mira", "Lull", "Whisp"],
  Static: ["Spark", "Zap", "Arc", "Pulse", "Jolt"],
  Gravity: ["Grav", "Void", "Rift", "Pull", "Null"]
};

const typeSuffixes = ["mire", "drake", "ling", "thorn", "jaw", "geist", "mite", "horn", "maw", "shade", "coil", "beast", "flare", "crest"];

const classes = ["Beast", "Amphibian", "Reptile", "Insectoid", "Avian", "Plantborn", "Mineral", "Spirit", "Machine", "Eldritch"];
const types = ["Ember", "Tide", "Storm", "Venom", "Bone", "Crystal", "Metal", "Solar", "Lunar", "Fungal", "Dream", "Static", "Gravity"];
const bodies = ["Quadruped", "Serpent", "Winged", "Slime", "Humanoid", "Shellback", "Orb", "Insect"];
const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
const moods = ["Aggressive", "Noble", "Curious", "Mischievous", "Ancient", "Cowardly", "Territorial", "Symbiotic"];
const palettes = ["Auto", ...Object.keys(palettePresets)];
const sizes = ["Tiny", "Small", "Medium", "Large", "Massive"];

const VAULT_KEY = "logansCreations.assetVault.v1";
const cards = document.querySelectorAll(".module-card");
const previewTitle = document.getElementById("previewTitle");
const previewBadge = document.getElementById("previewBadge");
const previewText = document.getElementById("previewText");
const previewOptions = document.getElementById("previewOptions");
const themeToggle = document.getElementById("themeToggle");

const spriteSection = document.getElementById("spriteLab");
const spriteStatus = document.getElementById("spriteStatus");
const spritePreviewName = document.getElementById("spritePreviewName");
const spriteSeedBadge = document.getElementById("spriteSeedBadge");
const spriteCanvas = document.getElementById("spriteCanvas");
const spriteIconCanvas = document.getElementById("spriteIconCanvas");
const spriteStats = document.getElementById("spriteStats");
const spriteTags = document.getElementById("spriteTags");
const spriteAbility = document.getElementById("spriteAbility");
const spriteHabitat = document.getElementById("spriteHabitat");
const spriteDescription = document.getElementById("spriteDescription");
const spriteNameInput = document.getElementById("spriteName");
const spriteSeedInput = document.getElementById("spriteSeed");
const spriteClassInput = document.getElementById("spriteClass");
const spriteTypeInput = document.getElementById("spriteType");
const spriteBodyInput = document.getElementById("spriteBody");
const spriteRarityInput = document.getElementById("spriteRarity");
const spriteMoodInput = document.getElementById("spriteMood");
const spritePaletteInput = document.getElementById("spritePalette");
const spriteSizeInput = document.getElementById("spriteSize");
const generateSpriteBtn = document.getElementById("generateSpriteBtn");
const randomizeSpriteBtn = document.getElementById("randomizeSpriteBtn");
const rerollBodyBtn = document.getElementById("rerollBodyBtn");
const rerollPaletteBtn = document.getElementById("rerollPaletteBtn");
const downloadSpriteBtn = document.getElementById("downloadSpriteBtn");
const downloadSpriteJsonBtn = document.getElementById("downloadSpriteJsonBtn");
const saveSpriteBtn = document.getElementById("saveSpriteBtn");

const vaultSection = document.getElementById("assetVault");
const vaultGrid = document.getElementById("vaultGrid");
const vaultEmpty = document.getElementById("vaultEmpty");
const vaultSearch = document.getElementById("vaultSearch");
const vaultType = document.getElementById("vaultType");
const vaultStats = document.getElementById("vaultStats");
const importInput = document.getElementById("assetImport");
const restoreInput = document.getElementById("vaultRestore");

let vaultAssets = loadVault();
let currentSprite = null;

function selectModule(key) {
  const details = moduleDetails[key];
  if (!details) return;

  cards.forEach(card => card.classList.toggle("active", card.dataset.module === key));
  previewTitle.textContent = details.title;
  previewBadge.textContent = details.badge;
  previewText.textContent = details.text;
  previewOptions.innerHTML = details.options.map(option => `<span class="option-chip">${option}</span>`).join("");

  spriteSection.hidden = key !== "sprite-lab";
  vaultSection.hidden = key !== "asset-vault";

  if (key === "asset-vault") showVault();
  if (key === "sprite-lab") showSpriteLab();
}

function showVault() {
  vaultSection.hidden = false;
  renderVault();
  setTimeout(() => vaultSection.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
}

function showSpriteLab() {
  spriteSection.hidden = false;
  if (!currentSprite) generateSprite();
  setTimeout(() => spriteSection.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
}

function loadVault() {
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Could not load Asset Vault", error);
    return [];
  }
}

function saveVault() {
  localStorage.setItem(VAULT_KEY, JSON.stringify(vaultAssets));
}

function makeId() {
  return `asset_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
}

function makeSeed() {
  return `LC-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function hashString(value = "") {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function rng() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function createRng(seedString) {
  return mulberry32(hashString(seedString));
}

function randomInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function choice(rng, values) {
  return values[Math.floor(rng() * values.length)];
}

function formatBytes(bytes = 0) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  }[char]));
}

function assetIcon(type) {
  const icons = {
    sprite: "▣",
    book: "✦",
    culture: "◈",
    language: "⌁",
    model: "⬡",
    sound: "≋",
    comic: "▤",
    factory: "▦",
    file: "◆"
  };
  return icons[type] || "◆";
}

function renderVault() {
  const query = vaultSearch.value.trim().toLowerCase();
  const type = vaultType.value;
  const filtered = vaultAssets.filter(asset => {
    const searchable = `${asset.name} ${asset.type} ${(asset.tags || []).join(" ")} ${asset.description || ""}`.toLowerCase();
    return (!type || asset.type === type) && (!query || searchable.includes(query));
  });

  const totalSize = vaultAssets.reduce((sum, asset) => sum + (asset.size || 0), 0);
  vaultStats.textContent = `${vaultAssets.length} stored · ${filtered.length} showing · ${formatBytes(totalSize)}`;
  vaultEmpty.hidden = filtered.length !== 0;

  vaultGrid.innerHTML = filtered.map(asset => `
    <article class="asset-card" data-id="${asset.id}">
      <div class="asset-card-top">
        <div class="asset-icon">${assetIcon(asset.type)}</div>
        <div>
          <h3>${escapeHtml(asset.name)}</h3>
          <p>${escapeHtml(asset.type)} · ${formatBytes(asset.size)} · ${new Date(asset.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p class="asset-description">${escapeHtml(asset.description || "No description yet.")}</p>
      <div class="asset-tags">
        ${(asset.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="asset-actions">
        <button type="button" data-vault-action="download" data-id="${asset.id}">Download</button>
        <button type="button" data-vault-action="duplicate" data-id="${asset.id}">Duplicate</button>
        <button class="danger-action" type="button" data-vault-action="remove" data-id="${asset.id}">Remove</button>
      </div>
    </article>
  `).join("");
}

function addAsset(asset) {
  vaultAssets.unshift({
    tags: [],
    ...asset,
    id: makeId(),
    createdAt: new Date().toISOString()
  });
  saveVault();
  renderVault();
}

function createDemoAsset() {
  const demos = [
    {
      type: "sprite",
      name: "Nether Ember Beast",
      description: "Demo creature sprite entry ready for future generated PNG frames and stats.",
      tags: ["sprite", "nether", "creature"],
      filename: "nether-ember-beast.json",
      mime: "application/json",
      size: 622,
      content: {
        name: "Nether Ember Beast",
        module: "Create Sprite",
        palette: ["crimson", "blackstone", "lava orange", "portal purple"],
        plannedFiles: ["front.png", "back.png", "idle-sheet.png", "creature.json"]
      }
    },
    {
      type: "culture",
      name: "Ashglass Clan",
      description: "Demo culture dossier entry for a Nether survival civilization.",
      tags: ["culture", "clan", "nether"],
      filename: "ashglass-clan.json",
      mime: "application/json",
      size: 784,
      content: {
        name: "Ashglass Clan",
        value: "endurance through heat",
        taboo: "wasting light",
        symbols: ["obsidian fang", "red lantern", "cracked crown"]
      }
    },
    {
      type: "sound",
      name: "Basalt Howler Cry",
      description: "Demo monster sound profile. Future sound module will replace this with WAV data.",
      tags: ["sound", "monster", "basalt"],
      filename: "basalt-howler-cry.json",
      mime: "application/json",
      size: 538,
      content: {
        name: "Basalt Howler Cry",
        layers: ["low rumble", "stone scrape", "echo tail"],
        exportTarget: "wav"
      }
    }
  ];

  addAsset(demos[Math.floor(Math.random() * demos.length)]);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/data:(.*?);base64/)?.[1] || "application/octet-stream";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function downloadAsset(id) {
  const asset = vaultAssets.find(item => item.id === id);
  if (!asset) return;

  if (asset.dataUrl) {
    downloadBlob(asset.filename || `${asset.name}.asset`, dataUrlToBlob(asset.dataUrl));
    return;
  }

  const content = asset.content || asset;
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  downloadBlob(asset.filename || `${asset.name.replace(/\s+/g, "-").toLowerCase()}.json`, blob);
}

function duplicateAsset(id) {
  const asset = vaultAssets.find(item => item.id === id);
  if (!asset) return;
  const { id: oldId, createdAt, ...copy } = asset;
  addAsset({
    ...copy,
    name: `${asset.name} Copy`
  });
}

function removeAsset(id) {
  const asset = vaultAssets.find(item => item.id === id);
  if (!asset) return;
  const confirmed = confirm(`Remove "${asset.name}" from the Asset Vault?`);
  if (!confirmed) return;
  vaultAssets = vaultAssets.filter(item => item.id !== id);
  saveVault();
  renderVault();
}

function exportVault() {
  const backup = {
    app: "LoganCreations",
    version: "0.4",
    exportedAt: new Date().toISOString(),
    assets: vaultAssets
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  downloadBlob("loganscreations-asset-vault-backup.json", blob);
}

function clearVault() {
  if (!vaultAssets.length) return;
  const confirmed = confirm("Remove every asset from the Asset Vault on this device?");
  if (!confirmed) return;
  vaultAssets = [];
  saveVault();
  renderVault();
}

function importFiles(files) {
  [...files].forEach(file => {
    if (file.size > 2.5 * 1024 * 1024) {
      alert(`${file.name} is too large for this first localStorage vault. Keep files under 2.5 MB for now.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      addAsset({
        type: detectType(file),
        name: file.name.replace(/\.[^/.]+$/, ""),
        description: `Imported file: ${file.name}`,
        tags: ["imported", file.name.split(".").pop()?.toLowerCase()].filter(Boolean),
        filename: file.name,
        mime: file.type || "application/octet-stream",
        size: file.size,
        dataUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  });
}

function detectType(file) {
  const name = file.name.toLowerCase();
  if (file.type.startsWith("image/")) return "sprite";
  if (file.type.startsWith("audio/")) return "sound";
  if (name.endsWith(".obj") || name.endsWith(".glb") || name.endsWith(".gltf")) return "model";
  if (name.endsWith(".md") || name.endsWith(".txt")) return "book";
  if (name.includes("comic")) return "comic";
  return "file";
}

function restoreVault(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const restoredAssets = Array.isArray(parsed) ? parsed : parsed.assets;
      if (!Array.isArray(restoredAssets)) throw new Error("Backup has no assets array.");
      vaultAssets = restoredAssets;
      saveVault();
      renderVault();
      showVault();
    } catch (error) {
      alert("Could not restore that backup JSON file.");
      console.error(error);
    }
  };
  reader.readAsText(file);
}

function randomizeSpriteControls() {
  spriteNameInput.value = "";
  spriteSeedInput.value = makeSeed();
  spriteClassInput.value = choice(Math.random, classes);
  spriteTypeInput.value = choice(Math.random, types);
  spriteBodyInput.value = choice(Math.random, bodies);
  spriteRarityInput.value = choice(Math.random, rarities);
  spriteMoodInput.value = choice(Math.random, moods);
  spritePaletteInput.value = choice(Math.random, palettes);
  spriteSizeInput.value = choice(Math.random, sizes);
  generateSprite();
}

function collectSpriteConfig() {
  if (!spriteSeedInput.value.trim()) spriteSeedInput.value = makeSeed();
  return {
    name: spriteNameInput.value.trim(),
    seed: spriteSeedInput.value.trim(),
    className: spriteClassInput.value,
    coreType: spriteTypeInput.value,
    body: spriteBodyInput.value,
    rarity: spriteRarityInput.value,
    mood: spriteMoodInput.value,
    paletteTheme: spritePaletteInput.value,
    size: spriteSizeInput.value
  };
}

function autoGenerateName(rng, coreType, className) {
  const prefix = choice(rng, typePrefixes[coreType] || [coreType.slice(0, 4)]);
  const suffix = choice(rng, typeSuffixes);
  const classTailMap = {
    Beast: "",
    Amphibian: "toad",
    Reptile: "scale",
    Insectoid: "bug",
    Avian: "wing",
    Plantborn: "bloom",
    Mineral: "stone",
    Spirit: "wisp",
    Machine: "gear",
    Eldritch: "void"
  };
  const tail = rng() > 0.62 ? choice(rng, [classTailMap[className], suffix]).replace(/^./, char => char) : suffix;
  return `${prefix}${tail}`.replace(/(^.|[-\s].)/g, segment => segment.toUpperCase());
}

function rarityMultiplier(rarity) {
  return { Common: 0.92, Uncommon: 1, Rare: 1.08, Epic: 1.18, Legendary: 1.32 }[rarity] || 1;
}

function sizeMultiplier(size) {
  return { Tiny: 0.86, Small: 0.95, Medium: 1, Large: 1.1, Massive: 1.24 }[size] || 1;
}

function classBaseStats(className) {
  return {
    Beast: { hp: 62, attack: 72, defense: 56, speed: 60 },
    Amphibian: { hp: 58, attack: 54, defense: 56, speed: 63 },
    Reptile: { hp: 64, attack: 66, defense: 61, speed: 52 },
    Insectoid: { hp: 49, attack: 63, defense: 51, speed: 78 },
    Avian: { hp: 54, attack: 59, defense: 46, speed: 84 },
    Plantborn: { hp: 70, attack: 49, defense: 68, speed: 40 },
    Mineral: { hp: 78, attack: 58, defense: 81, speed: 28 },
    Spirit: { hp: 52, attack: 73, defense: 42, speed: 72 },
    Machine: { hp: 66, attack: 68, defense: 74, speed: 41 },
    Eldritch: { hp: 63, attack: 79, defense: 53, speed: 58 }
  }[className];
}

function moodAdjustments(mood) {
  return {
    Aggressive: { attack: 9, speed: 3, defense: -2 },
    Noble: { defense: 6, hp: 4 },
    Curious: { speed: 6, attack: -1 },
    Mischievous: { speed: 8, hp: -2 },
    Ancient: { defense: 8, hp: 8, speed: -4 },
    Cowardly: { speed: 5, attack: -4 },
    Territorial: { attack: 5, defense: 5 },
    Symbiotic: { hp: 6, defense: 4, attack: -1 }
  }[mood] || {};
}

function generateStats(rng, config) {
  const base = { ...classBaseStats(config.className) };
  const mood = moodAdjustments(config.mood);
  const rarity = rarityMultiplier(config.rarity);
  const size = sizeMultiplier(config.size);

  Object.entries(mood).forEach(([stat, value]) => {
    base[stat] += value;
  });

  return Object.fromEntries(Object.entries(base).map(([stat, value]) => {
    const variance = randomInt(rng, -6, 8);
    return [stat, Math.max(12, Math.round((value + variance) * rarity * size))];
  }));
}

function generateSpriteLore(rng, config, name, ability, habitat) {
  const behaviors = {
    Aggressive: "charges first and tests foes with reckless feints",
    Noble: "guards its chosen territory like a sworn sentinel",
    Curious: "studies intruders before striking",
    Mischievous: "likes to toy with anything that enters its range",
    Ancient: "moves with deliberate patience and frightening certainty",
    Cowardly: "avoids direct danger until cornered",
    Territorial: "erupts in force whenever its ground is challenged",
    Symbiotic: "travels beside larger creatures and feeds from their leftovers"
  };

  return `${name} is a ${config.rarity.toLowerCase()} ${config.coreType.toLowerCase()} ${config.className.toLowerCase()} from the ${habitat}. It ${behaviors[config.mood] || "moves unpredictably"}, and channels ${ability.toLowerCase()} whenever it senses pressure.`;
}

function choosePalette(config) {
  const paletteName = config.paletteTheme === "Auto" ? autoPalettes[config.coreType] || "Nether" : config.paletteTheme;
  return { paletteName, colors: palettePresets[paletteName] || palettePresets.Nether };
}

function createGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function setCell(grid, x, y, color) {
  if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length) return;
  grid[y][x] = color;
}

function fillRect(grid, x, y, width, height, color) {
  for (let py = y; py < y + height; py += 1) {
    for (let px = x; px < x + width; px += 1) setCell(grid, px, py, color);
  }
}

function fillEllipse(grid, cx, cy, rx, ry, color) {
  for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y += 1) {
    for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx + 1); x += 1) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) setCell(grid, x, y, color);
    }
  }
}

function linePoints(x1, y1, x2, y2) {
  const points = [];
  const dx = Math.abs(x2 - x1);
  const dy = -Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx + dy;
  let x = x1;
  let y = y1;
  while (true) {
    points.push([x, y]);
    if (x === x2 && y === y2) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x += sx; }
    if (e2 <= dx) { err += dx; y += sy; }
  }
  return points;
}

function drawLine(grid, x1, y1, x2, y2, color, thickness = 1) {
  linePoints(x1, y1, x2, y2).forEach(([x, y]) => {
    for (let oy = -Math.floor(thickness / 2); oy <= Math.floor(thickness / 2); oy += 1) {
      for (let ox = -Math.floor(thickness / 2); ox <= Math.floor(thickness / 2); ox += 1) {
        setCell(grid, x + ox, y + oy, color);
      }
    }
  });
}

function drawFeature(grid, feature, color) {
  feature.cells.forEach(([x, y]) => setCell(grid, x, y, color));
}

function drawBaseBody(grid, config, rng, colors) {
  const scale = sizeMultiplier(config.size);
  const rx = Math.max(2, Math.round(4.2 * scale));
  const ry = Math.max(2, Math.round(3.7 * scale));
  const face = { x: 15, y: 9 };

  switch (config.body) {
    case "Quadruped": {
      fillEllipse(grid, 11, 12, rx + 1, ry, colors.body);
      fillEllipse(grid, 16, 10, Math.max(2, rx - 1), Math.max(2, ry - 1), colors.body);
      fillRect(grid, 7, 15, 2, 4, colors.shadow);
      fillRect(grid, 11, 16, 2, 4, colors.shadow);
      fillRect(grid, 14, 16, 2, 4, colors.shadow);
      fillRect(grid, 18, 15, 2, 4, colors.shadow);
      drawLine(grid, 5, 12, 2, 10, colors.accent);
      return { faceX: 16, faceY: 9, bodyX: 11, bodyY: 12 };
    }
    case "Serpent": {
      for (let i = 0; i < 5; i += 1) fillEllipse(grid, 6 + i * 3, 13 - (i % 2), 2 + (i < 2 ? 1 : 0), 2, i > 2 ? colors.shadow : colors.body);
      fillEllipse(grid, 18, 11, 3, 3, colors.body);
      drawLine(grid, 4, 14, 1, 17, colors.accent);
      return { faceX: 18, faceY: 11, bodyX: 11, bodyY: 13 };
    }
    case "Winged": {
      fillEllipse(grid, 12, 12, rx, ry, colors.body);
      drawLine(grid, 10, 11, 4, 6, colors.shadow, 2);
      drawLine(grid, 11, 12, 4, 12, colors.shadow, 2);
      drawLine(grid, 13, 11, 19, 6, colors.shadow, 2);
      drawLine(grid, 13, 12, 20, 12, colors.shadow, 2);
      fillEllipse(grid, 12, 9, 3, 3, colors.body);
      return { faceX: 12, faceY: 9, bodyX: 12, bodyY: 12 };
    }
    case "Slime": {
      fillEllipse(grid, 12, 13, rx + 1, ry + 1, colors.body);
      fillRect(grid, 9, 16, 1, 3, colors.shadow);
      fillRect(grid, 15, 16, 1, 2, colors.shadow);
      fillRect(grid, 12, 17, 1, 2, colors.shadow);
      return { faceX: 12, faceY: 11, bodyX: 12, bodyY: 13 };
    }
    case "Humanoid": {
      fillEllipse(grid, 12, 7, 3, 3, colors.body);
      fillRect(grid, 10, 10, 5, 6, colors.body);
      drawLine(grid, 10, 10, 7, 14, colors.shadow, 2);
      drawLine(grid, 14, 10, 17, 14, colors.shadow, 2);
      drawLine(grid, 11, 15, 9, 20, colors.shadow, 2);
      drawLine(grid, 13, 15, 15, 20, colors.shadow, 2);
      return { faceX: 12, faceY: 7, bodyX: 12, bodyY: 12 };
    }
    case "Shellback": {
      fillEllipse(grid, 11, 12, rx + 1, ry, colors.body);
      fillEllipse(grid, 11, 11, rx, ry - 1, colors.light);
      fillEllipse(grid, 16, 11, 2, 2, colors.body);
      fillRect(grid, 8, 16, 2, 3, colors.shadow);
      fillRect(grid, 13, 16, 2, 3, colors.shadow);
      return { faceX: 16, faceY: 11, bodyX: 11, bodyY: 12 };
    }
    case "Orb": {
      fillEllipse(grid, 12, 12, rx + 1, ry + 1, colors.body);
      drawLine(grid, 7, 7, 5, 5, colors.accent);
      drawLine(grid, 17, 7, 19, 5, colors.accent);
      drawLine(grid, 12, 17, 12, 20, colors.accent);
      return { faceX: 12, faceY: 12, bodyX: 12, bodyY: 12 };
    }
    case "Insect": {
      fillEllipse(grid, 9, 12, 3, 3, colors.shadow);
      fillEllipse(grid, 13, 12, 4, 4, colors.body);
      fillEllipse(grid, 18, 11, 3, 3, colors.body);
      drawLine(grid, 6, 10, 3, 7, colors.shadow);
      drawLine(grid, 6, 13, 2, 14, colors.shadow);
      drawLine(grid, 20, 10, 22, 7, colors.shadow);
      drawLine(grid, 20, 13, 22, 14, colors.shadow);
      return { faceX: 18, faceY: 10, bodyX: 13, bodyY: 12 };
    }
    default:
      fillEllipse(grid, 12, 12, rx, ry, colors.body);
      return { faceX: 12, faceY: 11, bodyX: 12, bodyY: 12 };
  }
}

function applyTypeFeatures(grid, config, rng, colors, anchors) {
  if (["Quadruped", "Winged", "Humanoid", "Shellback", "Orb"].includes(config.body) && rng() > 0.35) {
    drawFeature(grid, { cells: [[anchors.faceX - 2, anchors.faceY - 2], [anchors.faceX - 3, anchors.faceY - 4], [anchors.faceX + 2, anchors.faceY - 2], [anchors.faceX + 3, anchors.faceY - 4]] }, colors.accent);
  }

  switch (config.coreType) {
    case "Crystal":
      drawLine(grid, anchors.bodyX - 2, anchors.bodyY - 2, anchors.bodyX - 4, anchors.bodyY - 5, colors.light, 2);
      drawLine(grid, anchors.bodyX + 2, anchors.bodyY - 1, anchors.bodyX + 5, anchors.bodyY - 5, colors.light, 2);
      break;
    case "Ember":
      drawLine(grid, anchors.bodyX - 4, anchors.bodyY + 3, anchors.bodyX - 6, anchors.bodyY + 1, colors.accent, 2);
      drawLine(grid, anchors.bodyX + 4, anchors.bodyY + 3, anchors.bodyX + 6, anchors.bodyY + 1, colors.accent, 2);
      break;
    case "Tide":
      drawLine(grid, anchors.bodyX - 5, anchors.bodyY + 1, anchors.bodyX - 7, anchors.bodyY + 3, colors.light, 2);
      drawLine(grid, anchors.bodyX + 5, anchors.bodyY + 1, anchors.bodyX + 7, anchors.bodyY + 3, colors.light, 2);
      break;
    case "Storm":
    case "Static":
      drawFeature(grid, { cells: [[anchors.bodyX + 4, anchors.bodyY - 2], [anchors.bodyX + 5, anchors.bodyY - 1], [anchors.bodyX + 4, anchors.bodyY], [anchors.bodyX + 6, anchors.bodyY + 1]] }, colors.accent);
      break;
    case "Venom":
    case "Fungal":
      fillRect(grid, anchors.bodyX - 4, anchors.bodyY + 1, 2, 2, colors.accent);
      fillRect(grid, anchors.bodyX + 3, anchors.bodyY + 2, 2, 2, colors.accent);
      break;
    case "Bone":
      drawLine(grid, anchors.bodyX - 3, anchors.bodyY - 1, anchors.bodyX - 6, anchors.bodyY - 3, colors.light);
      drawLine(grid, anchors.bodyX + 3, anchors.bodyY - 1, anchors.bodyX + 6, anchors.bodyY - 3, colors.light);
      break;
    case "Metal":
      fillRect(grid, anchors.bodyX - 3, anchors.bodyY - 2, 7, 1, colors.light);
      break;
    case "Solar":
      fillEllipse(grid, anchors.bodyX, anchors.bodyY - 1, 2, 2, colors.light);
      break;
    case "Lunar":
      drawLine(grid, anchors.bodyX + 4, anchors.bodyY - 3, anchors.bodyX + 6, anchors.bodyY - 5, colors.accent);
      break;
    case "Dream":
    case "Gravity":
      fillRect(grid, anchors.bodyX - 1, anchors.bodyY + 4, 3, 1, colors.accent);
      break;
  }
}

function addFace(grid, colors, anchors, mood) {
  setCell(grid, anchors.faceX - 1, anchors.faceY, colors.eye);
  setCell(grid, anchors.faceX + 1, anchors.faceY, colors.eye);
  setCell(grid, anchors.faceX - 1, anchors.faceY + 1, colors.outline);
  setCell(grid, anchors.faceX + 1, anchors.faceY + 1, colors.outline);

  if (mood === "Aggressive" || mood === "Territorial") {
    setCell(grid, anchors.faceX, anchors.faceY + 2, colors.accent);
  } else if (mood === "Mischievous") {
    setCell(grid, anchors.faceX + 1, anchors.faceY + 2, colors.accent);
  } else {
    setCell(grid, anchors.faceX, anchors.faceY + 2, colors.shadow);
  }
}

function addShading(grid, anchors, colors) {
  fillRect(grid, anchors.bodyX - 3, anchors.bodyY - 3, 3, 2, colors.light);
  fillRect(grid, anchors.bodyX + 1, anchors.bodyY + 1, 4, 2, colors.shadow);
}

function renderGridToCanvas(grid, targetCanvas, scale, outlineColor = palettePresets.Nether.outline) {
  const logical = grid.length;
  const offscreen = document.createElement("canvas");
  offscreen.width = logical;
  offscreen.height = logical;
  const ctx = offscreen.getContext("2d", { alpha: true });

  ctx.clearRect(0, 0, logical, logical);

  for (let y = 0; y < logical; y += 1) {
    for (let x = 0; x < logical; x += 1) {
      if (!grid[y][x]) continue;
      for (let oy = -1; oy <= 1; oy += 1) {
        for (let ox = -1; ox <= 1; ox += 1) {
          const nx = x + ox;
          const ny = y + oy;
          if (nx < 0 || ny < 0 || nx >= logical || ny >= logical || !grid[ny][nx]) {
            ctx.fillStyle = outlineColor;
            ctx.fillRect(nx, ny, 1, 1);
          }
        }
      }
    }
  }

  for (let y = 0; y < logical; y += 1) {
    for (let x = 0; x < logical; x += 1) {
      if (!grid[y][x]) continue;
      ctx.fillStyle = grid[y][x];
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const target = targetCanvas.getContext("2d", { alpha: true });
  target.imageSmoothingEnabled = false;
  target.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  target.drawImage(offscreen, 0, 0, logical, logical, 0, 0, logical * scale, logical * scale);

  return targetCanvas.toDataURL("image/png");
}

function dataUrlSize(dataUrl) {
  const base64 = dataUrl.split(",")[1] || "";
  return Math.ceil((base64.length * 3) / 4);
}

function buildSpriteData(config) {
  const seedComposite = `${config.seed}|${config.className}|${config.coreType}|${config.body}|${config.rarity}|${config.mood}|${config.paletteTheme}|${config.size}`;
  const rng = createRng(seedComposite);
  const paletteInfo = choosePalette(config);
  const colors = paletteInfo.colors;
  const name = config.name || autoGenerateName(rng, config.coreType, config.className);
  const habitat = choice(rng, habitatMap[config.coreType] || ["unknown wilds"]);
  const ability = choice(rng, abilityMap[config.coreType] || ["Wild Pulse"]);
  const stats = generateStats(rng, config);
  const grid = createGrid(24);
  const anchors = drawBaseBody(grid, config, rng, colors);
  addShading(grid, anchors, colors);
  applyTypeFeatures(grid, config, rng, colors, anchors);
  addFace(grid, colors, anchors, config.mood);
  if (config.rarity === "Epic" || config.rarity === "Legendary") fillRect(grid, anchors.bodyX - 1, anchors.bodyY - 4, 3, 1, colors.accent);

  const dataUrl = renderGridToCanvas(grid, spriteCanvas, 4, colors.outline);
  const iconDataUrl = renderGridToCanvas(grid, spriteIconCanvas, 2, colors.outline);
  const description = generateSpriteLore(rng, config, name, ability, habitat);
  const exportData = {
    app: "LoganCreations",
    module: "Create Sprite",
    version: "0.4",
    name,
    seed: config.seed,
    className: config.className,
    coreType: config.coreType,
    body: config.body,
    rarity: config.rarity,
    mood: config.mood,
    palette: paletteInfo.paletteName,
    size: config.size,
    ability,
    habitat,
    stats,
    description,
    tags: [config.className.toLowerCase(), config.coreType.toLowerCase(), config.rarity.toLowerCase(), config.body.toLowerCase()],
    image: {
      filename: `${slugify(name)}.png`,
      width: 96,
      height: 96
    }
  };

  return { name, dataUrl, iconDataUrl, ability, habitat, description, stats, paletteName: paletteInfo.paletteName, exportData };
}

function slugify(value) {
  return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "sprite";
}

function updateSpriteUi(spriteData, config) {
  spritePreviewName.textContent = spriteData.name;
  spriteSeedBadge.textContent = `Seed ${config.seed}`;
  spriteStatus.textContent = `${config.rarity} ${config.coreType} ${config.className}`;
  spriteAbility.textContent = spriteData.ability;
  spriteHabitat.textContent = spriteData.habitat;
  spriteDescription.textContent = spriteData.description;

  spriteTags.innerHTML = [config.className, config.coreType, config.body, config.rarity, config.mood, spriteData.paletteName]
    .map(tag => `<span class="option-chip">${escapeHtml(tag)}</span>`)
    .join("");

  spriteStats.innerHTML = Object.entries(spriteData.stats).map(([stat, value]) => {
    const width = Math.min(100, Math.round(value / 1.4));
    return `
      <div class="stat-row">
        <span>${stat.toUpperCase()}</span>
        <div class="stat-bar"><i style="width:${width}%"></i></div>
        <strong>${value}</strong>
      </div>
    `;
  }).join("");
}

function generateSprite() {
  const config = collectSpriteConfig();
  const spriteData = buildSpriteData(config);
  currentSprite = {
    ...spriteData,
    config,
    filename: `${slugify(spriteData.name)}.png`,
    jsonFilename: `${slugify(spriteData.name)}.json`,
    size: dataUrlSize(spriteData.dataUrl)
  };
  if (!spriteNameInput.value.trim()) spriteNameInput.value = currentSprite.name;
  updateSpriteUi(currentSprite, config);
}

function rerollBody() {
  spriteSeedInput.value = makeSeed();
  const remaining = bodies.filter(value => value !== spriteBodyInput.value);
  spriteBodyInput.value = choice(Math.random, remaining);
  generateSprite();
}

function rerollPalette() {
  spriteSeedInput.value = makeSeed();
  const remaining = palettes.filter(value => value !== spritePaletteInput.value);
  spritePaletteInput.value = choice(Math.random, remaining);
  generateSprite();
}

function downloadCurrentSprite() {
  if (!currentSprite) return;
  downloadBlob(currentSprite.filename, dataUrlToBlob(currentSprite.dataUrl));
}

function downloadCurrentSpriteJson() {
  if (!currentSprite) return;
  const blob = new Blob([JSON.stringify(currentSprite.exportData, null, 2)], { type: "application/json" });
  downloadBlob(currentSprite.jsonFilename, blob);
}

function saveCurrentSpriteToVault() {
  if (!currentSprite) return;
  addAsset({
    type: "sprite",
    name: currentSprite.name,
    description: currentSprite.description,
    tags: currentSprite.exportData.tags,
    filename: currentSprite.filename,
    mime: "image/png",
    size: currentSprite.size,
    dataUrl: currentSprite.dataUrl,
    content: currentSprite.exportData
  });
  spriteStatus.textContent = `${currentSprite.name} saved to Asset Vault`;
}

cards.forEach(card => {
  card.addEventListener("click", () => selectModule(card.dataset.module));
});

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "new-project") selectModule("sprite-lab");
    if (action === "open-library") selectModule("asset-vault");
  });
});

document.querySelectorAll("[data-vault-command]").forEach(button => {
  button.addEventListener("click", () => {
    const command = button.dataset.vaultCommand;
    if (command === "demo") createDemoAsset();
    if (command === "import") importInput.click();
    if (command === "export") exportVault();
    if (command === "restore") restoreInput.click();
    if (command === "clear") clearVault();
  });
});

vaultGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-vault-action]");
  if (!button) return;
  const action = button.dataset.vaultAction;
  const id = button.dataset.id;
  if (action === "download") downloadAsset(id);
  if (action === "duplicate") duplicateAsset(id);
  if (action === "remove") removeAsset(id);
});

[vaultSearch, vaultType].forEach(input => input.addEventListener("input", renderVault));
importInput.addEventListener("change", () => {
  importFiles(importInput.files);
  importInput.value = "";
});
restoreInput.addEventListener("change", () => {
  const [file] = restoreInput.files;
  if (file) restoreVault(file);
  restoreInput.value = "";
});

generateSpriteBtn.addEventListener("click", generateSprite);
randomizeSpriteBtn.addEventListener("click", randomizeSpriteControls);
rerollBodyBtn.addEventListener("click", rerollBody);
rerollPaletteBtn.addEventListener("click", rerollPalette);
downloadSpriteBtn.addEventListener("click", downloadCurrentSprite);
downloadSpriteJsonBtn.addEventListener("click", downloadCurrentSpriteJson);
saveSpriteBtn.addEventListener("click", saveCurrentSpriteToVault);

[spriteClassInput, spriteTypeInput, spriteBodyInput, spriteRarityInput, spriteMoodInput, spritePaletteInput, spriteSizeInput].forEach(input => {
  input.addEventListener("change", generateSprite);
});

spriteNameInput.addEventListener("change", generateSprite);
spriteSeedInput.addEventListener("change", generateSprite);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀" : "☾";
});

if (!spriteSeedInput.value.trim()) spriteSeedInput.value = makeSeed();
generateSprite();
renderVault();
selectModule("sprite-lab");
