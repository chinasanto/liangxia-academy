import type { CourseCatalogEntry, CourseUpdatePayload } from '@/lib/course-types'
import { unstable_cache } from 'next/cache'
import {
  getDatabaseCourseBySlug,
  listDatabaseCourses,
  updateDatabaseCourse,
} from '@/lib/content-database'
import {
  getLocalCourseBySlug,
  getLocalCoursePreviewHtml,
  getLocalCourses,
  updateLocalCourse,
} from '@/lib/local-course-source'

const getCachedPublishedCourses = unstable_cache(
  async () => listDatabaseCourses({ includeDrafts: false }),
  ['academy-courses-published'],
  {
    tags: ['academy-courses'],
    revalidate: false,
  },
)

const getCachedAllCourses = unstable_cache(
  async () => listDatabaseCourses({ includeDrafts: true }),
  ['academy-courses-all'],
  {
    tags: ['academy-courses'],
    revalidate: false,
  },
)

export async function getAllCourses(
  options?: { includeDrafts?: boolean },
): Promise<CourseCatalogEntry[]> {
  try {
    const includeDrafts = options?.includeDrafts ?? false
    const courses = includeDrafts
      ? await getCachedAllCourses()
      : await getCachedPublishedCourses()
    if (courses.length > 0) {
      return courses
    }
  } catch {
    // Fall back to local data when Neon is unavailable or not initialized.
  }

  return getLocalCourses(options)
}

export async function getPublishedCourses(): Promise<CourseCatalogEntry[]> {
  return getAllCourses()
}

export async function getCourseBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
): Promise<CourseCatalogEntry | null> {
  try {
    const course = await getDatabaseCourseBySlug(slug, options)
    if (course) {
      return course
    }
  } catch {
    // Fall back to local data when Neon is unavailable or not initialized.
  }

  return getLocalCourseBySlug(slug, options)
}

export async function getCoursePreviewHtml(course: CourseCatalogEntry): Promise<string> {
  return getLocalCoursePreviewHtml(course)
}

export async function updateCourse(
  slug: string,
  patch: CourseUpdatePayload,
): Promise<CourseCatalogEntry | null> {
  try {
    const updatedCourse = await updateDatabaseCourse(slug, patch)
    if (updatedCourse) {
      return updatedCourse
    }
  } catch {
    // Fall back to local data when Neon is unavailable or not initialized.
  }

  return updateLocalCourse(slug, patch)
}
