import type { CourseCatalogEntry, CourseFaq } from '@/lib/course-types'

function compactJoin(items: string[], separator = '，') {
  return items.filter(Boolean).join(separator)
}

export function buildCourseFaqs(course: CourseCatalogEntry): CourseFaq[] {
  const audience = (course.audience ?? []).slice(0, 3)
  const highlights = (course.highlights ?? []).slice(0, 3)
  const requirements = (course.requirements ?? []).slice(0, 2)
  const firstSections = (course.catalogSections ?? []).slice(0, 3)
  const sectionSummary = firstSections
    .map((section) => section.title.replace(/^第\d+课[:：]\s*/, '').replace(/^Module \d+[:：]\s*/, ''))
    .join('、')

  return [
    {
      question: `${course.shortTitle}适合哪些人学习？`,
      answer:
        audience.length > 0
          ? `${course.shortTitle}更适合${compactJoin(audience, '、')}。课程定位为${course.level}层级，方向聚焦${course.category}，如果你希望系统掌握${course.shortTitle}相关方法，这门课会比较合适。`
          : `${course.shortTitle}适合希望系统学习${course.category}方向内容的学员，尤其适合想围绕${course.shortTitle}建立完整方法论的人。`,
    },
    {
      question: `${course.shortTitle}主要会学什么内容？`,
      answer:
        highlights.length > 0
          ? `这门课的核心内容包括${compactJoin(highlights)}。课程总共${course.lessonCount ?? '多节'}，整体围绕“${course.subtitle}”展开，强调从方法理解到实际落地。`
          : `${course.shortTitle}会围绕${course.subtitle}展开，结合课程目录与案例练习，帮助学员从理解方法到完成落地应用。`,
    },
    {
      question: `${course.shortTitle}的课程安排是怎样的？`,
      answer:
        firstSections.length > 0
          ? `当前课程总时长约${course.duration ?? '若干小时'}，共${course.lessonCount ?? '多节'}。前几节会重点覆盖${sectionSummary}等模块，整体采用由浅入深的结构安排。`
          : `${course.shortTitle}当前课程总时长约${course.duration ?? '若干小时'}，共${course.lessonCount ?? '多节'}，会按照由浅入深的节奏完成系统讲解。`,
    },
    {
      question: `学习${course.shortTitle}前需要什么基础？`,
      answer:
        requirements.length > 0
          ? `建议你至少具备以下基础或准备：${compactJoin(requirements)}。如果你已经有一定 Python、数据分析或量化研究经验，学习效果通常会更好。`
          : `学习${course.shortTitle}前，建议具备基础的数据分析或编程能力，并愿意完成课程中的案例练习与方法复盘。`,
    },
    {
      question: `${course.shortTitle}由谁授课？`,
      answer: `${course.shortTitle}由${course.instructor?.name ?? 'AI量化讲师'}授课。讲师方向聚焦${course.category}与 AI 量化研发，课程强调内容可落地、可复用，并结合真实量化研究与交易场景进行讲解。`,
    },
  ]
}
