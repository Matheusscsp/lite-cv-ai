export type Template = {
  id: string;
  type: "build-in" | "custom";
  name: string;
  description: string;
  // 选项
  options?: FieldOption[];
};

// 选项
export type FieldOption = {
  type:
    | "select"
    | "input"
    | "checkbox"
    | "radio"
    | "date"
    | "number"
    | "color-picker";
  options?: { label: string; value: string }[];
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  defaultValue: string;
};

export function getTemplateDefaultOptions(template?: Template) {
  if (!template) {
    return {};
  }
  const kv = template.options?.reduce((acc, option) => {
    acc[option.name] = option.defaultValue;
    return acc;
  }, {} as Record<string, string>);
  return kv;
}

export const ResumeTemplates: Template[] = [
  {
    id: "next",
    type: "build-in",
    name: "简约简历模板",
    description: "简约紧凑的专业简历模板，高效展示核心信息",
  },
  {
    id: "modern",
    type: "build-in",
    name: "现代简约模板",
    description: "现代风格的简历模板，简洁明了，突出重点信息",
    options: [
      {
        type: "color-picker",
        name: "themeColor",
        label: "主题色",
        description: "自定义主题色",
        defaultValue: "#2196F3",
        options: [
          { label: "科技蓝", value: "#2196F3" },
          { label: "极简黑", value: "#212121" },
          { label: "活力橙", value: "#FF5722" },
          { label: "清新绿", value: "#4CAF50" },
          { label: "时尚紫", value: "#9C27B0" },
          { label: "都市灰", value: "#607D8B" },
          { label: "珊瑚粉", value: "#FF7F7F" },
          { label: "薄荷青", value: "#00BCD4" },
        ],
      },
      {
        type: "radio",
        name: "layout",
        label: "布局",
        description: "选择一个布局，以突出简历的视觉效果",
        defaultValue: "normal",
        options: [
          { label: "一般", value: "normal" },
          { label: "宽松", value: "loose" },
          { label: "紧凑", value: "compact" },
        ],
      },
    ],
  },
  {
    id: "professional",
    type: "build-in",
    name: "专业商务模板",
    description: "专业的商务风格模板，适合正式场合和商务人士",
    options: [
      {
        type: "color-picker",
        name: "themeColor",
        label: "主题色",
        description: "选择一个主题色，以突出简历的视觉效果",
        defaultValue: "#1D3A8A",
        options: [
          { label: "科技蓝", value: "#2196F3" },
          { label: "极简黑", value: "#212121" },
          { label: "深蓝色", value: "#1D3A8A" },
          { label: "商务蓝", value: "#0A66C2" },
          { label: "深绿色", value: "#2E7D32" },
          { label: "暗红色", value: "#C62828" },
          { label: "深紫色", value: "#4A148C" },
          { label: "海军蓝", value: "#0D47A1" },
          { label: "深灰色", value: "#424242" },
          { label: "深棕色", value: "#5D4037" },
        ],
      },
      {
        type: "radio",
        name: "layout",
        label: "布局",
        description: "选择一个布局，以突出简历的视觉效果",
        defaultValue: "normal",
        options: [
          { label: "一般", value: "normal" },
          { label: "宽松", value: "loose" },
          { label: "紧凑", value: "compact" },
        ],
      },
    ],
  },
  {
    id: "minimal",
    type: "build-in",
    name: "极简风格模板",
    description: "极简主义设计的简历模板，突出内容和空间感",
  },
  {
    id: "fresh-grad",
    type: "build-in",
    name: "新锐应届生模板",
    description: "专为应届生和实习生设计的简历模板，突出教育背景和实习经验",
    options: [
      {
        type: "color-picker",
        name: "themeColor",
        label: "主题色",
        description: "自定义主题色",
        defaultValue: "#4CAF50",
        options: [
          { label: "活力绿", value: "#4CAF50" },
          { label: "科技蓝", value: "#2196F3" },
          { label: "朝气橙", value: "#FF9800" },
          { label: "活力紫", value: "#673AB7" },
          { label: "清新青", value: "#009688" },
        ],
      },
    ],
  },
  {
    id: "international",
    type: "build-in",
    name: "国际留学生模板",
    description: "专为海外留学生设计的双语简历模板，突出国际化经历和语言能力",
    options: [
      {
        type: "color-picker",
        name: "themeColor",
        label: "主题色",
        description: "自定义主题色",
        defaultValue: "#3F51B5",
        options: [
          { label: "国际蓝", value: "#3F51B5" },
          { label: "深海蓝", value: "#0D47A1" },
          { label: "暗夜黑", value: "#212121" },
          { label: "深红色", value: "#B71C1C" },
          { label: "墨绿色", value: "#1B5E20" },
        ],
      },
    ],
  },
  {
    id: "senior-tech",
    type: "build-in",
    name: "高级技术专家模板",
    description: "为资深工程师和技术专家设计的简历模板，突出专业能力和技术深度",
    options: [
      {
        type: "color-picker",
        name: "themeColor",
        label: "主题色",
        description: "自定义主题色",
        defaultValue: "#546E7A",
        options: [
          { label: "专业灰", value: "#546E7A" },
          { label: "科技蓝", value: "#1565C0" },
          { label: "深邃黑", value: "#263238" },
          { label: "静谧绿", value: "#2E7D32" },
          { label: "稳重紫", value: "#4527A0" },
        ],
      },
      {
        type: "radio",
        name: "density",
        label: "信息密度",
        description: "调整简历的信息密度",
        defaultValue: "high",
        options: [
          { label: "高", value: "high" },
          { label: "中", value: "medium" },
          { label: "低", value: "low" },
        ],
      },
    ],
  },
  {
    id: "business",
    type: "build-in",
    name: "现代商务精英模板",
    description: "为商务人士和管理者设计的专业简历模板，突出领导力和商业成就",
    options: [
      {
        type: "color-picker",
        name: "themeColor",
        label: "主题色",
        description: "自定义主题色",
        defaultValue: "#0A66C2",
        options: [
          { label: "商务蓝", value: "#0A66C2" },
          { label: "典雅灰", value: "#455A64" },
          { label: "深邃黑", value: "#1a1a1a" },
          { label: "勃艮第红", value: "#880E4F" },
          { label: "深沉绿", value: "#1B5E20" },
        ],
      },
    ],
  },
  {
    id: "elegant",
    type: "build-in",
    name: "优雅经典模板",
    description: "优雅经典的简历模板，特别适合英文简历和国际求职",
  },
  {
    id: "academic",
    type: "build-in",
    name: "学术研究模板",
    description: "为研究生和学术人士设计的简历模板，突出研究成果和学术背景",
    options: [
      {
        type: "color-picker",
        name: "themeColor",
        label: "主题色",
        description: "自定义主题色",
        defaultValue: "#512DA8",
        options: [
          { label: "学院紫", value: "#512DA8" },
          { label: "墨水蓝", value: "#1A237E" },
          { label: "书卷棕", value: "#5D4037" },
          { label: "深森绿", value: "#1B5E20" },
          { label: "经典黑", value: "#212121" },
        ],
      },
      {
        type: "radio",
        name: "style",
        label: "风格",
        description: "选择简历的整体风格",
        defaultValue: "modern",
        options: [
          { label: "现代", value: "modern" },
          { label: "经典", value: "classic" },
        ],
      },
    ],
  },
];
