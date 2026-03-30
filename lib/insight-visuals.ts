import type { InsightVisual } from '@/lib/insight-types'

type StepCard = {
  title: string
  note: string
  accent?: string
}

type ComparisonRow = {
  label: string
  values: string[]
}

type CycleStage = {
  title: string
  note: string
  accent?: string
}

type LayerItem = {
  title: string
  note: string
  accent?: string
}

type MetricCard = {
  title: string
  value: string
  note: string
  accent?: string
}

const palette = {
  bg: '#F8FBFF',
  panel: '#FFFFFF',
  panelAlt: '#F3F8FD',
  stroke: '#D6E2EE',
  text: '#102A43',
  muted: '#58708A',
  accent: '#1677FF',
  accentSoft: '#DCEBFF',
  teal: '#12B5B0',
  tealSoft: '#DCF8F6',
  amber: '#F5A524',
  amberSoft: '#FFF4DB',
  rose: '#E65B87',
  roseSoft: '#FFE1EA',
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function wrapText(text: string, maxChars: number) {
  const chars = Array.from(text)
  const lines: string[] = []

  for (let index = 0; index < chars.length; index += maxChars) {
    lines.push(chars.slice(index, index + maxChars).join(''))
  }

  return lines
}

function renderTextLines({
  text,
  x,
  y,
  maxChars,
  lineHeight,
  fill,
  fontSize,
  fontWeight = 500,
  anchor = 'start',
}: {
  text: string
  x: number
  y: number
  maxChars: number
  lineHeight: number
  fill: string
  fontSize: number
  fontWeight?: number
  anchor?: 'start' | 'middle'
}) {
  const lines = wrapText(text, maxChars)

  return `
    <text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${fontSize}" font-weight="${fontWeight}" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif">
      ${lines
        .map((line, index) => {
          const dy = index === 0 ? 0 : lineHeight
          return `<tspan x="${x}" dy="${dy}">${escapeXml(line)}</tspan>`
        })
        .join('')}
    </text>
  `
}

function visualFrame({
  title,
  subtitle,
  inner,
  height = 560,
}: {
  title: string
  subtitle?: string
  inner: string
  height?: number
}) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" fill="none" role="img" aria-label="${escapeXml(title)}">
      <rect width="960" height="${height}" rx="28" fill="${palette.bg}" />
      <rect x="18" y="18" width="924" height="${height - 36}" rx="24" fill="${palette.panel}" stroke="${palette.stroke}" />
      ${renderTextLines({
        text: title,
        x: 48,
        y: 64,
        maxChars: 22,
        lineHeight: 30,
        fill: palette.text,
        fontSize: 28,
        fontWeight: 700,
      })}
      ${
        subtitle
          ? renderTextLines({
              text: subtitle,
              x: 48,
              y: 98,
              maxChars: 44,
              lineHeight: 24,
              fill: palette.muted,
              fontSize: 15,
              fontWeight: 500,
            })
          : ''
      }
      ${inner}
    </svg>
  `
}

function stepCard({
  x,
  y,
  width,
  height,
  index,
  title,
  note,
  accent,
}: {
  x: number
  y: number
  width: number
  height: number
  index: number
  title: string
  note: string
  accent?: string
}) {
  const tone = accent ?? palette.accent
  const soft =
    tone === palette.teal
      ? palette.tealSoft
      : tone === palette.amber
        ? palette.amberSoft
        : tone === palette.rose
          ? palette.roseSoft
          : palette.accentSoft

  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="22" fill="${palette.panelAlt}" stroke="${palette.stroke}" />
      <circle cx="${x + 28}" cy="${y + 28}" r="16" fill="${soft}" />
      <text x="${x + 28}" y="${y + 34}" text-anchor="middle" fill="${tone}" font-size="15" font-weight="700" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif">${index}</text>
      ${renderTextLines({
        text: title,
        x: x + 56,
        y: y + 30,
        maxChars: 10,
        lineHeight: 22,
        fill: palette.text,
        fontSize: 18,
        fontWeight: 700,
      })}
      ${renderTextLines({
        text: note,
        x: x + 24,
        y: y + 72,
        maxChars: 18,
        lineHeight: 20,
        fill: palette.muted,
        fontSize: 14,
      })}
    </g>
  `
}

