// 基础类型
type TimeRange = {
  start: string;
  end: string;
};

// 区块基础类型
export type BlockBase = {
  id: string;
  type: string;
  title: string;
  order?: number;
  visible?: boolean;
  items?: any[];
  content?: string;
};

// 内容区块 (通用内容)
export type ContentBlock = BlockBase & {
  type: "content";
  content: string;
};

// 带时间范围的基础类型
type TimeRangeItem = {
  timeRange?: TimeRange;
  content: string;
};

// 带标题和子标题的项目
export type TitleSubItem = TimeRangeItem & {
  title: string;
  subtitle?: string;
};

// 列表区块 (通用列表)
export type ListBlock = BlockBase & {
  type: "list";
  items: TitleSubItem[];
};

// 教育经历项
export type EducationItem = TitleSubItem & {
  school: string;
  major: string;
  degree: string;
};

// 教育经历区块
export type EducationBlock = BlockBase & {
  type: "education";
  items: EducationItem[];
};

// 工作经历项
export type WorkItem = TitleSubItem & {
  company: string;
  job: string;
};

// 工作经历区块
export type WorkBlock = BlockBase & {
  type: "work";
  items: WorkItem[];
};

// 项目经历项
export type ProjectItem = TitleSubItem & {
  name: string;
  job: string;
};

// 项目经历区块
export type ProjectBlock = BlockBase & {
  type: "project";
  items: ProjectItem[];
};

// 荣誉奖项项
export type HonorItem = {
  title: string;
  content: string;
};

// 荣誉奖项区块
export type HonorBlock = BlockBase & {
  type: "honor";
  items: HonorItem[];
};

// 自定义区块
export type CustomBlock<T = any> = BlockBase & {
  type: "custom";
  data: T;
};

// 所有可用区块类型
export type Block =
  | ContentBlock
  | ListBlock
  | EducationBlock
  | WorkBlock
  | ProjectBlock
  | HonorBlock
  | CustomBlock;

// 简历完整类型定义
export type Resume = {
  // 基本信息
  base: {
    name: string;
    gender?: string;
    age?: number;
    phone?: string;
    location?: string;
    // 政治面貌
    politicalStatus?: string;
    email?: string;
    job?: string;
    avatar?: string;
    // 个人主页
    personalWebsite?: string;
  };
  // 区块列表
  blocks: Block[];
  // 模板配置
  templateOptions?: Record<string, string>;
  // 字体
  font?: string;
};

// 预设区块ID
export const BLOCK_IDS = {
  EDUCATION: "education",
  SKILLS: "skills",
  WORK: "work",
  PROJECT: "project",
  HONOR: "honor",
  SELF_EVALUATION: "selfEvaluation",
} as const;

// 预设区块名称
export const BLOCK_TITLES = {
  [BLOCK_IDS.EDUCATION]: "教育经历",
  [BLOCK_IDS.SKILLS]: "技能特长",
  [BLOCK_IDS.WORK]: "工作经历",
  [BLOCK_IDS.PROJECT]: "项目经历",
  [BLOCK_IDS.HONOR]: "荣誉奖项",
  [BLOCK_IDS.SELF_EVALUATION]: "自我评价",
} as const;
