const moduleDetails = {
  "asset-vault": {
    title: "Asset Vault",
    badge: "Storage Core",
    text: "Working vault for saved assets. Import files, create test assets, search, download, remove, and export the vault as a backup JSON file.",
    options: ["Store", "Import", "Download", "Remove", "Backup", "Restore"]
  },
  "sprite-lab": {
    title: "Create Sprite",
    badge: "Sprite Designer v0.5",
    text: "Rebuilt sprite designer with clearer controls: what you are making, concrete silhouette templates, type/theme, real output size, prompt notes, PNG/JSON export, and vault saving.",
    options: ["Creature", "Item", "Trainer", "Badge", "PNG", "Save to Vault"]
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

const themePalettes = {
  Fire: ["#2a0803", "#7f1d1d", "#e24a21", "#ff9f1c", "#ffe066"],
  Water: ["#071826", "#0f4c81", "#1982c4", "#5dd9ff", "#e6fdff"],
  Electric: ["#111827", "#3d348b", "#7678ed", "#f7d51d", "#fff7a8"],
  Grass: ["#10220f", "#2d6a2e", "#52b788", "#a7c957", "#f0ffb3"],
  Ice: ["#0b1f2a", "#2f6f95", "#8ecae6", "#caf0f8", "#ffffff"],
  Poison: ["#17111e", "#5a189a", "#7b2cbf", "#80b918", "#d9ed92"],
  Ghost: ["#09090f", "#2b2d42", "#6d597a", "#b56576", "#f8edeb"],
  Rock: ["#120d08", "#463f3a", "#8a817c", "#bcb8b1", "#f4f3ee"],
  Steel: ["#0f1115", "#343a40", "#6c757d", "#adb5bd", "#f8f9fa"],
  Dragon: ["#12091f", "#3a0ca3", "#7209b7", "#f72585", "#ffd166"],
  Fairy: ["#2b0b20", "#b5179e", "#f72585", "#ffafcc", "#fff0f3"],
  Dark: ["#050505", "#171717", "#3f3f46", "#a855f7", "#f5f3ff"],
  Normal: ["#15110d", "#6b5d4d", "#a99985", "#e7d8c9", "#fff7ed"],
  Nether: ["#090202", "#3b0808", "#b91c1c", "#f97316", "#a855f7"],
  Custom: ["#111111", "#333333", "#e24a21", "#ffd166", "#ffffff"]
};

const templateGroups = {
  creature: ["wolf", "dragon", "bird", "fish", "bug", "slime", "ghost", "golem", "robot", "mushroom"],
  item: ["sword", "potion", "gem", "egg"],
  trainer: ["trainer"],
  badge: ["badge", "gem", "egg"]
};

const templates = {
  wolf: "Wolf / cat creature",
  dragon: "Dragon / lizard creature",
  bird: "Bird / winged creature",
  fish: "Fish / aquatic creature",
  bug: "Bug / insect creature",
  slime: "Slime / blob creature",
  ghost: "Ghost / spirit creature",
  golem: "Rock / golem creature",
  robot: "Robot / machine creature",
  mushroom: "Mushroom / plant creature",
  sword: "Sword / weapon item",
  potion: "Potion / bottle item",
  gem: "Gem / crystal item",
  egg: "Egg / orb object",
  trainer: "Trainer / character bust",
  badge: "Badge / emblem"
};

const VAULT_KEY = "logansCreations.assetVault.v1";
const cards = document.querySelectorAll(".module-card");
const previewTitle = document.getElementById("previewTitle");
const previewBadge = document.getElementById("previewBadge");
const previewText = document.getElementById("previewText");
const previewOptions = document.getElementById("previewOptions");
const themeToggle = document.getElementById("themeToggle");

const spriteSection = document.getElementById("spriteLab");
const spriteStatus = document.getElementById("spriteStatus");
const spriteCanvas = document.getElementById("spriteCanvas");
const spriteIconCanvas = document.getElementById("spriteIconCanvas");
const spritePreviewName = document.getElementById("spritePreviewName");
const spriteSeedBadge = document.getElementById("spriteSeedBadge");
const spriteStats = document.getElementById("spriteStats");
const spriteTags = document.getElementById("spriteTags");
const spriteUseCase = document.getElementById("spriteUseCase");
const spriteStyleNotes = document.getElementById("spriteStyleNotes");
const spriteDescription = document.getElementById("spriteDescription");
const spriteNameInput = document.getElementById("spriteName");
const spriteOutputSizeInput = document.getElementById("spriteOutputSize");
const spriteKindInput = document.getElementById("spriteKind");
const spriteTemplateInput = document.getElementById("spriteTemplate");
const spriteThemeInput = document.getElementById("spriteTheme");
const spritePaletteInput = document.getElementById("spritePalette");
const spritePromptInput = document.getElementById("spritePrompt");
const spriteMainColorInput = document.getElementById("spriteMainColor");
const spriteAccentColorInput = document.getElementById("spriteAccentColor");
const spriteSeedInput = document.getElementById("spriteSeed");
const spriteDetailInput = document.getElementById("spriteDetail");
const generateSpriteBtn = document.getElementById("generateSpriteBtn");
const randomizeSpriteBtn = document.getElementById("randomizeSpriteBtn");
const rerollShapeBtn = document.getElementById("rerollShapeBtn");
const rerollColorsBtn = document.getElementById("rerollColorsBtn");
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
  if (key === "sprite-lab") showSpriteLab();
  if (key === "asset-vault") showVault();
}

function showSpriteLab() {
  spriteSection.hidden = false;
  if (!currentSprite) generateSprite();
  setTimeout(() => spriteSection.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
}

function showVault() {
  vaultSection.hidden = false;
  renderVault();
  setTimeout(() => vaultSection.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
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

function rngFrom(value) {
  return mulberry32(hashString(value));
}

function randInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function pick(rng, values) {
  return values[Math.floor(rng() * values.length)];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
  }[char]));
}

function formatBytes(bytes = 0) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function slugify(value) {
  return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "sprite";
}

function assetIcon(type) {
  return { sprite: "▣", book: "✦", culture: "◈", language: "⌁", model: "⬡", sound: "≋", comic: "▤", factory: "▦", file: "◆" }[type] || "◆";
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
      <div class="asset-tags">${(asset.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="asset-actions">
        <button type="button" data-vault-action="download" data-id="${asset.id}">Download</button>
        <button type="button" data-vault-action="duplicate" data-id="${asset.id}">Duplicate</button>
        <button class="danger-action" type="button" data-vault-action="remove" data-id="${asset.id}">Remove</button>
      </div>
    </article>
  `).join("");
}

function addAsset(asset) {
  vaultAssets.unshift({ tags: [], ...asset, id: makeId(), createdAt: new Date().toISOString() });
  saveVault();
  renderVault();
}

function createDemoAsset() {
  addAsset({
    type: "sprite",
    name: "Demo Vault Sprite",
    description: "Demo entry for testing Asset Vault controls.",
    tags: ["demo", "sprite"],
    filename: "demo-vault-sprite.json",
    mime: "application/json",
    size: 300,
    content: { demo: true, module: "Asset Vault" }
  });
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
  if (asset.dataUrl) return downloadBlob(asset.filename || `${asset.name}.asset`, dataUrlToBlob(asset.dataUrl));
  const blob = new Blob([JSON.stringify(asset.content || asset, null, 2)], { type: "application/json" });
  downloadBlob(asset.filename || `${slugify(asset.name)}.json`, blob);
}

function duplicateAsset(id) {
  const asset = vaultAssets.find(item => item.id === id);
  if (!asset) return;
  const { id: oldId, createdAt, ...copy } = asset;
  addAsset({ ...copy, name: `${asset.name} Copy` });
}

function removeAsset(id) {
  const asset = vaultAssets.find(item => item.id === id);
  if (!asset || !confirm(`Remove "${asset.name}" from the Asset Vault?`)) return;
  vaultAssets = vaultAssets.filter(item => item.id !== id);
  saveVault();
  renderVault();
}

function exportVault() {
  const backup = { app: "LoganCreations", version: "0.5", exportedAt: new Date().toISOString(), assets: vaultAssets };
  downloadBlob("loganscreations-asset-vault-backup.json", new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
}

function clearVault() {
  if (!vaultAssets.length || !confirm("Remove every asset from the Asset Vault on this device?")) return;
  vaultAssets = [];
  saveVault();
  renderVault();
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

function importFiles(files) {
  [...files].forEach(file => {
    if (file.size > 2.5 * 1024 * 1024) return alert(`${file.name} is too large for this first localStorage vault. Keep files under 2.5 MB for now.`);
    const reader = new FileReader();
    reader.onload = () => addAsset({
      type: detectType(file),
      name: file.name.replace(/\.[^/.]+$/, ""),
      description: `Imported file: ${file.name}`,
      tags: ["imported", file.name.split(".").pop()?.toLowerCase()].filter(Boolean),
      filename: file.name,
      mime: file.type || "application/octet-stream",
      size: file.size,
      dataUrl: reader.result
    });
    reader.readAsDataURL(file);
  });
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

function getSpriteConfig() {
  if (!spriteSeedInput.value.trim()) spriteSeedInput.value = makeSeed();
  return {
    name: spriteNameInput.value.trim(),
    outputSize: Number(spriteOutputSizeInput.value),
    kind: spriteKindInput.value,
    template: spriteTemplateInput.value,
    theme: spriteThemeInput.value,
    paletteMode: spritePaletteInput.value,
    prompt: spritePromptInput.value.trim(),
    mainColor: spriteMainColorInput.value,
    accentColor: spriteAccentColorInput.value,
    seed: spriteSeedInput.value.trim(),
    detail: spriteDetailInput.value
  };
}

function resolvedPalette(config) {
  let base = themePalettes[config.theme] || themePalettes.Normal;
  if (config.paletteMode === "nether") base = themePalettes.Nether;
  if (config.paletteMode === "muted") base = [base[0], shade(base[2], -45), shade(base[2], -10), shade(base[3], -15), shade(base[4], -10)];
  if (config.paletteMode === "bright") base = [base[0], shade(base[2], -35), base[2], shade(base[3], 20), base[4]];
  if (config.paletteMode === "custom") base = ["#101010", shade(config.mainColor, -45), config.mainColor, config.accentColor, "#fff4cc"];
  return { outline: base[0], shadow: base[1], mid: base[2], light: base[3], shine: base[4] };
}

function shade(hex, amount) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (n & 255) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function makeGrid(size = 32) {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function cell(grid, x, y, color) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length) return;
  grid[y][x] = color;
}

function rect(grid, x, y, w, h, color) {
  for (let py = y; py < y + h; py += 1) for (let px = x; px < x + w; px += 1) cell(grid, px, py, color);
}

function ellipse(grid, cx, cy, rx, ry, color) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y += 1) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x += 1) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) cell(grid, x, y, color);
    }
  }
}

function line(grid, x1, y1, x2, y2, color, thickness = 1) {
  const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  for (let i = 0; i <= steps; i += 1) {
    const x = x1 + (x2 - x1) * (i / steps);
    const y = y1 + (y2 - y1) * (i / steps);
    for (let oy = -Math.floor(thickness / 2); oy <= Math.floor(thickness / 2); oy += 1) for (let ox = -Math.floor(thickness / 2); ox <= Math.floor(thickness / 2); ox += 1) cell(grid, x + ox, y + oy, color);
  }
}

function tri(grid, points, color) {
  const [a, b, c] = points;
  const minX = Math.floor(Math.min(a[0], b[0], c[0]));
  const maxX = Math.ceil(Math.max(a[0], b[0], c[0]));
  const minY = Math.floor(Math.min(a[1], b[1], c[1]));
  const maxY = Math.ceil(Math.max(a[1], b[1], c[1]));
  const area = edge(a, b, c);
  for (let y = minY; y <= maxY; y += 1) for (let x = minX; x <= maxX; x += 1) {
    const p = [x, y];
    const w0 = edge(b, c, p);
    const w1 = edge(c, a, p);
    const w2 = edge(a, b, p);
    if ((w0 >= 0 && w1 >= 0 && w2 >= 0 && area >= 0) || (w0 <= 0 && w1 <= 0 && w2 <= 0 && area <= 0)) cell(grid, x, y, color);
  }
}

function edge(a, b, c) {
  return (c[0] - a[0]) * (b[1] - a[1]) - (c[1] - a[1]) * (b[0] - a[0]);
}

function drawEyes(grid, x, y, colors) {
  cell(grid, x - 1, y, colors.shine);
  cell(grid, x + 1, y, colors.shine);
  cell(grid, x - 1, y + 1, colors.outline);
  cell(grid, x + 1, y + 1, colors.outline);
}

function addOutline(source, colors) {
  const size = source.length;
  const out = source.map(row => row.slice());
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) {
    if (!source[y][x]) continue;
    [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]].forEach(([ox, oy]) => {
      const nx = x + ox, ny = y + oy;
      if (nx >= 0 && ny >= 0 && nx < size && ny < size && !source[ny][nx]) out[ny][nx] = colors.outline;
    });
  }
  return out;
}

function drawSparkles(grid, rng, colors, count) {
  for (let i = 0; i < count; i += 1) {
    const x = randInt(rng, 4, 27), y = randInt(rng, 4, 27);
    cell(grid, x, y, colors.light);
    if (rng() > 0.6) cell(grid, x + 1, y, colors.shine);
  }
}

function drawTemplate(grid, config, rng, colors) {
  const d = config.detail;
  const high = d === "detailed";
  switch (config.template) {
    case "wolf":
      ellipse(grid, 14, 18, 8, 5, colors.mid); ellipse(grid, 22, 14, 5, 4, colors.mid);
      tri(grid, [[19,11],[21,6],[23,12]], colors.mid); tri(grid, [[23,11],[26,7],[26,14]], colors.mid);
      line(grid, 7, 18, 2, 14, colors.shadow, 2); rect(grid, 8, 22, 3, 5, colors.shadow); rect(grid, 15, 22, 3, 5, colors.shadow); rect(grid, 20, 20, 3, 5, colors.shadow);
      drawEyes(grid, 23, 14, colors); rect(grid, 16, 15, 5, 2, colors.light); break;
    case "dragon":
      ellipse(grid, 13, 18, 8, 4, colors.mid); ellipse(grid, 22, 14, 5, 4, colors.mid);
      line(grid, 7, 19, 2, 23, colors.shadow, 2); line(grid, 13, 14, 8, 8, colors.shadow, 2); line(grid, 15, 14, 22, 7, colors.shadow, 2);
      tri(grid, [[20,11],[21,6],[23,11]], colors.light); tri(grid, [[23,11],[26,7],[26,14]], colors.light); drawEyes(grid, 23, 14, colors); break;
    case "bird":
      ellipse(grid, 16, 17, 6, 7, colors.mid); ellipse(grid, 20, 11, 4, 4, colors.mid);
      tri(grid, [[14,16],[5,10],[10,22]], colors.shadow); tri(grid, [[22,11],[28,13],[22,15]], colors.light); line(grid, 16, 23, 14, 28, colors.shadow, 2); line(grid, 18, 23, 20, 28, colors.shadow, 2); drawEyes(grid, 20, 10, colors); break;
    case "fish":
      ellipse(grid, 16, 16, 8, 5, colors.mid); tri(grid, [[7,16],[2,11],[2,21]], colors.shadow); tri(grid, [[17,12],[20,6],[22,13]], colors.light); tri(grid, [[17,20],[21,26],[22,19]], colors.light); drawEyes(grid, 21, 15, colors); break;
    case "bug":
      ellipse(grid, 10, 17, 4, 5, colors.shadow); ellipse(grid, 16, 16, 5, 6, colors.mid); ellipse(grid, 23, 15, 4, 4, colors.mid);
      [8,12,18,22].forEach(x => { line(grid, x, 18, x - 4, 23, colors.shadow); line(grid, x, 14, x - 3, 9, colors.shadow); });
      line(grid, 24, 12, 27, 7, colors.light); line(grid, 25, 13, 29, 10, colors.light); drawEyes(grid, 23, 14, colors); break;
    case "slime":
      ellipse(grid, 16, 19, 10, 8, colors.mid); ellipse(grid, 13, 14, 5, 4, colors.light); rect(grid, 8, 25, 5, 2, colors.shadow); rect(grid, 19, 25, 5, 2, colors.shadow); drawEyes(grid, 16, 18, colors); break;
    case "ghost":
      ellipse(grid, 16, 15, 8, 9, colors.mid); rect(grid, 8, 17, 16, 8, colors.mid); tri(grid, [[8,25],[11,30],[14,25]], colors.mid); tri(grid, [[14,25],[17,30],[20,25]], colors.mid); tri(grid, [[20,25],[24,30],[24,25]], colors.mid); drawEyes(grid, 16, 14, colors); break;
    case "golem":
      rect(grid, 10, 9, 12, 8, colors.mid); rect(grid, 8, 17, 16, 9, colors.shadow); rect(grid, 5, 18, 4, 8, colors.mid); rect(grid, 23, 18, 4, 8, colors.mid); rect(grid, 10, 26, 5, 4, colors.shadow); rect(grid, 18, 26, 5, 4, colors.shadow); drawEyes(grid, 16, 13, colors); break;
    case "robot":
      rect(grid, 10, 8, 12, 10, colors.mid); rect(grid, 9, 18, 14, 9, colors.shadow); rect(grid, 5, 20, 4, 5, colors.mid); rect(grid, 23, 20, 4, 5, colors.mid); line(grid, 13, 8, 10, 4, colors.light); line(grid, 19, 8, 22, 4, colors.light); drawEyes(grid, 16, 13, colors); break;
    case "mushroom":
      ellipse(grid, 16, 12, 10, 6, colors.mid); rect(grid, 12, 15, 8, 12, colors.light); ellipse(grid, 11, 10, 3, 2, colors.shine); ellipse(grid, 20, 13, 2, 2, colors.shine); drawEyes(grid, 16, 20, colors); break;
    case "sword":
      tri(grid, [[16,3],[12,18],[20,18]], colors.light); rect(grid, 14, 17, 4, 8, colors.mid); rect(grid, 9, 20, 14, 3, colors.shadow); rect(grid, 13, 25, 6, 4, colors.accent || colors.shine); break;
    case "potion":
      rect(grid, 14, 5, 5, 6, colors.light); ellipse(grid, 16, 18, 7, 9, colors.mid); rect(grid, 12, 11, 9, 2, colors.shadow); ellipse(grid, 18, 16, 2, 3, colors.shine); break;
    case "gem":
      tri(grid, [[16,3],[6,13],[26,13]], colors.light); tri(grid, [[6,13],[16,29],[26,13]], colors.mid); line(grid, 16, 4, 16, 28, colors.shine); line(grid, 6, 13, 26, 13, colors.shadow); break;
    case "egg":
      ellipse(grid, 16, 17, 8, 11, colors.mid); ellipse(grid, 13, 12, 3, 4, colors.light); rect(grid, 10, 21, 4, 3, colors.shadow); rect(grid, 19, 17, 3, 3, colors.accent || colors.shine); break;
    case "trainer":
      ellipse(grid, 16, 10, 6, 6, colors.light); rect(grid, 10, 16, 12, 11, colors.mid); rect(grid, 8, 13, 16, 3, colors.shadow); rect(grid, 12, 8, 8, 2, colors.shadow); drawEyes(grid, 16, 10, colors); break;
    case "badge":
      ellipse(grid, 16, 16, 10, 10, colors.mid); ellipse(grid, 16, 16, 6, 6, colors.light); tri(grid, [[16,5],[19,16],[16,27],[13,16]], colors.shadow); drawSparkles(grid, rng, colors, 8); break;
  }
  if (high) drawSparkles(grid, rng, colors, 5);
}

function renderGrid(grid, canvas, size, colors) {
  const finalGrid = addOutline(grid, colors);
  const logical = finalGrid.length;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, size, size);
  const pixel = size / logical;
  for (let y = 0; y < logical; y += 1) for (let x = 0; x < logical; x += 1) {
    if (!finalGrid[y][x]) continue;
    ctx.fillStyle = finalGrid[y][x];
    ctx.fillRect(Math.floor(x * pixel), Math.floor(y * pixel), Math.ceil(pixel), Math.ceil(pixel));
  }
  return canvas.toDataURL("image/png");
}

function previewDataUrl(dataUrl, canvas) {
  const img = new Image();
  img.onload = () => {
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = dataUrl;
}

function autoName(config, rng) {
  if (config.name) return config.name;
  const first = {
    Fire: ["Ash", "Cinder", "Flare"], Water: ["Ripple", "Mire", "Aqua"], Electric: ["Volt", "Spark", "Jolt"], Grass: ["Moss", "Thorn", "Leaf"], Ice: ["Frost", "Snow", "Glaze"], Poison: ["Vile", "Toxi", "Spore"], Ghost: ["Wisp", "Shade", "Hex"], Rock: ["Boulder", "Gravel", "Stone"], Steel: ["Iron", "Chrome", "Gear"], Dragon: ["Drake", "Fang", "Scale"], Fairy: ["Glimmer", "Charm", "Pix"], Dark: ["Night", "Umbra", "Gloom"], Normal: ["Nim", "Pip", "Taro"], Nether: ["Ash", "Basalt", "Magma"], Custom: ["Nova", "Rune", "Flux"]
  }[config.theme] || ["Nova"];
  const last = { creature: ["cub", "ling", "fang", "moth", "drake"], item: ["stone", "blade", "orb", "vial"], trainer: ["hero", "rival", "scout"], badge: ["badge", "crest", "sigil"] }[config.kind];
  return `${pick(rng, first)}${pick(rng, last)}`.replace(/^./, c => c.toUpperCase());
}

function buildSprite() {
  const config = getSpriteConfig();
  const rng = rngFrom(`${config.seed}|${config.kind}|${config.template}|${config.theme}|${config.paletteMode}|${config.detail}|${config.prompt}`);
  const colors = resolvedPalette(config);
  colors.accent = config.accentColor;
  const grid = makeGrid(32);
  drawTemplate(grid, config, rng, colors);
  const outputCanvas = document.createElement("canvas");
  const dataUrl = renderGrid(grid, outputCanvas, config.outputSize, colors);
  previewDataUrl(dataUrl, spriteCanvas);
  previewDataUrl(dataUrl, spriteIconCanvas);
  const name = autoName(config, rng);
  const useCase = `${config.outputSize}x${config.outputSize} ${config.kind} PNG`;
  const styleNotes = `${templates[config.template]} · ${config.theme} theme · ${config.detail} detail`;
  const desc = config.prompt ? `${name}: ${config.prompt}` : `${name} is a ${config.theme.toLowerCase()} themed ${templates[config.template].toLowerCase()} made for a custom monster/RPG project.`;
  const exportData = {
    app: "LoganCreations",
    version: "0.5",
    module: "Create Sprite",
    name,
    kind: config.kind,
    template: config.template,
    theme: config.theme,
    paletteMode: config.paletteMode,
    outputSize: config.outputSize,
    seed: config.seed,
    detail: config.detail,
    prompt: config.prompt,
    useCase,
    styleNotes,
    description: desc,
    filename: `${slugify(name)}.png`
  };
  currentSprite = {
    name,
    dataUrl,
    filename: `${slugify(name)}.png`,
    jsonFilename: `${slugify(name)}.json`,
    size: Math.ceil(((dataUrl.split(",")[1] || "").length * 3) / 4),
    exportData,
    description: desc,
    tags: [config.kind, config.template, config.theme.toLowerCase(), `${config.outputSize}x${config.outputSize}`]
  };
  if (!spriteNameInput.value.trim()) spriteNameInput.value = name;
  updateSpriteUi(config);
}

function updateSpriteUi(config) {
  spritePreviewName.textContent = currentSprite.name;
  spriteSeedBadge.textContent = `Seed ${config.seed}`;
  spriteStatus.textContent = `${config.outputSize}x${config.outputSize} ${config.kind}`;
  spriteUseCase.textContent = currentSprite.exportData.useCase;
  spriteStyleNotes.textContent = currentSprite.exportData.styleNotes;
  spriteDescription.textContent = currentSprite.description;
  spriteTags.innerHTML = currentSprite.tags.map(tag => `<span class="option-chip">${escapeHtml(tag)}</span>`).join("");
  spriteStats.innerHTML = [
    ["SIZE", `${config.outputSize}x${config.outputSize}`],
    ["KIND", config.kind],
    ["SHAPE", templates[config.template].split(" /")[0]],
    ["THEME", config.theme]
  ].map(([label, value]) => `<div class="stat-row sprite-detail-row"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
}

function randomizeSprite() {
  const kind = pick(Math.random, ["creature", "item", "trainer", "badge"]);
  spriteKindInput.value = kind;
  syncTemplateOptions();
  spriteTemplateInput.value = pick(Math.random, templateGroups[kind]);
  spriteThemeInput.value = pick(Math.random, Object.keys(themePalettes));
  spritePaletteInput.value = pick(Math.random, ["auto", "bright", "muted", "nether"]);
  spriteOutputSizeInput.value = pick(Math.random, ["32", "64", "96"]);
  spriteDetailInput.value = pick(Math.random, ["clean", "detailed", "icon"]);
  spriteNameInput.value = "";
  spriteSeedInput.value = makeSeed();
  generateSprite();
}

function rerollShape() {
  const values = templateGroups[spriteKindInput.value] || templateGroups.creature;
  const available = values.filter(value => value !== spriteTemplateInput.value);
  spriteTemplateInput.value = pick(Math.random, available.length ? available : values);
  spriteSeedInput.value = makeSeed();
  generateSprite();
}

function rerollColors() {
  const names = Object.keys(themePalettes).filter(name => name !== spriteThemeInput.value);
  spriteThemeInput.value = pick(Math.random, names);
  spriteSeedInput.value = makeSeed();
  generateSprite();
}

function syncTemplateOptions() {
  const values = templateGroups[spriteKindInput.value] || templateGroups.creature;
  spriteTemplateInput.innerHTML = values.map(value => `<option value="${value}">${templates[value]}</option>`).join("");
}

function downloadCurrentSprite() {
  if (!currentSprite) return;
  downloadBlob(currentSprite.filename, dataUrlToBlob(currentSprite.dataUrl));
}

function downloadCurrentSpriteJson() {
  if (!currentSprite) return;
  downloadBlob(currentSprite.jsonFilename, new Blob([JSON.stringify(currentSprite.exportData, null, 2)], { type: "application/json" }));
}

function saveCurrentSpriteToVault() {
  if (!currentSprite) return;
  addAsset({
    type: "sprite",
    name: currentSprite.name,
    description: currentSprite.description,
    tags: currentSprite.tags,
    filename: currentSprite.filename,
    mime: "image/png",
    size: currentSprite.size,
    dataUrl: currentSprite.dataUrl,
    content: currentSprite.exportData
  });
  spriteStatus.textContent = `${currentSprite.name} saved to Asset Vault`;
}

cards.forEach(card => card.addEventListener("click", () => selectModule(card.dataset.module)));

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.action === "new-project") selectModule("sprite-lab");
    if (button.dataset.action === "open-library") selectModule("asset-vault");
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
  if (button.dataset.vaultAction === "download") downloadAsset(button.dataset.id);
  if (button.dataset.vaultAction === "duplicate") duplicateAsset(button.dataset.id);
  if (button.dataset.vaultAction === "remove") removeAsset(button.dataset.id);
});

