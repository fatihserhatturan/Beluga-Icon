/**
 * generate-readme-preview.ts
 *
 * Builds docs/preview.svg — the icon grid shown at the top of the README —
 * from a fixed selection of source SVGs in /svgs.
 *
 * The stroke color follows prefers-color-scheme, so the image reads on both
 * GitHub's light and dark themes.
 *
 * Usage:
 *   npm run readme:preview
 */

import fs from 'node:fs'
import path from 'node:path'

const SVG_DIR = path.resolve('svgs')
const OUT_FILE = path.resolve('docs/preview.svg')

const ICONS = [
  'ui/search',
  'social/heart',
  'communication/bell',
  'social/star',
  'navigation/home',
  'ui/user',
  'ui/settings',
  'communication/mail',
  'media/camera',
  'media/music',
  'media/play',
  'weather/cloud',
  'ui/sun',
  'ui/moon',
  'ui/lock',
  'status/shield',
  'ui/calendar',
  'status/clock',
  'navigation/map-pin',
  'navigation/globe',
  'status/wifi',
  'status/battery',
  'status/zap',
  'development/rocket',
  'food/coffee',
  'ui/terminal',
  'development/git-branch',
  'devices/cpu',
  'files/database',
  'files/folder',
  'files/image',
  'media/mic',
  'communication/message-circle',
  'communication/send',
  'files/download',
  'files/trash',
  'social/bookmark',
  'social/gift',
  'commerce/shopping-cart',
  'commerce/credit-card',
  'transportation/plane',
  'transportation/bike',
  'nature/leaf',
  'status/flame',
  'weather/umbrella',
  'social/trophy',
  'gaming/gamepad-2',
  'media/headphones',
]

const COLUMNS = 12
const CELL = 64 // px per grid cell
const ICON = 28 // rendered icon size inside a cell
const PADDING = 24

function innerMarkup(id: string): string {
  const file = path.join(SVG_DIR, `${id}.svg`)
  const source = fs.readFileSync(file, 'utf8')
  const match = source.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
  if (!match) throw new Error(`No <svg> root in ${file}`)
  return match[1].trim()
}

const rows = Math.ceil(ICONS.length / COLUMNS)
const width = PADDING * 2 + COLUMNS * CELL
const height = PADDING * 2 + rows * CELL
const offset = (CELL - ICON) / 2

const cells = ICONS.map((id, i) => {
  const x = PADDING + (i % COLUMNS) * CELL + offset
  const y = PADDING + Math.floor(i / COLUMNS) * CELL + offset
  return `  <svg x="${x}" y="${y}" width="${ICON}" height="${ICON}" viewBox="0 0 24 24">${innerMarkup(id)}</svg>`
})

const output = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <title>A selection of Beluga icons</title>
  <style>
    svg { color: #334155; stroke: currentColor; }
    @media (prefers-color-scheme: dark) { svg { color: #cbd5e1; } }
  </style>
${cells.join('\n')}
</svg>
`

fs.writeFileSync(OUT_FILE, output)
console.log(`Wrote ${path.relative(process.cwd(), OUT_FILE)} (${ICONS.length} icons)`)
