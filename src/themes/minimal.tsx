import { Show } from "@/shared";
import { Calendar, Flag, Globe, Mail, MapPin, Phone, User } from "lucide-react";
import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function MinimalTheme({
  resumeData,
}: {
  resumeData: NormalizedResume;
}) {
  const { base, blocks } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6">
      {/* 极简标题区域 */}
      <header className="mb-5 border-b border-gray-200 pb-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-light tracking-tight">{base.name}</h1>
            <h2 className="text-gray-500 mt-1">{base.job}</h2>
          </div>

          {/* 添加头像显示 */}
          <Show when={!!base.avatar}>
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
              <img
                src={base.avatar}
                alt={`${base.name}的头像`}
                className="w-full h-full object-cover"
              />
            </div>
          </Show>
        </div>
      </header>

      {/* 联系方式和个人信息 - 行式布局 */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm text-gray-600">
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
              className="hover:text-gray-800 transition-colors break-all"
            >
              {base.personalWebsite}
            </a>
          </div>
        </Show>

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

      {/* 内容区 */}
      <div className="space-y-5">
        {blocks.map((block) => (
          <section key={block._stableKey}>
            {/* 极简标题 */}
            <h3 className="text-lg uppercase tracking-wide font-medium mb-3 text-gray-800 border-b border-gray-200 pb-1">
              {block.title}
            </h3>

            {/* 区块内容 */}
            {!!block.content && (
              <div
                key={`${block._stableKey}-content`}
                className="prose prose-sm max-w-none mb-3"
              >
                <Markdown>{block.content}</Markdown>
              </div>
            )}

            {/* 区块项目列表 */}
            {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
              <div className="space-y-3">
                {block._itemsWithKeys.map((item) => (
                  <div key={item._stableKey} className="break-inside-avoid">
                    <div className="mb-1">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h4 className="text-base font-medium">
                            {block.type === "education" && (item.school || "")}
                            {block.type === "work" && (item.company || "")}
                            {block.type === "project" && (item.name || "")}
                            {block.type === "honor" && (item.title || "")}
                            {block.type === "list" && (item.title || "")}
                          </h4>
                        </div>
                        {!!item.timeRange && (
                          <span className="text-xs text-gray-500">
                            {item.timeRange.start || ""} -{" "}
                            {item.timeRange.end || ""}
                          </span>
                        )}
                      </div>
                      {!!item.subtitle && (
                        <p className="text-sm text-gray-500 mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                    {block.type !== "honor" && (
                      <div>
                        {block.type === "education" && (
                          <div className="flex items-center text-sm mt-1 mb-2 text-gray-600">
                            <span className="font-medium">
                              {item.major || ""}
                            </span>
                            {item.major && item.degree && (
                              <span className="mx-2">•</span>
                            )}
                            <span>{item.degree || ""}</span>
                          </div>
                        )}

                        {(block.type === "work" ||
                          block.type === "project") && (
                          <div className="text-sm mt-1 mb-2 text-gray-600">
                            <span className="font-medium">
                              {item.job || ""}
                            </span>
                          </div>
                        )}

                        <div
                          key={`${item._stableKey}-content`}
                          className="prose prose-sm max-w-none text-gray-700"
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

      {/* 底部空间 */}
      <div className="mt-8" />
    </div>
  );
}
