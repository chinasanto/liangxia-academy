import type {
  CourseCatalogSection,
  CourseDetailConfig,
  CourseInstructor,
} from '@/lib/course-types'

const zouTeacher: CourseInstructor = {
  name: 'AI量化邹老师',
  title: '15年大厂经验倾囊相授',
  description:
    '聚焦 AI 量化交易、因子工程、WorldQuant Brain 与生产级策略闭环，强调课程内容可落地、可复用、可持续升级。',
  students: '5600+',
  courseCount: '5门课',
  rating: '4.9',
}

function makeSection(
  id: string,
  title: string,
  lessons: string[],
): CourseCatalogSection {
  return {
    id,
    title,
    lessonCount: '1节',
    totalHours: '2小时',
    lessons: lessons.map((lesson, index) => ({
      title: lesson,
      duration: ['35:00', '40:00', '45:00'][index] ?? '38:00',
      preview: index === 0,
    })),
  }
}

export const courseDetailsBySlug: Record<string, CourseDetailConfig> = {
  'ai-quant-basic': {
    coverImage: '/course-covers/ai-quant-basic.jpg',
    coverAlt: 'AI量化基础课课程封面',
    originalPrice: '¥4999',
    rating: '4.9',
    reviewCount: '2120',
    studentCount: '2120',
    duration: '12小时',
    lessonCount: '6节',
    instructor: zouTeacher,
    highlights: [
      '围绕数据工程、机器学习、因子体系和 CTA 执行系统搭建完整入门闭环',
      '6 节课每节 2 小时，适合系统化建立量化研究与策略开发基础',
      '强调标准化数据处理、量化特化模型评估与因子范式方法论',
      '适合作为后续因子工程和高级班课程的前置基础课',
    ],
    requirements: [
      '对 AI 量化或策略开发有兴趣即可，不要求强金融背景',
      '建议具备基础 Python 使用能力和基本数据分析常识',
      '愿意完成课后的小型实战练习与案例复盘',
    ],
    audience: [
      'AI量化初学者',
      '希望从零构建量化工程认知的人',
      '准备转向量化开发的程序员',
      '想从数据工程一路走到实盘执行的学习者',
    ],
    catalogSections: [
      makeSection('basic-1', '第01课：行情数据体系与 EDA 分析（数据篇）', [
        '多市场行情接入：期货 / 股票 / Crypto 数据源',
        'OHLCV 结构与时间频率：重采样与对齐',
        '数据质量检查与基础 EDA 体检',
      ]),
      makeSection('basic-2', '第02课：机器学习基础与量化特化（算法篇）', [
        '量化 vs 传统 ML：时间序列约束与验证方式',
        '量化指标体系：IC、RankIC、分位收益',
        '用少量因子训练第一个 ML 模型',
      ]),
      makeSection('basic-3', '第03课：24 因子体系构建', [
        '8个基础因子与16个进阶因子的构建逻辑',
        '因子工程：滞后处理、滚动窗口、防未来函数',
        '单因子有效性检验与标准化因子矩阵输出',
      ]),
      makeSection('basic-4', '第04课：因子范式思维与 Alpha 设计方法论', [
        '工程化、相对化、策略化、工厂化四级范式',
        '如何把因子变成可执行的策略模块',
        '设计属于自己的 Alpha 范式与挖掘框架',
      ]),
      makeSection('basic-5', '第05课：基于 XGBoost 的 AI 量化策略构建', [
        '特征矩阵与目标变量构建',
        '滚动训练、时间切片与信号生成',
        '完成一个 AI 策略回测 Demo',
      ]),
      makeSection('basic-6', '第06课：CTA 执行系统与模型对接', [
        'CTA 执行架构：行情→信号→下单→风控→对账',
        '滑点、延迟、成交率与实盘迁移清单',
        '模型输出如何对接到真实交易系统',
      ]),
    ],
    reviews: [
      {
        name: '陈同学',
        role: '转岗量化开发',
        comment: '这门基础课最有价值的是把数据、因子、模型和执行真正串了起来，后面进阶课程也更容易衔接。',
      },
      {
        name: 'Lynn',
        role: '数据分析师',
        comment: '非常适合从零入门量化，尤其是数据处理和模型评价部分讲得很清楚。',
      },
    ],
  },
  'factor-engineering': {
    coverImage: '/course-covers/factor-engineering.jpg',
    coverAlt: '因子工程设计卓越班课程封面',
    originalPrice: '¥7999',
    rating: '4.9',
    reviewCount: '645',
    studentCount: '645',
    duration: '12小时',
    lessonCount: '6节',
    instructor: zouTeacher,
    highlights: [
      '围绕因子设计、AI 特征衍生、另类市场与 CTA/Crypto 全流程建模展开',
      '课程重心是把投资直觉提升为工程化、可生产、可扩展的因子体系',
      '6 节课每节 2 小时，适合作为因子研究主线课程',
      '对 Transformer、肥尾市场与生产工厂方法都有实际落地视角',
    ],
    requirements: [
      '建议先修 AI 量化基础课程班或具备基本回测认知',
      '熟悉常见技术指标、机器学习基础概念会更容易吸收',
      '适合愿意系统搭建因子框架的研究者和开发者',
    ],
    audience: [
      '因子研究员',
      'CTA / Crypto 策略开发者',
      '想系统做 AI 特征衍生的人',
      '准备搭建可进化因子工厂的团队成员',
    ],
    catalogSections: [
      makeSection('factor-1', '第01课：因子工程与机器学习基础知识', [
        '7种因子类型详解与标准研究方法论',
        '因子工程与 ML 运用：IV 与单因子贡献度',
        '历史数据中的因子应用案例复盘',
      ]),
      makeSection('factor-2', '第02课：AI in 金融交易策略核心逻辑', [
        'AI 在金融交易中的挑战与概念映射',
        'AI 因子工程与特征衍生实战技术',
        '使用 AI 因子工程升级传统技术指标',
      ]),
      makeSection('factor-3', '第03课：因子工程设计原理和代码讲解', [
        '5层因子设计框架与高阶应用场景',
        '常用时序、横截面与逻辑算子详解',
        '因子设计实战代码逐行讲解',
      ]),
      makeSection('factor-4', '第04课：另类市场的因子衍生逻辑探讨', [
        '另类市场与肥尾效应场景下的因子设计',
        '7x24 小时数字资产市场的因子衰减与更新机制',
        '构建回归 / 分类 / RL 方向的衍生指标库',
      ]),
      makeSection('factor-5', '第05课：量化策略建模全流程实战 (CTA)', [
        '多品种、多空对称目标设定与完整训练过程',
        '局部优化陷阱与 CTA 商品期货策略实战',
        '从因子到自动化交易的全流程框架搭建',
      ]),
      makeSection('factor-6', '第06课：AI时间序列交易策略建模 (CRYPTO)', [
        '加密货币时序数据清洗与预处理',
        'Transformer 在时序建模中的适配方法',
        'CRYPTO 交易策略实盘模拟与评估',
      ]),
    ],
    reviews: [
      {
        name: 'Leo',
        role: '量化研究员',
        comment: '课程真正把因子研究从“指标堆砌”推进到了“工程系统”的层面，非常适合做研究升级。',
      },
      {
        name: '赵同学',
        role: 'CTA策略开发',
        comment: '另类市场和 AI 特征衍生部分很实用，对我做 Crypto 场景的因子探索帮助很大。',
      },
    ],
  },
  'advanced-factor-engineering': {
    coverImage: '/course-covers/advanced-factor-engineering.jpg',
    coverAlt: '高级因子工程科学评估体系课程封面',
    originalPrice: '¥12999',
    rating: '4.9',
    reviewCount: '523',
    studentCount: '523',
    duration: '12小时',
    lessonCount: '6节',
    instructor: zouTeacher,
    highlights: [
      '课程核心是把因子研发从“看曲线”升级到“看概率”，再升级为可运营资产',
      '采用 `course_overview_v2.html` 的六大模块结构重建详情页目录',
      '强调准入、生命周期、统计过拟合、元因子预测与动态组合装配',
      '适合想搭建机构级因子工厂与评估系统的高级学员',
    ],
    requirements: [
      '建议已具备多因子研究或因子工程实践经验',
      '熟悉回测、基本风险指标和因子评价逻辑',
      '适合希望从研究者升级为系统架构设计者的人',
    ],
    audience: [
      '高级量化研究员',
      '因子工厂负责人',
      '需要建设科学评估体系的团队',
      '关注未来验证与元模型组合的人',
    ],
    catalogSections: [
      makeSection('advanced-1', 'Module 1：量化交易的隐形杀手：统计过拟合深度分析', [
        '识别回测曲线漂亮但不可靠的根因',
        '从数据切分、参数搜索到样本选择的过拟合来源',
        '建立从“看收益”到“看概率”的第一性原则',
      ]),
      makeSection('advanced-2', 'Module 2：基础设施与准入体系', [
        'Gate 准入系统与拒绝理由报告',
        'POWR 生命周期状态机与因子准入规则',
        '把因子从研究产物变成可管理资产',
      ]),
      makeSection('advanced-3', 'Module 3：因子规模化生产体系原理', [
        'Factor Factory 的配置驱动与 UUID 溯源机制',
        '从 Excel 参数表到公式工厂的生产体系',
        '建立批量产出 4000+ 候选因子的通用蓝图',
      ]),
      makeSection('advanced-4', 'Module 4：统计概率评估（Bootstrap/PBO）', [
        'Block Bootstrap 与 CSCV / PBO 的核心逻辑',
        '用统计概率替代单次回测成绩做准入判断',
        '生成稳定性得分、赚钱概率与淘汰名单',
      ]),
      makeSection('advanced-5', 'Module 5：基于统计归纳元因子与预测体系', [
        '构建元因子体征并预测未来失效概率',
        '多维评估、未来验证与健康分体系',
        '从事后评价走向事前风控与动态预测',
      ]),
      makeSection('advanced-6', 'Module 6：元模型架构与动态组合', [
        '元模型优选与 HRP 动态组合装配',
        '把评估后的优质因子整合成可运行系统',
        '形成评价、预测、生产、筛选、组合的一体化闭环',
      ]),
    ],
    reviews: [
      {
        name: '钱同学',
        role: '多因子团队负责人',
        comment: '最强的是评估思想升级，不再只看回测表现，而是学会用统计与生命周期去管理因子。',
      },
      {
        name: 'Mia',
        role: '量化策略工程师',
        comment: '这门课明显更偏架构师视角，很适合团队搭建正式的因子工厂和准入体系。',
      },
    ],
  },
  'ai-quant-fullprocess': {
    coverImage: '/course-covers/ai-quant-fullprocess.jpg',
    coverAlt: 'AI量化全流程高级班课程封面',
    originalPrice: '¥5999',
    rating: '4.9',
    reviewCount: '234',
    studentCount: '856',
    duration: '12小时',
    lessonCount: '6节',
    instructor: zouTeacher,
    highlights: [
      '围绕目标设定、模型调优、动态风控、自动部署和 AI 增强形成全流程闭环',
      '参考原始课程目录，重构成 6 节 × 2 小时的模块化课程详情',
      '适合已经有一定基础、希望搭建生产级 AI 量化系统的学员',
      '兼顾商品期货、Crypto 与传统策略增强三类场景',
    ],
    requirements: [
      '建议完成基础课程或具备基本机器学习与回测经验',
      '掌握 Python、特征工程与模型训练的基本流程',
      '有继续走向自动化实盘部署意愿的学员会更适合',
    ],
    audience: [
      'AI量化进阶班',
      '准备搭建生产级流程的策略团队',
      '量化开发进阶者',
      '希望从回测走向自动执行的人',
    ],
    catalogSections: [
      makeSection('full-1', '第01课：量化策略建模目标设定和全流程实战', [
        '单品种 vs 多品种对称设计与目标设定',
        '机器学习在量化中的常见错误范式',
        '搭建一个无未来函数的策略基准模型',
      ]),
      makeSection('full-2', '第02课：机器学习量化策略的模型调优', [
        '回测与绩效风险评价指标深度分析',
        '时间序列中的交叉验证与过拟合防范',
        '输出完整的策略超参数优化报告',
      ]),
      makeSection('full-3', '第03课：带止盈止损的策略建模全流程', [
        '固定 / 统计 / 波动率等风控设计方法',
        '跨日持有与日内交易的风控差异',
        '构建带动态风控的策略回测系统',
      ]),
      makeSection('full-4', '第04课：综合实战项目——增量学习及自动化部署', [
        '增量迁移学习与 Concept Drift 处理',
        '每日新增数据自动导入与清洗管线',
        '对接实盘接口实现自动化交易脚本',
      ]),
      makeSection('full-5', '第05课：AI时间序列交易策略建模——CRYPTO', [
        'Crypto 市场数据特性与时序特征工程',
        'Transformer 模型构建、训练与评估',
        '完成一个 Crypto 趋势预测模型',
      ]),
      makeSection('full-6', '第06课：利用AI技术增强传统交易策略', [
        '传统策略缺陷分析与 AI 增强方法论',
        '机器学习 + 经典指标的混合模型设计',
        '输出可复用的 AI 增强型策略库',
      ]),
    ],
    reviews: [
      {
        name: 'Kevin',
        role: '量化工程经理',
        comment: '整门课围绕生产闭环展开，不只是做模型，而是明确教你怎么把策略跑起来并持续迭代。',
      },
      {
        name: '阿峰',
        role: '策略开发者',
        comment: '章节结构很清楚，6 节课刚好把目标设计、调优、风控、部署和增强都串起来了。',
      },
    ],
  },
  'brain-quant': {
    coverImage: '/course-covers/brain-quant.jpg',
    coverAlt: 'WorldQuant Brain 实战课课程封面',
    originalPrice: '¥4999',
    rating: '4.9',
    reviewCount: '980',
    studentCount: '980',
    duration: '12小时',
    lessonCount: '6节',
    instructor: zouTeacher,
    highlights: [
      '专项聚焦 WorldQuant Brain 平台，直接围绕自动化挖掘、Alpha 优化与求职指导展开',
      '6 节课每节 2 小时，适合做平台专项冲刺与项目作品积累',
      '兼顾 Brain 自动化流水线、ML 实战和求职升学辅导',
      '适合作为基础课之后的专项进阶模块',
    ],
    requirements: [
      '建议已具备基础量化认知或完成入门课程',
      '愿意在平台上做实验并持续复盘策略表达式',
      '适合有求职、升学或专项冲刺需求的学员',
    ],
    audience: [
      'WorldQuant Brain 平台学习者',
      '准备做 Alpha 自动化挖掘的人',
      '想提升量化求职竞争力的学生',
      '希望快速做专项提升的量化从业者',
    ],
    catalogSections: [
      makeSection('brain-1', '第01课：WorldQuant 量化交易实战入门', [
        '量化思维构建与主观交易到客观量化的转变',
        'WorldQuant 12 大类数据源与平台指标体系',
        '完成第一个 Valid Alpha 的提交',
      ]),
      makeSection('brain-2', '第02课：Brain 程序系列实战', [
        '从手工单个 Alpha 到自动化批量生成的进阶',
        'Brain 核心自动化程序与 Python 项目结构',
        '批量测试、自动提交流程与错误预防',
      ]),
      makeSection('brain-3', '第03课：Alpha Machine 自动化策略生成', [
        '自动化策略生成系统架构设计',
        '数据准备、字段选择与策略工厂模块化设计',
        '批量仿真与策略池优选实战',
      ]),
      makeSection('brain-4', '第04课：Brain Alpha 优化方案', [
        'Alpha 优化 11 大核心方法全解析',
        'Decay / 平滑 / 中性化 / 条件交易等技巧',
        '输出可直接复用的 Alpha 优化模板库',
      ]),
      makeSection('brain-5', '第05课：机器学习量化策略全流程', [
        '真实期货数据上的特征工程与模型训练',
        '偏差-方差权衡、正则化与性能评估',
        '构建基于真实数据的 ML 交易策略 Demo',
      ]),
      makeSection('brain-6', '第06课：AI 量化求职与升学全面指导', [
        '量化职业全景图与岗位匹配分析',
        '技术面、行为面与简历作品集准备',
        '形成面向求职和升学的系统表达模板',
      ]),
    ],
    reviews: [
      {
        name: 'Iris',
        role: '研究生申请者',
        comment: '课程非常聚焦，平台专项、自动化和求职表达都讲到了，很适合做一次集中冲刺。',
      },
      {
        name: '徐同学',
        role: '平台研究爱好者',
        comment: '如果已经有基础，这门课很适合直接提升 WorldQuant Brain 平台上的实际战斗力。',
      },
    ],
  },
}
