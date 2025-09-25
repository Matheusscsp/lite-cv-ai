import type { Block, Resume } from "../shared/resume";
import { useMemo } from "react";

// 生成稳定唯一的键
export function generateStableKey(
  prefix: string,
  value: string | undefined,
  fallback: string
): string {
  if (value) return `${prefix}-${value}`;
  return `${prefix}-${fallback}`;
}

// 处理URL，确保以http开头
export function normalizeUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://${url}`;
}

// 扩展类型，添加稳定key等字段
export type BlockWithStableKeys = Block & {
  _stableKey: string;
  _itemsWithKeys: any[];
};

export interface NormalizedResume {
  base: {
    name: string;
    gender: string;
    age: number | null;
    phone: string;
    location: string;
    politicalStatus: string;
    email: string;
    job: string;
    avatar: string;
    personalWebsite: string;
  };
  blocks: BlockWithStableKeys[];
  font: string;
}

// 预处理简历数据，添加稳定key，并确保所有字段都有默认值
export function useNormalizedResumeData(resumeData: Resume): NormalizedResume {
  return useMemo(() => {
    // 确保base对象有所有必要的字段
    const normalizedBase = {
      name: resumeData?.base?.name || "姓名",
      gender: resumeData?.base?.gender || "",
      age: resumeData?.base?.age || null,
      phone: resumeData?.base?.phone || "",
      location: resumeData?.base?.location || "",
      politicalStatus: resumeData?.base?.politicalStatus || "",
      email: resumeData?.base?.email || "",
      job: resumeData?.base?.job || "意向职位",
      avatar: resumeData?.base?.avatar || "",
      personalWebsite: resumeData?.base?.personalWebsite || "",
    };

    // 处理blocks，添加稳定key
    const blocksWithStableKeys = (resumeData?.blocks || []).map(
      (block, index) => {
        // 确保每个block有一个稳定的唯一key
        const blockKey =
          block?.id || generateStableKey("block", block?.title, `idx-${index}`);

        // 如果block有items，也为每个item生成稳定的key
        const itemsWithKeys =
          block?.items?.map((item, itemIndex) => {
            let itemIdentifier: string;

            // 根据block类型选择最适合作为标识符的字段
            if (block?.type === "education") {
              itemIdentifier = item?.school || "";
            } else if (block?.type === "work") {
              itemIdentifier = item?.company || "";
            } else if (block?.type === "project") {
              itemIdentifier = item?.name || "";
            } else if (block?.type === "honor" || block?.type === "list") {
              itemIdentifier = item?.title || "";
            } else {
              itemIdentifier = "";
            }

            // 使用时间范围(如果有)增强唯一性
            const timeIdentifier = item?.timeRange
              ? `${item.timeRange.start || ""}-${item.timeRange.end || ""}`
              : "";

            // 生成稳定的item key
            const itemKey =
              item?.id ||
              generateStableKey(
                `${blockKey}-item`,
                `${itemIdentifier}-${timeIdentifier}`,
                `idx-${itemIndex}`
              );

            return { ...item, _stableKey: itemKey };
          }) || [];

        return {
          ...block,
          title: block?.title || "",
          content: block?.content || "",
          _stableKey: blockKey,
          _itemsWithKeys: itemsWithKeys,
        };
      }
    );

    return {
      base: normalizedBase,
      blocks: blocksWithStableKeys,
      font: resumeData?.font || "",
    };
  }, [resumeData]);
}
