import { promises as fs } from 'fs'
import path from 'path'

import { courseDetailsBySlug } from '@/data/course-details'
import type { CourseCatalogEntry, CourseUpdatePayload } from '@/lib/course-types'

const catalogFile = path.join(process.cwd(), 'data', 'course-catalog.json')
const sourceDirectory = path.join(process.cwd(), 'content', 'course-html')

export function compareCourses(a: CourseCatalogEntry, b: CourseCatalogEntry) {
  if (a.sortOrder !== b.sortOrder) {
    return a.sortOrder - b.sortOrder
  }

  return a.title.localeCompare(b.title, 'zh-CN')
}

async function readCatalog() {
  const content = await fs.readFile(catalogFile, 'utf8')
  return JSON.parse(content) as CourseCatalogEntry[]
}

async function writeCatalog(courses: CourseCatalogEntry[]) {
  await fs.writeFile(
    catalogFile,
    `${JSON.stringify(courses.sort(compareCourses), null, 2)}\n`,
    'utf8',
  )
}

function enrichCourse(course: CourseCatalogEntry) {
  return {
    ...course,
    ...courseDetailsBySlug[course.slug],
  }
}

function buildPlaceholderDataUrl(label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" rx="32" fill="#181f2a"/><circle cx="160" cy="118" r="44" fill="#00E5B0" opacity="0.16"/><text x="160" y="150" text-anchor="middle" fill="#E8F0F7" font-size="24" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif">AI量化学院</text><text x="160" y="190" text-anchor="middle" fill="#8EA4B3" font-size="16" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif">${label}</text></svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function injectPreviewStyles(html: string) {
  const previewStyle = `
    <style>
      .logo-section,
      .contact-section {
        display: none !important;
      }

      body {
        min-height: auto !important;
      }

      .container {
        padding-bottom: 48px !important;
      }
    </style>
  `

  return html.replace('</head>', `${previewStyle}</head>`)
}

function rewriteCourseLinks(html: string, courses: CourseCatalogEntry[]) {
  let nextHtml = html.replace(/href="index\.html"/g, 'href="/academy"')

  for (const course of courses) {
    const pattern = new RegExp(`href="${course.sourceFile}"`, 'g')
    nextHtml = nextHtml.replace(pattern, `href="/academy/${course.slug}"`)
  }

  return nextHtml
}

function replaceMissingImages(html: string, course: CourseCatalogEntry) {
  const placeholder = buildPlaceholderDataUrl(course.shortTitle)
  return html.replace(/src="pic\/[^"]+"/g, `src="${placeholder}"`)
}

export async function getLocalCourses(options?: { includeDrafts?: boolean }) {
  const includeDrafts = options?.includeDrafts ?? false
  const courses = await readCatalog()
  const filtered = includeDrafts
    ? courses
    : courses.filter((course) => course.published)

  return filtered.sort(compareCourses).map(enrichCourse)
}

export async function getLocalCourseBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
) {
  const includeDrafts = options?.includeDrafts ?? false
  const courses = await readCatalog()
  const course = courses.find(
    (entry) => entry.slug === slug && (includeDrafts || entry.published),
  )

  return course ? enrichCourse(course) : null
}

export async function getLocalCoursePreviewHtml(course: CourseCatalogEntry) {
  const [html, courses] = await Promise.all([
    fs.readFile(path.join(sourceDirectory, course.sourceFile), 'utf8'),
    readCatalog(),
  ])

  return injectPreviewStyles(
    replaceMissingImages(rewriteCourseLinks(html, courses), course),
  )
}

export async function updateLocalCourse(
  slug: string,
  patch: CourseUpdatePayload,
) {
  const courses = await readCatalog()
  const courseIndex = courses.findIndex((course) => course.slug === slug)

  if (courseIndex === -1) {
    return null
  }

  const updatedCourse = {
    ...courses[courseIndex],
    ...patch,
  }

  courses[courseIndex] = updatedCourse
  await writeCatalog(courses)

  return enrichCourse(updatedCourse)
}
