import type { CourseCatalogEntry, CoursePositioning } from '@/lib/course-types'

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)))
}

function buildNotSuitableFor(course: CourseCatalogEntry) {
  const common = [
    '只想拿现成策略而不愿意理解研究逻辑的人',
    '没有时间完成案例练习与课后复盘的人',
  ]

  if (course.level === '入门') {
    return unique([
      '希望直接跳过基础、立刻学习高阶因子评估或生产部署的人',
      '完全不接触 Python 与数据分析工具的人',
      ...common,
    ]).slice(0, 3)
  }

  if (course.level === '高阶' || course.level === '高级') {
    return unique([
      '零基础且还没有回测、因子或模型训练经验的人',
      '只希望看简单指标模板、不打算建设系统框架的人',
      ...common,
    ]).slice(0, 3)
  }

  if (course.category === '工具提效') {
    return unique([
      '完全不写代码、也没有量化研发场景的人',
      '只想把 AI 当成一次性聊天工具的人',
      ...common,
    ]).slice(0, 3)
  }

  return unique([
    '完全零基础且尚未建立量化研究常识的人',
    '更想看单一技巧而不是系统方法论的人',
    ...common,
  ]).slice(0, 3)
}

function buildOutcomes(course: CourseCatalogEntry) {
  const fromSections = (course.catalogSections ?? [])
    .slice(0, 3)
    .map((section) =>
      section.title
        .replace(/^第\d+课[:：]\s*/, '')
        .replace(/^Module \d+[:：]\s*/, ''),
    )

  const outcomes = [
    `建立围绕${course.category}的系统学习框架，而不只是零散掌握单点技巧`,
    ...fromSections.map((item) => `能够围绕“${item}”完成更清晰的研究与实战拆解`),
    ...(course.tags ?? []).slice(0, 2).map((tag) => `掌握与“${tag}”相关的关键方法与应用场景`),
  ]

  return unique(outcomes).slice(0, 3)
}

export function buildCoursePositioning(
  course: CourseCatalogEntry,
): CoursePositioning {
  return {
    suitableFor: unique(course.audience ?? []).slice(0, 3),
    notSuitableFor: buildNotSuitableFor(course),
    outcomes: buildOutcomes(course),
  }
}
