'use client'

import { useEffect, useRef, useState } from 'react'

type CoursePreviewFrameProps = {
  title: string
  srcDoc: string
}

export function CoursePreviewFrame({
  title,
  srcDoc,
}: CoursePreviewFrameProps) {
  const frameRef = useRef<HTMLIFrameElement | null>(null)
  const [height, setHeight] = useState(1600)

  useEffect(() => {
    const frame = frameRef.current

    if (!frame) {
      return
    }

    let resizeObserver: ResizeObserver | null = null

    const updateHeight = () => {
      const documentNode = frame.contentDocument

      if (!documentNode) {
        return
      }

      const nextHeight = Math.max(
        documentNode.body.scrollHeight,
        documentNode.documentElement.scrollHeight,
        1200,
      )

      setHeight(nextHeight + 24)
    }

    const handleLoad = () => {
      updateHeight()

      const documentNode = frame.contentDocument
      if (!documentNode) {
        return
      }

      resizeObserver = new ResizeObserver(updateHeight)
      resizeObserver.observe(documentNode.body)
      resizeObserver.observe(documentNode.documentElement)
    }

    frame.addEventListener('load', handleLoad)

    return () => {
      frame.removeEventListener('load', handleLoad)
      resizeObserver?.disconnect()
    }
  }, [srcDoc])

  return (
    <iframe
      ref={frameRef}
      title={title}
      srcDoc={srcDoc}
      className="w-full rounded-2xl border border-white/[0.08] bg-white"
      style={{ height }}
      sandbox="allow-same-origin allow-scripts"
    />
  )
}

