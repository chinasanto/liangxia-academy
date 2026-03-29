import type { CourseCatalogEntry } from '@/lib/course-types'

export type RoadmapNavItem = {
  label: string
  course: CourseCatalogEntry
}

const mainRoadmapSlugs = [
  'ai-quant-basic',
  'ai-llm-quant-coding',
  'ai-quant-fullprocess',
  'factor-engineering',
  'advanced-factor-engineering',
] as const

const parallelSlug = 'brain-quant'

function findCourse(courses: CourseCatalogEntry[], slug: string) {
  return courses.find((course) => course.slug === slug)
}

export function buildCoursePathNavigation(
  currentCourse: CourseCatalogEntry,
  courses: CourseCatalogEntry[],
) {
  const currentIndex = mainRoadmapSlugs.indexOf(
    currentCourse.slug as (typeof mainRoadmapSlugs)[number],
  )

  if (currentCourse.slug === parallelSlug) {
    return {
      previous: findCourse(courses, 'ai-quant-basic')
        ? {
            label: '建议前置',
            course: findCourse(courses, 'ai-quant-basic')!,
          }
        : null,
      next: findCourse(courses, 'factor-engineering')
        ? {
            label: '回到主线',
            course: findCourse(courses, 'factor-engineering')!,
          }
        : null,
      parallel: findCourse(courses, 'ai-llm-quant-coding')
        ? {
            label: '工具提效',
            course: findCourse(courses, 'ai-llm-quant-coding')!,
          }
        : null,
    }
  }

  const previousSlug =
    currentIndex > 0 ? mainRoadmapSlugs[currentIndex - 1] : null
  const nextSlug =
    currentIndex >= 0 && currentIndex < mainRoadmapSlugs.length - 1
      ? mainRoadmapSlugs[currentIndex + 1]
      : null

  return {
    previous: previousSlug
      ? {
          label: '上一门',
          course: findCourse(courses, previousSlug)!,
        }
      : null,
    next: nextSlug
      ? {
          label: '下一门',
          course: findCourse(courses, nextSlug)!,
        }
      : null,
    parallel: currentCourse.slug !== parallelSlug && findCourse(courses, parallelSlug)
      ? {
          label: '并行专项',
          course: findCourse(courses, parallelSlug)!,
        }
      : null,
  }
}

export function getMainRoadmapSlugs() {
  return [...mainRoadmapSlugs] as (typeof mainRoadmapSlugs)[number][]
}
