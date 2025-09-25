import { Show } from "@/shared";
import { Calendar, Flag, Globe, Mail, MapPin, Phone, User } from "lucide-react";
import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function ElegantTheme({
  resumeData,
}: {
  resumeData: NormalizedResume;
}) {
  const { base, blocks } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-stone-50 p-8 font-serif">
      {/* 经典风格头部 */}
      <header className="text-center mb-6 border-b-2 border-stone-300 pb-5">
        <div className="flex flex-col items-center">
          {/* 添加头像显示 */}
          <Show when={!!base.avatar}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-stone-300 mb-4">
              <img
                src={base.avatar}
                alt={`${base.name}的头像`}
                className="w-full h-full object-cover"
              />
            </div>
          </Show>

          <h1 className="text-4xl font-bold text-stone-800 tracking-tight mb-2">
            {base.name}
          </h1>
          <h2 className="text-xl text-stone-600 italic">{base.job}</h2>

          {/* 联系方式 - 精致的水平布局 */}
          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-600">
            <Show when={!!base.location}>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{base.location}</span>
              </div>
            </Show>

            <Show when={!!base.phone}>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                <span>{base.phone}</span>
              </div>
            </Show>

            <Show when={!!base.email}>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span>{base.email}</span>
              </div>
            </Show>

            <Show when={!!base.personalWebsite}>
              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                <a
                  href={normalizeUrl(base.personalWebsite)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-800 transition-colors break-all"
                >
                  {base.personalWebsite}
                </a>
              </div>
            </Show>
          </div>

          {/* 个人信息 */}
          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-600">
            <Show when={!!base.gender}>
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>性别：{base.gender}</span>
              </div>
            </Show>

            <Show when={!!base.age}>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>年龄：{base.age}岁</span>
              </div>
            </Show>

            <Show when={!!base.politicalStatus}>
              <div className="flex items-center gap-1.5">
                <Flag className="h-3.5 w-3.5" />
                <span>政治面貌：{base.politicalStatus}</span>
              </div>
            </Show>
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <div className="space-y-6">
        {blocks.map((block) => (
          <section key={block._stableKey}>
            {/* 优雅的标题设计 */}
            <div className="flex items-center mb-3">
              <h3 className="text-xl font-bold text-stone-800 uppercase tracking-wide">
                {block.title}
              </h3>
              <div className="flex-grow ml-4 h-px bg-stone-300" />
            </div>

            {/* 区块内容 */}
            {!!block.content && (
              <div
                key={`${block._stableKey}-content`}
                className="prose prose-stone prose-sm max-w-none mb-3"
              >
                <Markdown>{block.content}</Markdown>
              </div>
            )}

            {/* 区块项目列表 */}
            {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
              <div className="space-y-5">
                {block._itemsWithKeys.map((item) => (
                  <div
                    key={item._stableKey}
                    className="pb-3 break-inside-avoid"
                  >
                    <div className="mb-2">
                      <div className="flex flex-row justify-between items-baseline gap-1">
                        <div>
                          <h4 className="text-lg font-semibold text-stone-800">
                            {block.type === "education" && (item.school || "")}
                            {block.type === "work" && (item.company || "")}
                            {block.type === "project" && (item.name || "")}
                            {block.type === "honor" && (item.title || "")}
                            {block.type === "list" && (item.title || "")}
                          </h4>
                          {!!item.subtitle && (
                            <p className="text-sm text-stone-500 italic">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        {!!item.timeRange && (
                          <span className="text-sm text-stone-500 font-medium">
                            {item.timeRange.start || ""} -{" "}
                            {item.timeRange.end || ""}
                          </span>
                        )}
                      </div>
                    </div>
                    {block.type !== "honor" && (
                      <div>
                        {block.type === "education" && (
                          <div className="flex items-center text-sm mb-2 text-stone-600">
                            <span className="font-medium">
                              {item.major || ""}
                            </span>
                            {item.major && item.degree && (
                              <span className="mx-2 text-stone-400">•</span>
                            )}
                            <span>{item.degree || ""}</span>
                          </div>
                        )}

                        {(block.type === "work" ||
                          block.type === "project") && (
                          <div className="text-sm mb-2 text-stone-600">
                            <span className="font-medium">
                              {item.job || ""}
                            </span>
                          </div>
                        )}

                        <div
                          key={`${item._stableKey}-content`}
                          className="prose prose-stone prose-sm max-w-none"
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