[vaultSearch, vaultType].forEach(input => input.addEventListener("input", renderVault));
importInput.addEventListener("change", () => { importFiles(importInput.files); importInput.value = ""; });
restoreInput.addEventListener("change", () => { const [file] = restoreInput.files; if (file) restoreVault(file); restoreInput.value = ""; });

generateSpriteBtn.addEventListener("click", buildSprite);
randomizeSpriteBtn.addEventListener("click", randomizeSprite);
rerollShapeBtn.addEventListener("click", rerollShape);
rerollColorsBtn.addEventListener("click", rerollColors);
downloadSpriteBtn.addEventListener("click", downloadCurrentSprite);
downloadSpriteJsonBtn.addEventListener("click", downloadCurrentSpriteJson);
saveSpriteBtn.addEventListener("click", saveCurrentSpriteToVault);

[spriteOutputSizeInput, spriteTemplateInput, spriteThemeInput, spritePaletteInput, spriteMainColorInput, spriteAccentColorInput, spriteDetailInput].forEach(input => input.addEventListener("change", buildSprite));
spritePromptInput.addEventListener("change", buildSprite);
spriteNameInput.addEventListener("change", buildSprite);
spriteSeedInput.addEventListener("change", buildSprite);
spriteKindInput.addEventListener("change", () => { syncTemplateOptions(); buildSprite(); });

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀" : "☾";
});

if (!spriteSeedInput.value.trim()) spriteSeedInput.value = makeSeed();
syncTemplateOptions();
buildSprite();
renderVault();
selectModule("sprite-lab");
