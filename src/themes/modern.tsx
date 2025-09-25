import { Show } from "@/shared";
import { Calendar, Flag, Globe, Mail, MapPin, Phone, User } from "lucide-react";
import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function ModernTheme({
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
          contentPadding: "p-5",
          sectionSpacing: "space-y-5",
          itemPadding: "p-3",
          itemSpacing: "space-y-3",
          headerPadding: "p-6",
        };
      case "compact":
        return {
          contentPadding: "p-2",
          sectionSpacing: "space-y-2",
          itemPadding: "p-1.5",
          itemSpacing: "space-y-1.5",
          headerPadding: "p-5",
        };
      default:
        return {
          contentPadding: "p-3",
          sectionSpacing: "space-y-3",
          itemPadding: "p-2",
          itemSpacing: "space-y-2",
          headerPadding: "p-5",
        };
    }
  };

  const layoutStyles = getLayoutStyles();

  // 动态样式
  const dynamicStyles = {
    borderColor: themeColor,
    iconColor: themeColor,
  };

  return (
    <div className="max-w-3xl mx-auto bg-white">
      {/* 现代风格头部 - 使用网格布局 */}
      <div
        className={`grid grid-cols-3 gap-3 ${layoutStyles.headerPadding} bg-slate-50`}
      >
        {/* 左侧头像和姓名 */}
        <div className="col-span-1 flex flex-col items-start">
          <Show when={!!base.avatar}>
            <div className="w-20 h-20 rounded-md overflow-hidden mb-2 shadow-md">
              <img
                src={base.avatar}
                alt={`${base.name}的头像`}
                className="w-full h-full object-cover"
              />
            </div>
          </Show>

          <h1 className="text-2xl font-bold text-slate-800">{base.name}</h1>
          <h2 className="text-base mt-0.5 text-slate-600">{base.job}</h2>
        </div>

        {/* 右侧联系方式和个人信息 */}
        <div className="col-span-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
          <Show when={!!base.location}>
            <div className="flex items-center gap-1.5">
              <MapPin
                className="h-3.5 w-3.5"
                style={{ color: dynamicStyles.iconColor }}
              />
              <span className="text-slate-700">{base.location}</span>
            </div>
          </Show>

          <Show when={!!base.phone}>
            <div className="flex items-center gap-1.5">
              <Phone
                className="h-3.5 w-3.5"
                style={{ color: dynamicStyles.iconColor }}
              />
              <span className="text-slate-700">{base.phone}</span>
            </div>
          </Show>

          <Show when={!!base.email}>
            <div className="flex items-center gap-1.5">
              <Mail
                className="h-3.5 w-3.5"
                style={{ color: dynamicStyles.iconColor }}
              />
              <span className="text-slate-700 break-all">{base.email}</span>
            </div>
          </Show>

          <Show when={!!base.personalWebsite}>
            <div className="flex items-center gap-1.5">
              <Globe
                className="h-3.5 w-3.5"
                style={{ color: dynamicStyles.iconColor }}
              />
              <a
                href={normalizeUrl(base.personalWebsite)}
                className="text-slate-700 hover:text-sky-600 transition-colors break-all"
              >
                {base.personalWebsite}
              </a>
            </div>
          </Show>

          <Show when={!!base.gender}>
            <div className="flex items-center gap-1.5">
              <User
                className="h-3.5 w-3.5"
                style={{ color: dynamicStyles.iconColor }}
              />
              <span className="text-slate-700">性别：{base.gender}</span>
            </div>
          </Show>

          <Show when={!!base.age}>
            <div className="flex items-center gap-1.5">
              <Calendar
                className="h-3.5 w-3.5"
                style={{ color: dynamicStyles.iconColor }}
              />
              <span className="text-slate-700">年龄：{base.age}岁</span>
            </div>
          </Show>

          <Show when={!!base.politicalStatus}>
            <div className="flex items-center gap-1.5">
              <Flag
                className="h-3.5 w-3.5"
                style={{ color: dynamicStyles.iconColor }}
              />
              <span className="text-slate-700">
                政治面貌：{base.politicalStatus}
              </span>
            </div>
          </Show>
        </div>
      </div>

      {/* 主体内容 */}
      <div
        className={`${layoutStyles.contentPadding} ${layoutStyles.sectionSpacing}`}
      >
        {blocks.map((block) => (
          <section
            key={block._stableKey}
            className="border-l-3 pl-3 py-1"
            style={{ borderColor: dynamicStyles.borderColor }}
          >
            {/* 现代风格的标题 */}
            <h3 className="text-base font-bold text-slate-800 mb-2">
              {block.title}
            </h3>

            {/* 区块内容 */}
            {!!block.content && (
              <div
                key={`${block._stableKey}-content`}
                className="prose prose-slate prose-xs max-w-none mb-2"
              >
                <Markdown>{block.content}</Markdown>
              </div>
            )}

            {/* 区块项目列表 */}
            {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
              <div className={layoutStyles.itemSpacing}>
                {block._itemsWithKeys.map((item, index) => (
                  <div
                    key={item._stableKey}
                    className={`relative rounded border ${
                      index % 2 === 0 ? "bg-slate-50" : "bg-white"
                    } border-slate-100 break-inside-avoid ${
                      layoutStyles.itemPadding
                    }`}
                  >
                    <div className="mb-1.5">
                      <div className="flex flex-row items-baseline justify-between gap-1">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {block.type === "education" && (item.school || "")}
                            {block.type === "work" && (item.company || "")}
                            {block.type === "project" && (item.name || "")}
                            {block.type === "honor" && (item.title || "")}
                            {block.type === "list" && (item.title || "")}
                          </h4>
                          {!!item.subtitle && (
                            <p className="text-xs text-slate-500">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        {!!item.timeRange && (
                          <div
                            className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: `${themeColor}15`,
                              color: themeColor,
                            }}
                          >
                            {item.timeRange.start || ""} -{" "}
                            {item.timeRange.end || ""}
                          </div>
                        )}
                      </div>
                    </div>
                    {block.type !== "honor" && (
                      <div>
                        {block.type === "education" && (
                          <div className="flex items-center text-xs mb-1.5 text-slate-600 font-medium">
                            <span>{item.major || ""}</span>
                            {item.major && item.degree && (
                              <span className="mx-1.5 text-slate-300">•</span>
                            )}
                            <span>{item.degree || ""}</span>
                          </div>
                        )}

                        {(block.type === "work" ||
                          block.type === "project") && (
                          <div className="text-xs mb-1.5 text-slate-600 font-medium">
                            <span>{item.job || ""}</span>
                          </div>
                        )}

                        <div
                          key={`${item._stableKey}-content`}
                          className="prose prose-slate prose-xs max-w-none text-sm"
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