export function createGridStepsVisual({
  title,
  subtitle,
  steps,
  caption,
}: {
  title: string
  subtitle?: string
  steps: StepCard[]
  caption?: string
}): InsightVisual {
  const columns = steps.length <= 4 ? 2 : 3
  const gutter = 24
  const cardWidth = columns === 3 ? 272 : 416
  const cardHeight = 132
  const startX = columns === 3 ? 60 : 52
  const startY = 132

  const inner = steps
    .map((step, index) => {
      const row = Math.floor(index / columns)
      const column = index % columns
      const x = startX + column * (cardWidth + gutter)
      const y = startY + row * (cardHeight + gutter)

      return stepCard({
        x,
        y,
        width: cardWidth,
        height: cardHeight,
        index: index + 1,
        title: step.title,
        note: step.note,
        accent: step.accent,
      })
    })
    .join('')

  return {
    title,
    caption,
    svg: visualFrame({ title, subtitle, inner, height: steps.length <= 4 ? 440 : 590 }),
  }
}

export function createComparisonVisual({
  title,
  subtitle,
  columns,
  rows,
  caption,
}: {
  title: string
  subtitle?: string
  columns: string[]
  rows: ComparisonRow[]
  caption?: string
}): InsightVisual {
  const labelWidth = 188
  const tableX = 40
  const tableY = 138
  const rowHeight = 78
  const cellWidth = (880 - labelWidth) / columns.length

  const header = columns
    .map((column, index) => {
      const x = tableX + labelWidth + index * cellWidth
      return `
        <rect x="${x}" y="${tableY}" width="${cellWidth - 10}" height="54" rx="18" fill="${palette.accentSoft}" />
        ${renderTextLines({
          text: column,
          x: x + (cellWidth - 10) / 2,
          y: tableY + 31,
          maxChars: 8,
          lineHeight: 18,
          fill: palette.accent,
          fontSize: 16,
          fontWeight: 700,
          anchor: 'middle',
        })}
      `
    })
    .join('')

  const body = rows
    .map((row, rowIndex) => {
      const y = tableY + 72 + rowIndex * rowHeight
      const rowCells = row.values
        .map((value, columnIndex) => {
          const x = tableX + labelWidth + columnIndex * cellWidth
          return `
            <rect x="${x}" y="${y}" width="${cellWidth - 10}" height="64" rx="18" fill="${palette.panelAlt}" stroke="${palette.stroke}" />
            ${renderTextLines({
              text: value,
              x: x + 18,
              y: y + 28,
              maxChars: 11,
              lineHeight: 18,
              fill: palette.text,
              fontSize: 14,
            })}
          `
        })
        .join('')

      return `
        <rect x="${tableX}" y="${y}" width="${labelWidth - 16}" height="64" rx="18" fill="${palette.panelAlt}" stroke="${palette.stroke}" />
        ${renderTextLines({
          text: row.label,
          x: tableX + 18,
          y: y + 28,
          maxChars: 8,
          lineHeight: 18,
          fill: palette.text,
          fontSize: 15,
          fontWeight: 700,
        })}
        ${rowCells}
      `
    })
    .join('')

  return {
    title,
    caption,
    svg: visualFrame({ title, subtitle, inner: `${header}${body}`, height: 150 + rows.length * rowHeight + 96 }),
  }
}

export function createCycleVisual({
  title,
  subtitle,
  stages,
  centerTitle,
  centerNote,
  caption,
}: {
  title: string
  subtitle?: string
  stages: CycleStage[]
  centerTitle: string
  centerNote: string
  caption?: string
}): InsightVisual {
  const positions = [
    { x: 250, y: 188 },
    { x: 710, y: 188 },
    { x: 710, y: 390 },
    { x: 250, y: 390 },
  ]

  const nodes = stages
    .slice(0, 4)
    .map((stage, index) => {
      const position = positions[index]
      const tone = stage.accent ?? palette.accent
      const soft =
        tone === palette.teal
          ? palette.tealSoft
          : tone === palette.amber
            ? palette.amberSoft
            : tone === palette.rose
              ? palette.roseSoft
              : palette.accentSoft

      return `
        <g>
          <circle cx="${position.x}" cy="${position.y}" r="88" fill="${soft}" stroke="${tone}" stroke-width="2" />
          ${renderTextLines({
            text: stage.title,
            x: position.x,
            y: position.y - 8,
            maxChars: 6,
            lineHeight: 20,
            fill: tone,
            fontSize: 20,
            fontWeight: 700,
            anchor: 'middle',
          })}
          ${renderTextLines({
            text: stage.note,
            x: position.x,
            y: position.y + 26,
            maxChars: 10,
            lineHeight: 18,
            fill: palette.text,
            fontSize: 13,
            anchor: 'middle',
          })}
        </g>
      `
    })
    .join('')

  const arrows = `
    <path d="M338 188H612" stroke="${palette.stroke}" stroke-width="16" stroke-linecap="round" />
    <path d="M710 276V302" stroke="${palette.stroke}" stroke-width="16" stroke-linecap="round" />
    <path d="M612 390H338" stroke="${palette.stroke}" stroke-width="16" stroke-linecap="round" />
    <path d="M250 302V276" stroke="${palette.stroke}" stroke-width="16" stroke-linecap="round" />
  `

  const center = `
    <circle cx="480" cy="290" r="108" fill="${palette.panelAlt}" stroke="${palette.stroke}" />
    ${renderTextLines({
      text: centerTitle,
      x: 480,
      y: 270,
      maxChars: 7,
      lineHeight: 20,
      fill: palette.text,
      fontSize: 24,
      fontWeight: 700,
      anchor: 'middle',
    })}
    ${renderTextLines({
      text: centerNote,
      x: 480,
      y: 314,
      maxChars: 12,
      lineHeight: 18,
      fill: palette.muted,
      fontSize: 14,
      anchor: 'middle',
    })}
  `

  return {
    title,
    caption,
    svg: visualFrame({ title, subtitle, inner: `${arrows}${nodes}${center}`, height: 560 }),
  }
}

