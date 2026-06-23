const VAULT_KEY = "logansCreations.assetVault.v2";

const themePalettes = {
  Fire: ["#351006", "#9a2312", "#e24a21", "#ff9d32", "#ffe08a"],
  Water: ["#061a2c", "#125a8a", "#1fa5d8", "#8ee8ff", "#e7ffff"],
  Electric: ["#16121d", "#5542a5", "#ffd447", "#fff49a", "#72f7ff"],
  Grass: ["#0f2511", "#2d6b2f", "#62b947", "#b7ef77", "#fff6b5"],
  Ice: ["#0b2030", "#2e7aa1", "#7ed8ff", "#d2f7ff", "#ffffff"],
  Poison: ["#16121c", "#50247f", "#8b39b3", "#9ee23a", "#e7ff84"],
  Ghost: ["#0c0a14", "#33275a", "#7d5cc4", "#d4b8ff", "#ffffff"],
  Rock: ["#17110d", "#4c3323", "#826042", "#c8a476", "#f1dbb2"],
  Steel: ["#111317", "#454c56", "#87909d", "#d9e1e8", "#ff934d"],
  Dragon: ["#120c1d", "#3d215f", "#7f3fbf", "#e25252", "#ffd36a"],
  Fairy: ["#21101f", "#af4fa3", "#ff9ee7", "#ffe1fb", "#fff4b8"],
  Dark: ["#050508", "#181827", "#46415f", "#8b75c9", "#f2e9ff"],
  Normal: ["#17130f", "#665247", "#b99a86", "#ead4bd", "#ffffff"],
  Nether: ["#120303", "#4c0b07", "#b52516", "#ff7a18", "#ffd166"]
};

const templateDefaults = {
  creature: "wolf",
  item: "sword",
  trainer: "trainer",
  badge: "badge"
};

const kindUse = {
  creature: "game creature, battle sprite, enemy, companion, monster index",
  item: "inventory icon, loot item, weapon, relic, pickup",
  trainer: "character profile, NPC, trainer portrait, dialogue icon",
  badge: "achievement badge, faction mark, gym-style emblem, logo icon"
};

let vault = loadVault();
let currentSprite = null;

const $ = id => document.getElementById(id);
const spritePanel = $("spritePanel");
const vaultPanel = $("vaultPanel");
const previewTitle = $("previewTitle");
const previewBadge = $("previewBadge");
const previewText = $("previewText");

const canvas = $("spriteCanvas");
const exportCanvas = $("exportCanvas");
const ctx = canvas.getContext("2d");
const exportCtx = exportCanvas.getContext("2d");

