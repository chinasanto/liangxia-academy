import type {
  CourseCatalogEntry,
  CourseRecommendation,
} from '@/lib/course-types'

function findBySlug(courses: CourseCatalogEntry[], slug: string) {
  return courses.find((course) => course.slug === slug)
}

function makeRecommendation(
  courses: CourseCatalogEntry[],
  slug: string,
  label: string,
  reason: string,
) {
  const course = findBySlug(courses, slug)

  if (!course) {
    return null
  }

  return {
    label,
    reason,
    course,
  }
}

const recommendationMap: Record<
  string,
  Array<{ slug: string; label: string; reason: string }>
> = {
  'ai-quant-basic': [
    {
      slug: 'factor-engineering',
      label: '下一步推荐',
      reason: '基础打稳后，最适合继续进入因子工程设计与 Alpha 研究主线。',
    },
    {
      slug: 'ai-llm-quant-coding',
      label: '提效搭配',
      reason: '如果你想把研究效率提上来，这门课能补足 Codex 与 ChatGPT 的量化工作流。',
    },
    {
      slug: 'ai-quant-fullprocess',
      label: '闭环进阶',
      reason: '想从建模进一步走向自动化部署与实盘执行，可以继续看这门全流程高级班。',
    },
  ],
  'factor-engineering': [
    {
      slug: 'ai-quant-basic',
      label: '前置基础',
      reason: '如果还没系统学过量化基础，先补这门课会让因子工程更容易吃透。',
    },
    {
      slug: 'advanced-factor-engineering',
      label: '高阶延伸',
      reason: '完成因子设计后，可以继续进入科学评估、生命周期和因子工厂体系。',
    },
    {
      slug: 'ai-quant-fullprocess',
      label: '实盘衔接',
      reason: '想把因子研究继续推向策略闭环与自动化部署，这门课衔接很自然。',
    },
  ],
  'advanced-factor-engineering': [
    {
      slug: 'factor-engineering',
      label: '前置主线',
      reason: '这门课更适合建立在因子工程设计基础上继续向评估体系升级。',
    },
    {
      slug: 'ai-quant-fullprocess',
      label: '落地组合',
      reason: '评估体系搭好后，可以结合全流程高级班去看策略部署与执行闭环。',
    },
    {
      slug: 'ai-llm-quant-coding',
      label: '提效协同',
      reason: '如果你想提升因子研究和代码治理效率，可以搭配 AI 编程提效课程一起看。',
    },
  ],
  'ai-quant-fullprocess': [
    {
      slug: 'ai-quant-basic',
      label: '前置基础',
      reason: '如果你还没建立稳定的量化基础框架，先回补基础课会更稳。',
    },
    {
      slug: 'factor-engineering',
      label: '研究增强',
      reason: '想强化上游因子与特征设计能力，可以继续配合因子工程课程一起学习。',
    },
    {
      slug: 'ai-llm-quant-coding',
      label: '提效搭配',
      reason: '如果你已经进入系统搭建阶段，这门课能明显提升开发和重构效率。',
    },
  ],
  'brain-quant': [
    {
      slug: 'ai-quant-basic',
      label: '前置基础',
      reason: '先具备基础量化认知，再做 WorldQuant Brain 平台专项会更顺。',
    },
    {
      slug: 'factor-engineering',
      label: 'Alpha强化',
      reason: '想进一步强化 Alpha 设计能力，可以把平台专项和因子工程主线结合起来学。',
    },
    {
      slug: 'ai-llm-quant-coding',
      label: '工具提效',
      reason: '如果你准备做自动化生成和批量研究，AI 编程提效会非常有帮助。',
    },
  ],
  'ai-llm-quant-coding': [
    {
      slug: 'ai-quant-basic',
      label: '前置基础',
      reason: '先理解量化研究基本流程，再用 AI 工具提效，效果会更明显。',
    },
    {
      slug: 'factor-engineering',
      label: '研究场景',
      reason: '想把 AI 编程效率真正用在因子设计上，可以继续看因子工程课程。',
    },
    {
      slug: 'ai-quant-fullprocess',
      label: '系统落地',
      reason: '如果你希望把 AI 协作流程落到完整交易系统开发中，这门课最适合继续衔接。',
    },
  ],
}

export function buildCourseRecommendations(
  currentCourse: CourseCatalogEntry,
  courses: CourseCatalogEntry[],
): CourseRecommendation[] {
  const mapped = (recommendationMap[currentCourse.slug] ?? [])
    .map((item) =>
      makeRecommendation(courses, item.slug, item.label, item.reason),
    )
    .filter((item): item is CourseRecommendation => item !== null)

  return mapped.filter((item) => item.course.slug !== currentCourse.slug).slice(0, 3)
}
