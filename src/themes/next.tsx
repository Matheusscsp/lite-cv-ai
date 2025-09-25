import { Show } from "@/shared";
import { Calendar, Flag, Globe, Mail, MapPin, Phone, User } from "lucide-react";
import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function NextTheme({
  resumeData,
}: {
  resumeData: NormalizedResume;
}) {
  const { base, blocks } = resumeData;

  return (
    <div className="max-w-3xl mx-auto p-5 space-y-4">
      {/* 简历头部 */}
      <header className="mb-5">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {base.name}
            </h1>
            <h2 className="text-lg text-gray-600 font-medium mb-3">
              {base.job}
            </h2>

            {/* 个人信息区域 - 横向flex紧凑布局 */}
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Show when={!!base.location}>
                <div
                  key="location"
                  className="flex items-center text-sm text-gray-600 gap-1.5"
                >
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span>{base.location}</span>
                </div>
              </Show>

              <Show when={!!base.gender}>
                <div
                  key="gender"
                  className="flex items-center text-sm text-gray-600 gap-1.5"
                >
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  <span>性别：{base.gender}</span>
                </div>
              </Show>

              <Show when={!!base.age}>
                <div
                  key="age"
                  className="flex items-center text-sm text-gray-600 gap-1.5"
                >
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  <span>年龄：{base.age}岁</span>
                </div>
              </Show>

              <Show when={!!base.phone}>
                <div
                  key="phone"
                  className="flex items-center text-sm text-gray-600 gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                  <span>{base.phone}</span>
                </div>
              </Show>

              <Show when={!!base.email}>
                <div
                  key="email"
                  className="flex items-center text-sm text-gray-600 gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  <span>{base.email}</span>
                </div>
              </Show>

              <Show when={!!base.politicalStatus}>
                <div
                  key="politicalStatus"
                  className="flex items-center text-sm text-gray-600 gap-1.5"
                >
                  <Flag className="h-3.5 w-3.5 text-gray-400" />
                  <span>政治面貌：{base.politicalStatus}</span>
                </div>
              </Show>

              <Show when={!!base.personalWebsite}>
                <div
                  key="personalWebsite"
                  className="flex items-center text-sm text-gray-600 gap-1.5"
                >
                  <Globe className="h-3.5 w-3.5 text-gray-400" />
                  <a
                    href={normalizeUrl(base.personalWebsite)}
                    className="break-all"
                  >
                    {base.personalWebsite}
                  </a>
                </div>
              </Show>
            </div>
          </div>

          {/* 头像占位 */}
          <Show when={!!base.avatar}>
            <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src={base.avatar}
                alt={`${base.name}的头像`}
                className="w-full h-full object-cover"
              />
            </div>
          </Show>
        </div>
      </header>

      {/* 内容块 */}
      <div className="space-y-4">
        {blocks.map((block) => (
          <section key={block._stableKey}>
            <h3 className="text-lg font-semibold text-gray-900 pb-1 border-b mb-2">
              {block.title}
            </h3>

            {/* 使用Fragment包裹Show来避免key警告 */}
            {!!block.content && (
              <div
                key={`${block._stableKey}-content`}
                className="prose prose-sm max-w-none mb-3"
              >
                <Markdown>{block.content}</Markdown>
              </div>
            )}

            {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
              <div className="space-y-3">
                {block._itemsWithKeys.map((item) => (
                  <div key={item._stableKey} className="">
                    <div className="mb-1">
                      <div className="flex flex-row justify-between items-baseline gap-1">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">
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
                          <span className="text-xs text-gray-500">
                            {item.timeRange.start || ""} -{" "}
                            {item.timeRange.end || ""}
                          </span>
                        )}
                      </div>
                    </div>
                    {block.type !== "honor" && (
                      <div>
                        {block.type === "education" && (
                          <div className="text-sm mb-1 text-gray-600">
                            <span className="font-medium">
                              {item.major || ""}
                            </span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span>{item.degree || ""}</span>
                          </div>
                        )}

                        {(block.type === "work" ||
                          block.type === "project") && (
                          <div className="text-sm mb-1 text-gray-600">
                            <span className="font-medium">
                              {item.job || ""}
                            </span>
                          </div>
                        )}

                        <div
                          key={`${item._stableKey}-content`}
                          className="prose prose-sm max-w-none"
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
