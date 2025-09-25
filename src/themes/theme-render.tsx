import type { Resume } from "@/shared/resume";
import { type ComponentType } from "react";
import { useNormalizedResumeData } from "./shared";
import NextTheme from "./next";

/**
 * 动态加载简历模板组件
 *
 * @param templateId 模板ID
 * @param resumeData 简历数据
 */
export function TemplateRender({
  Template = NextTheme,
  resumeData,
  templateOptions = {},
}: {
  Template?: ComponentType<any>;
  resumeData: Resume;
  templateOptions?: Record<string, string>;
}) {
  // 规范化简历数据，添加稳定键和默认值
  const normalizedData = useNormalizedResumeData(resumeData);

  // 合并默认模板选项和用户自定义选项
  // 优先使用外部传入的templateOptions，其次使用resumeData中的templateOptions
  const mergedTemplateOptions = {
    ...(resumeData.templateOptions || {}),
    ...templateOptions,
  };

  return (
    <Template
      resumeData={normalizedData}
      templateOptions={mergedTemplateOptions}
    />
  );
}