export function createLayersVisual({
  title,
  subtitle,
  layers,
  caption,
}: {
  title: string
  subtitle?: string
  layers: LayerItem[]
  caption?: string
}): InsightVisual {
  const inner = layers
    .map((layer, index) => {
      const x = 88 + index * 24
      const y = 140 + index * 54
      const width = 784 - index * 48
      const tone = layer.accent ?? palette.accent
      const soft =
        tone === palette.teal
          ? palette.tealSoft
          : tone === palette.amber
            ? palette.amberSoft
            : tone === palette.rose
              ? palette.roseSoft
              : palette.accentSoft

      return `
        <g>
          <rect x="${x}" y="${y}" width="${width}" height="88" rx="26" fill="${soft}" stroke="${tone}" />
          ${renderTextLines({
            text: layer.title,
            x: x + 28,
            y: y + 34,
            maxChars: 14,
            lineHeight: 20,
            fill: tone,
            fontSize: 20,
            fontWeight: 700,
          })}
          ${renderTextLines({
            text: layer.note,
            x: x + 28,
            y: y + 60,
            maxChars: 28,
            lineHeight: 18,
            fill: palette.text,
            fontSize: 14,
          })}
        </g>
      `
    })
    .join('')

  return {
    title,
    caption,
    svg: visualFrame({ title, subtitle, inner, height: 140 + layers.length * 54 + 120 }),
  }
}

export function createMetricCardsVisual({
  title,
  subtitle,
  cards,
  caption,
}: {
  title: string
  subtitle?: string
  cards: MetricCard[]
  caption?: string
}): InsightVisual {
  const inner = cards
    .map((card, index) => {
      const column = index % 2
      const row = Math.floor(index / 2)
      const x = 56 + column * 422
      const y = 150 + row * 156
      const tone = card.accent ?? palette.accent
      const soft =
        tone === palette.teal
          ? palette.tealSoft
          : tone === palette.amber
            ? palette.amberSoft
            : tone === palette.rose
              ? palette.roseSoft
              : palette.accentSoft

      return `
        <g>
          <rect x="${x}" y="${y}" width="366" height="124" rx="24" fill="${palette.panelAlt}" stroke="${palette.stroke}" />
          ${renderTextLines({
            text: card.title,
            x: x + 24,
            y: y + 34,
            maxChars: 12,
            lineHeight: 20,
            fill: palette.text,
            fontSize: 18,
            fontWeight: 700,
          })}
          <rect x="${x + 24}" y="${y + 54}" width="96" height="34" rx="17" fill="${soft}" />
          ${renderTextLines({
            text: card.value,
            x: x + 72,
            y: y + 76,
            maxChars: 8,
            lineHeight: 18,
            fill: tone,
            fontSize: 16,
            fontWeight: 700,
            anchor: 'middle',
          })}
          ${renderTextLines({
            text: card.note,
            x: x + 24,
            y: y + 102,
            maxChars: 24,
            lineHeight: 18,
            fill: palette.muted,
            fontSize: 14,
          })}
        </g>
      `
    })
    .join('')

  return {
    title,
    caption,
    svg: visualFrame({ title, subtitle, inner, height: cards.length <= 2 ? 340 : 490 }),
  }
}
