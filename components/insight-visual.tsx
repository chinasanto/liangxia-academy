import type { InsightVisual as InsightVisualType } from '@/lib/insight-types'

function sanitizeSvgMarkup(svg: string) {
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\son[a-z]+="[^"]*"/gi, '')
    .replace(/\son[a-z]+='[^']*'/gi, '')
    .replace(/href="javascript:[^"]*"/gi, 'href="#"')
    .replace(/xlink:href="javascript:[^"]*"/gi, 'xlink:href="#"')
}

export function InsightVisual({ visual }: { visual: InsightVisualType }) {
  return (
    <figure className="mt-6 overflow-hidden rounded-[26px] border border-slate-200/80 bg-slate-50/85 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div
        className="[&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: sanitizeSvgMarkup(visual.svg) }}
      />
      {visual.caption ? (
        <figcaption className="border-t border-slate-200/80 px-4 py-3 text-sm leading-6 text-slate-600 sm:px-6">
          {visual.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