function hashString(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFromSeed(seed) {
  let a = hashString(seed || "logan");
  return function() {
    a += 0x6D2B79F5;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function rand(rng, min, max) {
  return min + rng() * (max - min);
}

function makeSeed() {
  return "LC-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

function slug(value) {
  return String(value || "sprite").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "sprite";
}

function lighten(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt;
  let g = ((n >> 8) & 255) + amt;
  let b = (n & 255) + amt;
  return "#" + [r,g,b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");
}

function paletteFromControls() {
  const theme = $("spriteTheme").value;
  const style = $("spritePaletteStyle").value;
  if (style === "custom") {
    const main = $("spriteMainColor").value;
    const accent = $("spriteAccentColor").value;
    return ["#120303", lighten(main, -70), main, accent, lighten(accent, 45)];
  }
  if (style === "bright") {
    const p = themePalettes[theme] || themePalettes.Nether;
    return [p[0], p[1], lighten(p[2], 10), lighten(p[3], 20), p[4]];
  }
  if (style === "muted") {
    const p = themePalettes[theme] || themePalettes.Nether;
    return [p[0], lighten(p[1], -18), lighten(p[2], -22), lighten(p[3], -18), p[4]];
  }
  if (style === "nether") return themePalettes.Nether;
  return themePalettes[theme] || themePalettes.Nether;
}

function ensureSeed() {
  if (!$("spriteSeed").value.trim()) $("spriteSeed").value = makeSeed();
  return $("spriteSeed").value.trim();
}

function getConfig() {
  return {
    name: $("spriteName").value.trim(),
    size: Number($("spriteSize").value),
    kind: $("spriteKind").value,
    template: $("spriteTemplate").value,
    theme: $("spriteTheme").value,
    paletteStyle: $("spritePaletteStyle").value,
    mainColor: $("spriteMainColor").value,
    accentColor: $("spriteAccentColor").value,
    seed: ensureSeed(),
    detail: $("spriteDetail").value,
    prompt: $("spritePrompt").value.trim()
  };
}

function autoName(config, rng) {
  const prefix = {
    Fire:["Cinder","Ash","Flare","Magma"], Water:["Tide","Mira","Coral","Aqua"], Electric:["Volt","Jolt","Spark","Arc"],
    Grass:["Moss","Leaf","Root","Fern"], Ice:["Frost","Glacier","Snow","Shard"], Poison:["Vile","Mire","Toxi","Spore"],
    Ghost:["Shade","Wisp","Noct","Phantom"], Rock:["Boulder","Slate","Pebble","Basalt"], Steel:["Iron","Gear","Rivet","Chrome"],
    Dragon:["Drake","Scale","Fang","Wyvern"], Fairy:["Glimmer","Pix","Charm","Rose"], Dark:["Night","Umbra","Dusk","Raven"],
    Normal:["Tama","Nobi","Milo","Pip"], Nether:["Brim","Ash","Basalt","Cinder"]
  }[config.theme] || ["Logan"];
  const suffix = {
    creature:["cub","moth","fang","pup","ling","beast"], item:["blade","charm","stone","relic","core"], trainer:["keeper","smith","rider","sage"], badge:["mark","crest","seal","badge","sigil"]
  }[config.kind] || ["sprite"];
  return pick(rng, prefix) + pick(rng, suffix).replace(/^./, c => c.toUpperCase());
}

function clearAll(c, size) {
  c.clearRect(0, 0, size, size);
  c.imageSmoothingEnabled = false;
}

function pixelSetup(size) {
  canvas.width = 192;
  canvas.height = 192;
  exportCanvas.width = size;
  exportCanvas.height = size;
  clearAll(ctx, 192);
  clearAll(exportCtx, size);
  const work = document.createElement("canvas");
  work.width = size;
  work.height = size;
  const wctx = work.getContext("2d");
  wctx.imageSmoothingEnabled = false;
  return { work, wctx, size, unit: size / 64 };
}

function px(v, unit) { return Math.round(v * unit); }

function ellipse(c, unit, x, y, w, h, fill, stroke, line=2) {
  c.fillStyle = fill;
  c.strokeStyle = stroke;
  c.lineWidth = Math.max(1, px(line, unit));
  c.beginPath();
  c.ellipse(px(x,unit), px(y,unit), px(w,unit), px(h,unit), 0, 0, Math.PI*2);
  c.fill();
  c.stroke();
}

function rect(c, unit, x, y, w, h, fill, stroke, line=2) {
  c.fillStyle = fill;
  c.strokeStyle = stroke;
  c.lineWidth = Math.max(1, px(line, unit));
  c.fillRect(px(x,unit), px(y,unit), px(w,unit), px(h,unit));
  c.strokeRect(px(x,unit), px(y,unit), px(w,unit), px(h,unit));
}

function poly(c, unit, points, fill, stroke, line=2) {
  c.fillStyle = fill;
  c.strokeStyle = stroke;
  c.lineWidth = Math.max(1, px(line, unit));
  c.beginPath();
  points.forEach(([x,y], i) => i ? c.lineTo(px(x,unit), px(y,unit)) : c.moveTo(px(x,unit), px(y,unit)));
  c.closePath();
  c.fill();
  c.stroke();
}

function line(c, unit, x1, y1, x2, y2, color, width=2) {
  c.strokeStyle = color;
  c.lineWidth = Math.max(1, px(width, unit));
  c.beginPath();
  c.moveTo(px(x1,unit), px(y1,unit));
  c.lineTo(px(x2,unit), px(y2,unit));
  c.stroke();
}

function eye(c, unit, x, y, color) {
  rect(c, unit, x, y, 3, 3, color, "#171008", 1);
  rect(c, unit, x+1, y, 1, 1, "#ffffff", "#ffffff", 0);
}

function addThemeDetails(c, unit, config, p, rng) {
  const accent = p[4];
  if (config.detail === "simple") return;
  const prompt = config.prompt.toLowerCase();
  const count = config.detail === "extra" ? 7 : 4;
  for (let i = 0; i < count; i++) {
    const x = rand(rng, 20, 45);
    const y = rand(rng, 20, 45);
    if (prompt.includes("armor") || config.theme === "Steel" || config.theme === "Rock") rect(c, unit, x, y, rand(rng,3,6), rand(rng,2,4), p[1], "#171008", 1);
    else if (prompt.includes("crack") || config.theme === "Fire" || config.theme === "Nether") line(c, unit, x, y, x+rand(rng,-4,4), y+rand(rng,3,6), accent, 1);
    else ellipse(c, unit, x, y, rand(rng,1,2), rand(rng,1,2), accent, "#171008", 1);
  }
}

function drawCreature(c, unit, config, p, rng) {
  const o = p[0], dark = p[1], body = p[2], light = p[3], accent = p[4];
  switch (config.template) {
    case "dragon":
      ellipse(c,unit,34,35,15,10,body,o); ellipse(c,unit,47,28,10,8,body,o);
      poly(c,unit,[[45,20],[50,9],[52,22]],accent,o); poly(c,unit,[[52,21],[60,17],[55,27]],light,o);
      line(c,unit,21,38,8,48,dark,5); line(c,unit,26,44,22,56,dark,4); line(c,unit,39,44,42,56,dark,4);
      poly(c,unit,[[29,30],[16,14],[22,35]],dark,o); poly(c,unit,[[36,28],[48,13],[43,35]],dark,o);
      eye(c,unit,49,26,accent); break;
    case "bird":
      ellipse(c,unit,33,35,13,12,body,o); ellipse(c,unit,44,25,8,7,body,o);
      poly(c,unit,[[51,24],[62,28],[51,31]],accent,o); poly(c,unit,[[31,32],[10,20],[19,43]],dark,o);
      poly(c,unit,[[35,32],[55,17],[48,43]],light,o); line(c,unit,31,46,27,57,dark,3); line(c,unit,37,46,39,57,dark,3);
      eye(c,unit,44,24,accent); break;
    case "fish":
      ellipse(c,unit,33,33,17,11,body,o); poly(c,unit,[[17,32],[4,21],[6,44]],dark,o);
      poly(c,unit,[[38,21],[45,8],[48,26]],accent,o); poly(c,unit,[[37,45],[45,56],[48,40]],light,o);
      eye(c,unit,45,30,accent); line(c,unit,24,29,42,29,light,2); break;
    case "bug":
      ellipse(c,unit,25,35,9,10,dark,o); ellipse(c,unit,37,34,12,12,body,o); ellipse(c,unit,50,31,8,8,body,o);
      for (let y of [28,35,42]) { line(c,unit,28,y,14,y-7,dark,3); line(c,unit,44,y,58,y-7,dark,3); }
      line(c,unit,50,24,56,15,accent,2); line(c,unit,52,24,62,19,accent,2); eye(c,unit,50,30,accent); break;
    case "slime":
      ellipse(c,unit,32,39,18,15,body,o); ellipse(c,unit,26,30,8,8,light,o); ellipse(c,unit,43,31,7,7,body,o);
      eye(c,unit,25,36,accent); eye(c,unit,38,36,accent); rect(c,unit,30,45,8,3,dark,o,1); break;
    case "ghost":
      ellipse(c,unit,32,29,15,14,body,o); poly(c,unit,[[17,34],[20,55],[28,47],[34,56],[42,47],[48,56],[47,34]],body,o);
      eye(c,unit,26,27,accent); eye(c,unit,37,27,accent); ellipse(c,unit,32,39,4,5,dark,o,1); break;
    case "golem":
      rect(c,unit,21,25,25,22,body,o); rect(c,unit,17,18,18,13,light,o); rect(c,unit,38,20,12,12,dark,o);
      rect(c,unit,13,36,8,16,dark,o); rect(c,unit,46,35,8,17,dark,o); rect(c,unit,24,47,8,12,dark,o); rect(c,unit,37,47,8,12,dark,o);
      eye(c,unit,29,28,accent); eye(c,unit,39,28,accent); break;
    case "robot":
      rect(c,unit,21,20,25,18,body,o); rect(c,unit,24,38,19,16,dark,o); line(c,unit,32,20,32,12,accent,2);
      rect(c,unit,14,39,8,12,body,o); rect(c,unit,45,39,8,12,body,o); rect(c,unit,25,54,7,7,dark,o); rect(c,unit,36,54,7,7,dark,o);
      eye(c,unit,27,27,accent); eye(c,unit,38,27,accent); break;
    case "mushroom":
      ellipse(c,unit,32,26,18,11,accent,o); rect(c,unit,25,31,14,24,body,o); ellipse(c,unit,25,24,3,2,light,o,1); ellipse(c,unit,38,26,4,3,light,o,1);
      eye(c,unit,28,41,dark); eye(c,unit,36,41,dark); break;
    case "wolf":
    default:
      ellipse(c,unit,32,38,16,10,body,o); ellipse(c,unit,46,30,10,8,body,o);
      poly(c,unit,[[41,24],[43,12],[49,25]],body,o); poly(c,unit,[[49,24],[55,14],[55,29]],dark,o);
      line(c,unit,18,39,8,34,dark,5); line(c,unit,24,46,21,58,dark,4); line(c,unit,37,46,39,58,dark,4);
      eye(c,unit,47,29,accent); rect(c,unit,55,32,3,2,o,o,1); break;
  }
  addThemeDetails(c, unit, config, p, rng);
}

function drawItem(c, unit, config, p, rng) {
  const o = p[0], dark = p[1], body = p[2], light = p[3], accent = p[4];
  if (config.template === "potion") {
    rect(c,unit,25,16,14,9,light,o); ellipse(c,unit,32,40,15,17,body,o); rect(c,unit,28,14,8,8,dark,o);
    ellipse(c,unit,37,34,4,5,accent,o,1); line(c,unit,24,48,41,28,light,2);
  } else if (config.template === "gem") {
    poly(c,unit,[[32,8],[49,22],[43,53],[22,53],[15,22]],body,o);
    poly(c,unit,[[32,8],[38,22],[32,53],[26,22]],light,o,1); poly(c,unit,[[15,22],[26,22],[22,53]],dark,o,1);
  } else if (config.template === "egg") {
    ellipse(c,unit,32,35,16,22,body,o); ellipse(c,unit,27,27,4,3,light,o,1); ellipse(c,unit,38,42,5,4,accent,o,1);
  } else {
    poly(c,unit,[[35,5],[45,16],[35,45],[29,45],[23,16]],light,o);
    rect(c,unit,28,42,11,7,accent,o); rect(c,unit,30,49,7,12,dark,o);
    line(c,unit,36,12,31,42,body,2);
  }
}

function drawTrainer(c, unit, config, p, rng) {
  const o = p[0], dark = p[1], body = p[2], light = p[3], accent = p[4];
  ellipse(c,unit,32,22,11,12,light,o); rect(c,unit,20,34,24,24,body,o);
  poly(c,unit,[[20,18],[29,8],[44,15],[43,21],[24,21]],accent,o);
  rect(c,unit,18,40,7,16,dark,o); rect(c,unit,39,40,7,16,dark,o);
  eye(c,unit,27,22,o); eye(c,unit,36,22,o); line(c,unit,29,30,36,30,o,1);
}

function drawBadge(c, unit, config, p, rng) {
  const o = p[0], dark = p[1], body = p[2], light = p[3], accent = p[4];
  if (config.template === "badge") {
    poly(c,unit,[[32,6],[52,18],[48,45],[32,58],[16,45],[12,18]],body,o);
    poly(c,unit,[[32,14],[44,22],[41,41],[32,49],[23,41],[20,22]],dark,o,1);
    poly(c,unit,[[32,19],[38,32],[32,45],[26,32]],accent,o,1);
  } else {
    ellipse(c,unit,32,32,22,22,body,o); ellipse(c,unit,32,32,13,13,dark,o,1);
    poly(c,unit,[[32,12],[37,27],[53,27],[40,36],[45,52],[32,42],[19,52],[24,36],[11,27],[27,27]],accent,o,1);
  }
}

function drawSprite(config) {
  const rng = rngFromSeed(JSON.stringify(config));
  const p = paletteFromControls();
  const { work, wctx, size, unit } = pixelSetup(config.size);
  wctx.imageSmoothingEnabled = false;

  if (config.kind === "item") drawItem(wctx, unit, config, p, rng);
  else if (config.kind === "trainer") drawTrainer(wctx, unit, config, p, rng);
  else if (config.kind === "badge") drawBadge(wctx, unit, config, p, rng);
  else drawCreature(wctx, unit, config, p, rng);

  exportCtx.clearRect(0,0,size,size);
  exportCtx.imageSmoothingEnabled = false;
  exportCtx.drawImage(work,0,0);

  ctx.clearRect(0,0,192,192);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(work,0,0,size,size,0,0,192,192);

  return exportCanvas.toDataURL("image/png");
}

function spriteMeta(config, dataUrl) {
  const rng = rngFromSeed(config.seed + config.theme + config.template);
  const name = config.name || autoName(config, rng);
  const detailText = config.detail === "extra" ? "extra detail" : config.detail;
  const desc = config.prompt
    ? `${name} is a ${config.theme.toLowerCase()} ${config.kind} sprite based on: ${config.prompt}.`
    : `${name} is a ${config.theme.toLowerCase()} ${config.kind} sprite using the ${config.template} template.`;
  return {
    app: "LoganCreations",
    version: "0.6",
    module: "Create Sprite",
    name,
    kind: config.kind,
    template: config.template,
    theme: config.theme,
    paletteStyle: config.paletteStyle,
    outputSize: `${config.size}x${config.size}`,
    detailLevel: detailText,
    prompt: config.prompt,
    seed: config.seed,
    description: desc,
    useCase: kindUse[config.kind],
    styleNotes: `${config.size}x${config.size} pixel-style PNG, ${config.theme} theme, ${detailText} renderer.`,
    tags: [config.kind, config.template, config.theme.toLowerCase(), `${config.size}x${config.size}`],
    imageDataUrl: dataUrl
  };
}

function generateSprite() {
  const config = getConfig();
  const dataUrl = drawSprite(config);
  const meta = spriteMeta(config, dataUrl);
  currentSprite = { config, meta, dataUrl };

  if (!$("spriteName").value.trim()) $("spriteName").value = meta.name;
  $("spriteTitle").textContent = meta.name;
  $("seedBadge").textContent = `Seed ${config.seed}`;
  $("spriteStatus").textContent = `${config.size}x${config.size} ${config.kind}`;
  $("spriteUse").textContent = meta.useCase;
  $("spriteNotes").textContent = meta.styleNotes;
  $("spriteDescription").textContent = meta.description;
  $("spriteTags").innerHTML = meta.tags.map(t => `<span>${escapeHtml(t)}</span>`).join("");
  $("spriteDetails").innerHTML = [
    ["Kind", config.kind],
    ["Template", config.template],
    ["Theme", config.theme],
    ["Size", `${config.size}x${config.size}`],
    ["Detail", config.detail]
  ].map(([a,b]) => `<div><b>${a}</b><span>${b}</span></div>`).join("");
}

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function dataUrlToBlob(dataUrl) {
  const [head, b64] = dataUrl.split(",");
  const mime = head.match(/data:(.*?);/)?.[1] || "application/octet-stream";
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function loadVault() {
  try { return JSON.parse(localStorage.getItem(VAULT_KEY) || "[]"); }
  catch { return []; }
}

function saveVault() {
  localStorage.setItem(VAULT_KEY, JSON.stringify(vault));
}

function addAsset(asset) {
  vault.unshift({ id: `asset_${Date.now()}_${Math.random().toString(16).slice(2,8)}`, createdAt: new Date().toISOString(), ...asset });
  saveVault();
  renderVault();
}

function formatBytes(bytes=0) {
  if (!bytes) return "0 B";
  const u = ["B","KB","MB","GB"];
  const i = Math.min(Math.floor(Math.log(bytes)/Math.log(1024)), u.length-1);
  return `${(bytes/Math.pow(1024,i)).toFixed(i?1:0)} ${u[i]}`;
}

function renderVault() {
  const q = $("vaultSearch").value.toLowerCase().trim();
  const type = $("vaultType").value;
  const filtered = vault.filter(a => (!type || a.type === type) && (!q || `${a.name} ${a.description} ${(a.tags||[]).join(" ")}`.toLowerCase().includes(q)));
  $("vaultStats").textContent = `${vault.length} stored · ${filtered.length} showing`;
  $("vaultEmpty").hidden = filtered.length > 0;
  $("vaultGrid").innerHTML = filtered.map(a => `
    <article class="asset-card">
      <div class="asset-top">
        ${a.dataUrl && a.mime && a.mime.startsWith("image/") ? `<img class="asset-thumb" src="${a.dataUrl}" alt="">` : `<div class="asset-icon">◆</div>`}
        <div>
          <h3>${escapeHtml(a.name)}</h3>
          <p>${escapeHtml(a.type)} · ${formatBytes(a.size)} · ${new Date(a.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p>${escapeHtml(a.description || "")}</p>
      <div class="asset-tags">${(a.tags||[]).map(t=>`<span>${escapeHtml(t)}</span>`).join("")}</div>
      <div class="asset-actions">
        <button type="button" data-download="${a.id}">Download</button>
        <button type="button" data-copy="${a.id}">Duplicate</button>
        <button type="button" class="danger-action" data-remove="${a.id}">Remove</button>
      </div>
    </article>
  `).join("");
}

function saveSpriteToVault() {
  if (!currentSprite) generateSprite();
  const meta = { ...currentSprite.meta };
  delete meta.imageDataUrl;
  const blob = dataUrlToBlob(currentSprite.dataUrl);
  addAsset({
    type: "sprite",
    name: currentSprite.meta.name,
    description: currentSprite.meta.description,
    tags: currentSprite.meta.tags,
    filename: `${slug(currentSprite.meta.name)}.png`,
    mime: "image/png",
    size: blob.size,
    dataUrl: currentSprite.dataUrl,
    content: meta
  });
  $("spriteStatus").textContent = "Saved to Asset Vault";
}

function openSection(section) {
  spritePanel.hidden = section !== "sprite";
  vaultPanel.hidden = section !== "vault";
  if (section === "sprite") {
    previewTitle.textContent = "Create Sprite";
    previewBadge.textContent = "Working";
    previewText.textContent = "Use the sprite designer to generate, export, and save sprites.";
    spritePanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    previewTitle.textContent = "Asset Vault";
    previewBadge.textContent = "Working";
    previewText.textContent = "Stored assets can be downloaded, duplicated, removed, backed up, and restored.";
    renderVault();
    vaultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.querySelectorAll("[data-open]").forEach(btn => btn.addEventListener("click", () => openSection(btn.dataset.open)));
document.querySelectorAll("[data-placeholder]").forEach(btn => btn.addEventListener("click", () => {
  previewTitle.textContent = btn.dataset.placeholder;
  previewBadge.textContent = "Planned";
  previewText.textContent = `${btn.dataset.placeholder} is not built yet. Create Sprite and Asset Vault are the working modules right now.`;
}));

$("effectToggle").addEventListener("click", () => document.body.classList.toggle("low-effects"));
$("generateSprite").addEventListener("click", generateSprite);
$("surpriseSprite").addEventListener("click", () => {
  const kinds = ["creature","item","trainer","badge"];
  const templates = ["wolf","dragon","bird","fish","bug","slime","ghost","golem","robot","mushroom","sword","potion","gem","egg","trainer","badge"];
  const themes = Object.keys(themePalettes);
  $("spriteName").value = "";
  $("spriteKind").value = pick(Math.random, kinds);
  $("spriteTemplate").value = pick(Math.random, templates);
  $("spriteTheme").value = pick(Math.random, themes);
  $("spritePaletteStyle").value = pick(Math.random, ["auto","bright","muted","nether"]);
  $("spriteDetail").value = pick(Math.random, ["simple","detailed","extra"]);
  $("spriteSeed").value = makeSeed();
  generateSprite();
});
$("rerollSeed").addEventListener("click", () => { $("spriteSeed").value = makeSeed(); generateSprite(); });
$("downloadPng").addEventListener("click", () => {
  if (!currentSprite) generateSprite();
  downloadBlob(`${slug(currentSprite.meta.name)}.png`, dataUrlToBlob(currentSprite.dataUrl));
});
$("downloadJson").addEventListener("click", () => {
  if (!currentSprite) generateSprite();
  const meta = { ...currentSprite.meta };
  delete meta.imageDataUrl;
  downloadBlob(`${slug(meta.name)}.json`, new Blob([JSON.stringify(meta,null,2)], { type:"application/json" }));
});
$("saveToVault").addEventListener("click", saveSpriteToVault);
$("spriteKind").addEventListener("change", () => { $("spriteTemplate").value = templateDefaults[$("spriteKind").value]; });

$("importFile").addEventListener("click", () => $("fileInput").click());
$("fileInput").addEventListener("change", () => {
  [...$("fileInput").files].forEach(file => {
    if (file.size > 2.5 * 1024 * 1024) return alert(`${file.name} is too large for this local vault.`);
    const reader = new FileReader();
    reader.onload = () => addAsset({
      type: file.type.startsWith("image/") ? "sprite" : "file",
      name: file.name.replace(/\.[^/.]+$/, ""),
      description: `Imported file: ${file.name}`,
      tags: ["imported"],
      filename: file.name,
      mime: file.type || "application/octet-stream",
      size: file.size,
      dataUrl: reader.result
    });
    reader.readAsDataURL(file);
  });
  $("fileInput").value = "";
});
$("exportVault").addEventListener("click", () => downloadBlob("loganscreations-vault-backup.json", new Blob([JSON.stringify({app:"LoganCreations",version:"0.6",assets:vault},null,2)], { type:"application/json" })));
$("restoreVaultBtn").addEventListener("click", () => $("restoreInput").click());
$("restoreInput").addEventListener("change", () => {
  const file = $("restoreInput").files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      vault = Array.isArray(parsed) ? parsed : parsed.assets;
      if (!Array.isArray(vault)) throw new Error("No assets array.");
      saveVault(); renderVault(); openSection("vault");
    } catch { alert("Could not restore that JSON backup."); }
  };
  reader.readAsText(file);
});
$("clearVault").addEventListener("click", () => {
  if (vault.length && confirm("Remove every asset from this device vault?")) {
    vault = []; saveVault(); renderVault();
  }
});
$("vaultSearch").addEventListener("input", renderVault);
$("vaultType").addEventListener("input", renderVault);
$("vaultGrid").addEventListener("click", e => {
  const d = e.target.closest("[data-download]");
  const c = e.target.closest("[data-copy]");
  const r = e.target.closest("[data-remove]");
  if (d) {
    const a = vault.find(x => x.id === d.dataset.download);
    if (a) downloadBlob(a.filename || `${slug(a.name)}.asset`, a.dataUrl ? dataUrlToBlob(a.dataUrl) : new Blob([JSON.stringify(a.content || a,null,2)], { type:"application/json" }));
  }
  if (c) {
    const a = vault.find(x => x.id === c.dataset.copy);
    if (a) addAsset({ ...a, id: undefined, createdAt: undefined, name: `${a.name} Copy` });
  }
  if (r) {
    const a = vault.find(x => x.id === r.dataset.remove);
    if (a && confirm(`Remove "${a.name}"?`)) {
      vault = vault.filter(x => x.id !== a.id); saveVault(); renderVault();
    }
  }
});

if (!$("spriteSeed").value.trim()) $("spriteSeed").value = makeSeed();
generateSprite();
renderVault();
