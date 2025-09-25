import { Show } from "@/shared";
import { Calendar, Flag, Globe, Mail, MapPin, Phone, User } from "lucide-react";

import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function ProfessionalTheme({
  resumeData,
  templateOptions,
}: {
  resumeData: NormalizedResume;
  templateOptions: Record<string, string>;
}) {
  const { base, blocks } = resumeData;
  const themeColor = templateOptions.themeColor || "#1D3A8A";
  const layout = templateOptions.layout || "normal";

  // 根据布局选项设置不同的内边距和间距
  const getLayoutStyles = () => {
    switch (layout) {
      case "loose":
        return {
          contentPadding: "p-6",
          sectionSpacing: "space-y-6",
          headerPadding: "p-6",
          itemPadding: "p-4",
          itemSpacing: "space-y-4",
        };
      case "compact":
        return {
          contentPadding: "p-4",
          sectionSpacing: "space-y-3",
          headerPadding: "p-6",
          itemPadding: "p-2.5",
          itemSpacing: "space-y-2.5",
        };
      default:
        return {
          contentPadding: "p-4",
          sectionSpacing: "space-y-4",
          headerPadding: "p-6",
          itemPadding: "p-3",
          itemSpacing: "space-y-3",
        };
    }
  };

  const layoutStyles = getLayoutStyles();

  // 根据主题色生成相关颜色
  const getColorStyles = () => {
    return {
      primary: themeColor,
      secondary: `${themeColor}15`,
      iconColor: themeColor
        .replace(/^#/, "#")
        .replace(/([0-9a-f]{6})$/i, "80$1"),
      headerBg: themeColor,
      headerText: "#ffffff",
    };
  };

  const colorStyles = getColorStyles();

  return (
    <div className="max-w-3xl mx-auto bg-white">
      {/* 商务风格头部 */}
      <header
        className={`text-white ${layoutStyles.headerPadding}`}
        style={{ backgroundColor: colorStyles.headerBg }}
      >
        <div className="flex flex-row justify-between items-end gap-3">
          <div className="flex items-center gap-3">
            {/* 添加头像显示 */}
            <Show when={!!base.avatar}>
              <div className="w-20 h-20 rounded-md overflow-hidden border border-white">
                <img
                  src={base.avatar}
                  alt={`${base.name}的头像`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Show>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">{base.name}</h1>
              <h2 className="text-base opacity-90 mt-0.5">{base.job}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <Show when={!!base.phone}>
              <div className="flex items-center gap-1.5">
                <Phone
                  className="h-3.5 w-3.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                />
                <span>{base.phone}</span>
              </div>
            </Show>

            <Show when={!!base.email}>
              <div className="flex items-center gap-1.5">
                <Mail
                  className="h-3.5 w-3.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                />
                <span className="break-all">{base.email}</span>
              </div>
            </Show>

            <Show when={!!base.location}>
              <div className="flex items-center gap-1.5">
                <MapPin
                  className="h-3.5 w-3.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                />
                <span>{base.location}</span>
              </div>
            </Show>

            <Show when={!!base.personalWebsite}>
              <div className="flex items-center gap-1.5">
                <Globe
                  className="h-3.5 w-3.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                />
                <a
                  href={normalizeUrl(base.personalWebsite)}
                  className="hover:text-white hover:underline transition-colors break-all"
                >
                  {base.personalWebsite}
                </a>
              </div>
            </Show>
          </div>
        </div>
      </header>

      {/* 附加个人信息栏 */}
      <div className="bg-gray-100 p-2 flex justify-center gap-x-5 gap-y-1 text-xs text-gray-600 flex-wrap">
        <Show when={!!base.gender}>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" style={{ color: colorStyles.primary }} />
            <span>性别：{base.gender}</span>
          </div>
        </Show>

        <Show when={!!base.age}>
          <div className="flex items-center gap-1">
            <Calendar
              className="h-3 w-3"
              style={{ color: colorStyles.primary }}
            />
            <span>年龄：{base.age}岁</span>
          </div>
        </Show>

        <Show when={!!base.politicalStatus}>
          <div className="flex items-center gap-1">
            <Flag className="h-3 w-3" style={{ color: colorStyles.primary }} />
            <span>政治面貌：{base.politicalStatus}</span>
          </div>
        </Show>
      </div>

      {/* 商务风格主体内容 */}
      <div
        className={`${layoutStyles.contentPadding} ${layoutStyles.sectionSpacing}`}
      >
        {blocks.map((block) => (
          <section key={block._stableKey}>
            {/* 商务风格的标题 */}
            <h3
              className="text-base font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{
                color: colorStyles.primary,
                borderColor: colorStyles.primary,
              }}
            >
              {block.title}
            </h3>

            {/* 区块内容 */}
            {!!block.content && (
              <div
                key={`${block._stableKey}-content`}
                className="prose prose-xs max-w-none mb-2"
              >
                <Markdown>{block.content}</Markdown>
              </div>
            )}

            {/* 区块项目列表 */}
            {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
              <div className={layoutStyles.itemSpacing}>
                {block._itemsWithKeys.map((item) => (
                  <div
                    key={item._stableKey}
                    className={`shadow-sm border border-gray-100 rounded break-inside-avoid ${layoutStyles.itemPadding}`}
                  >
                    <div className="mb-1.5">
                      <div className="flex flex-row justify-between items-baseline gap-1">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">
                            {block.type === "education" && (item.school || "")}
                            {block.type === "work" && (item.company || "")}
                            {block.type === "project" && (item.name || "")}
                            {block.type === "honor" && (item.title || "")}
                            {block.type === "list" && (item.title || "")}
                          </h4>
                          {!!item.subtitle && (
                            <p className="text-xs text-gray-500">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        {!!item.timeRange && (
                          <span
                            className="inline-flex text-[10px] px-2 py-0.5 rounded font-medium"
                            style={{
                              backgroundColor: colorStyles.secondary,
                              color: colorStyles.primary,
                            }}
                          >
                            {item.timeRange.start || ""} -{" "}
                            {item.timeRange.end || ""}
                          </span>
                        )}
                      </div>
                    </div>
                    {block.type !== "honor" && (
                      <div>
                        {block.type === "education" && (
                          <div className="flex items-center text-xs mb-1.5 text-gray-700 bg-gray-50 px-2 py-0.5 rounded-sm">
                            <span className="font-medium">
                              {item.major || ""}
                            </span>
                            {item.major && item.degree && (
                              <span className="mx-1.5 text-gray-400">•</span>
                            )}
                            <span>{item.degree || ""}</span>
                          </div>
                        )}

                        {(block.type === "work" ||
                          block.type === "project") && (
                          <div className="text-xs mb-1.5 text-gray-700 bg-gray-50 px-2 py-0.5 rounded-sm inline-block">
                            <span className="font-medium">
                              {item.job || ""}
                            </span>
                          </div>
                        )}

                        <div
                          key={`${item._stableKey}-content`}
                          className="prose prose-xs max-w-none mt-1.5 text-sm"
                        >
                          <Markdown>{item.content || ""}</Markdown>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
