# LoganCreations

A Nether-themed GitHub Pages creative forge for sprites, books, cultures, languages, 3D models, monster sounds, comics, animations, and asset packs.

## Current version

**v0.5** rebuilds **Create Sprite** after feedback: clearer options, practical templates, real output sizing, stronger pixel rendering, and no abstract rarity/mood/class controls.

### Create Sprite changes in v0.5

- Removed confusing Creature Class, Core Type, Body Form, Rarity, and Mood controls
- Replaced them with practical sprite controls:
  - What Are You Making?
  - Silhouette Template
  - Type / Theme
  - Palette Style
  - Idea / Prompt
  - Output Size
  - Detail Level
- Output Size now actually changes the exported PNG size
- Better pixel-art templates for creatures, items, trainers, and badges
- PNG export
- JSON metadata export
- Save generated sprites directly into Asset Vault
- Reroll shape and reroll colors controls

### Important quality note

This is still an offline browser generator. It can make cleaner procedural sprites, but the highest-quality future version should use either:

1. a curated handmade sprite-part library, or
2. an optional AI/image service, or
3. an import-reference workflow where the app pixelates and edits an uploaded image.

### Asset Vault features

- Store assets locally in the browser
- Create demo assets for testing
- Import small files from your device
- Search assets by name, tag, type, or description
- Filter by asset type
- Download individual assets
- Duplicate assets
- Remove assets
- Clear the vault
- Export a full vault backup as JSON
- Restore a vault backup JSON file

## Files

Upload these files to the root of the `LogansCreations` GitHub repo:

```text
index.html
styles.css
app.js
manifest.json
README.md
icons/icon-192.svg
icons/icon-512.svg
```

## GitHub Pages URL

```text
https://lordboby-crypto.github.io/LogansCreations/
```

## Notes

The Asset Vault currently stores assets in local browser storage. Files are stored on the device/browser where the app is opened. Export a backup JSON if you want to move the vault to another device or browser.

For this first storage version, imported files should stay under roughly 2.5 MB each. Later versions can move to IndexedDB for larger files and full ZIP project packs.
