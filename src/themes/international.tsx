import { Show } from "@/shared";
import {
  Book,
  Calendar,
  Flag,
  Globe,
  Languages,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function InternationalTheme({
  resumeData,
  templateOptions,
}: {
  resumeData: NormalizedResume;
  templateOptions: Record<string, string>;
}) {
  const { base, blocks } = resumeData;
  const themeColor = templateOptions.themeColor || "#3F51B5";

  // 查找相关区块
  const educationBlock = blocks.find((block) => block.type === "education");
  const workBlock = blocks.find((block) => block.type === "work");
  const skillsBlock = blocks.find(
    (block) =>
      block.title?.includes("技能") ||
      block.title?.includes("专业") ||
      block.id === "skills"
  );
  const languageBlock = blocks.find(
    (block) => block.title?.includes("语言") || block.id === "languages"
  );
  const projectBlock = blocks.find((block) => block.type === "project");

  // 其他区块
  const otherBlocks = blocks.filter(
    (block) =>
      block.type !== "education" &&
      block.type !== "work" &&
      block.type !== "project" &&
      block.id !== skillsBlock?.id &&
      block.id !== languageBlock?.id
  );

  return (
    <div className="max-w-3xl mx-auto bg-white">
      {/* 国际风格头部 - 带双色边框 */}
      <header className="relative pt-6 pb-4 px-6 mb-1">
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: themeColor }}
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: themeColor }}
              >
                {base.name}
              </h1>
              <h2 className="text-base text-gray-700 font-medium">
                {base.job}
              </h2>
            </div>

            {/* 头像区域 */}
            <Show when={!!base.avatar}>
              <div
                className="w-24 h-24 overflow-hidden rounded-full border-2"
                style={{ borderColor: themeColor }}
              >
                <img
                  src={base.avatar}
                  alt={`${base.name}的头像`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Show>
          </div>

          {/* 个人信息紧凑布局，国际风格 */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-sm border-t pt-3"
            style={{ borderColor: `${themeColor}40` }}
          >
            <Show when={!!base.phone}>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" style={{ color: themeColor }} />
                <span>{base.phone}</span>
              </div>
            </Show>

            <Show when={!!base.email}>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" style={{ color: themeColor }} />
                <span className="break-all">{base.email}</span>
              </div>
            </Show>

            <Show when={!!base.location}>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" style={{ color: themeColor }} />
                <span>{base.location}</span>
              </div>
            </Show>

            <Show when={!!base.personalWebsite}>
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5" style={{ color: themeColor }} />
                <a
                  href={normalizeUrl(base.personalWebsite)}
                  className="hover:underline break-all"
                  style={{ color: themeColor }}
                >
                  {base.personalWebsite}
                </a>
              </div>
            </Show>

            <Show when={!!base.gender}>
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5" style={{ color: themeColor }} />
                <span>性别：{base.gender}</span>
              </div>
            </Show>

            <Show when={!!base.age}>
              <div className="flex items-center gap-2">
                <Calendar
                  className="h-3.5 w-3.5"
                  style={{ color: themeColor }}
                />
                <span>年龄：{base.age}岁</span>
              </div>
            </Show>

            <Show when={!!base.politicalStatus}>
              <div className="flex items-center gap-2">
                <Flag className="h-3.5 w-3.5" style={{ color: themeColor }} />
                <span>政治面貌：{base.politicalStatus}</span>
              </div>
            </Show>
          </div>
        </div>
      </header>

      <main className="px-6 py-3 space-y-4">
        {/* 双栏布局 - 左侧小，右侧大 */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* 左侧栏 - 教育背景和语言能力 */}
          <div className="w-full md:w-2/5 space-y-4">
            {/* 教育背景 */}
            <Show when={!!educationBlock}>
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <Book className="h-4 w-4" style={{ color: themeColor }} />
                  <h3
                    className="uppercase text-sm font-bold tracking-wider"
                    style={{ color: themeColor }}
                  >
                    {educationBlock?.title || "EDUCATION"}
                  </h3>
                </div>

                <hr
                  className="border-t mb-2"
                  style={{ borderColor: `${themeColor}50` }}
                />

                <div className="space-y-3">
                  {educationBlock?._itemsWithKeys?.map((edu) => (
                    <div key={edu._stableKey} className="relative pl-3 py-0.5">
                      <div
                        className="absolute top-0 left-0 bottom-0 w-0.5"
                        style={{ backgroundColor: `${themeColor}50` }}
                      />
                      <h4 className="font-bold text-sm text-gray-800">
                        {edu.school || ""}
                      </h4>
                      <div className="flex flex-col text-xs">
                        <span className="font-medium text-gray-700">
                          {edu.major || ""} | {edu.degree || ""}
                        </span>
                        <span className="text-gray-500">
                          {edu.timeRange?.start || ""} -{" "}
                          {edu.timeRange?.end || ""}
                        </span>
                      </div>

                      <div className="prose prose-xs max-w-none mt-1">
                        <Markdown>{edu.content || ""}</Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Show>

            {/* 语言能力 - 突出国际留学生特色 */}
            <Show when={!!languageBlock || !!skillsBlock}>
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <Languages
                    className="h-4 w-4"
                    style={{ color: themeColor }}
                  />
                  <h3
                    className="uppercase text-sm font-bold tracking-wider"
                    style={{ color: themeColor }}
                  >
                    {languageBlock?.title || skillsBlock?.title || "LANGUAGES"}
                  </h3>
                </div>

                <hr
                  className="border-t mb-2"
                  style={{ borderColor: `${themeColor}50` }}
                />

                {!!languageBlock?.content && (
                  <div className="prose prose-xs max-w-none mb-2">
                    <Markdown>{languageBlock.content}</Markdown>
                  </div>
                )}

                <div className="space-y-2">
                  {languageBlock?._itemsWithKeys?.map((item) => (
                    <div key={item._stableKey} className="relative pl-3 py-0.5">
                      <div
                        className="absolute top-0 left-0 bottom-0 w-0.5"
                        style={{ backgroundColor: `${themeColor}30` }}
                      />
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-medium text-sm text-gray-800">
                          {item.title || ""}
                        </h4>
                      </div>
                      <div className="prose prose-xs max-w-none">
                        <Markdown>{item.content || ""}</Markdown>
                      </div>
                    </div>
                  ))}

                  {/* 如果没有专门的语言区块，显示技能区块的内容 */}
                  {!languageBlock &&
                    skillsBlock?._itemsWithKeys?.map((item) => (
                      <div
                        key={item._stableKey}
                        className="relative pl-3 py-0.5"
                      >
                        <div
                          className="absolute top-0 left-0 bottom-0 w-0.5"
                          style={{ backgroundColor: `${themeColor}30` }}
                        />
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-medium text-sm text-gray-800">
                            {item.title || ""}
                          </h4>
                        </div>
                        <div className="prose prose-xs max-w-none">
                          <Markdown>{item.content || ""}</Markdown>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            </Show>
          </div>

          {/* 右侧栏 - 工作经验和项目经验 */}
          <div className="w-full md:w-3/5 space-y-4">
            {/* 工作经验 */}
            <Show when={!!workBlock}>
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="h-4 w-4"
                    style={{ color: themeColor }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>工作经验</title>
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <h3
                    className="uppercase text-sm font-bold tracking-wider"
                    style={{ color: themeColor }}
                  >
                    {workBlock?.title || "EXPERIENCE"}
                  </h3>
                </div>

                <hr
                  className="border-t mb-2"
                  style={{ borderColor: `${themeColor}50` }}
                />

                <div className="space-y-3">
                  {workBlock?._itemsWithKeys?.map((work) => (
                    <div key={work._stableKey} className="relative pl-3 pb-1">
                      <div
                        className="absolute top-0 left-0 bottom-0 w-0.5"
                        style={{ backgroundColor: `${themeColor}70` }}
                      />
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">
                            {work.company || ""}
                          </h4>
                          <p className="text-xs font-medium text-gray-600">
                            {work.job || ""}
                          </p>
                        </div>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${themeColor}15`,
                            color: themeColor,
                          }}
                        >
                          {work.timeRange?.start || ""} -{" "}
                          {work.timeRange?.end || ""}
                        </span>
                      </div>

                      <div className="prose prose-xs max-w-none mt-1">
                        <Markdown>{work.content || ""}</Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Show>

            {/* 项目经验 */}
            <Show when={!!projectBlock}>
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="h-4 w-4"
                    style={{ color: themeColor }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>项目经验</title>
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                    <line x1="12" y1="22" x2="12" y2="15.5" />
                    <polyline points="22 8.5 12 15.5 2 8.5" />
                    <line x1="2" y1="15.5" x2="12" y2="8.5" />
                    <line x1="22" y1="15.5" x2="12" y2="8.5" />
                  </svg>
                  <h3
                    className="uppercase text-sm font-bold tracking-wider"
                    style={{ color: themeColor }}
                  >
                    {projectBlock?.title || "PROJECTS"}
                  </h3>
                </div>

                <hr
                  className="border-t mb-2"
                  style={{ borderColor: `${themeColor}50` }}
                />

                <div className="space-y-3">
                  {projectBlock?._itemsWithKeys?.map((project) => (
                    <div
                      key={project._stableKey}
                      className="relative pl-3 pb-1"
                    >
                      <div
                        className="absolute top-0 left-0 bottom-0 w-0.5"
                        style={{ backgroundColor: `${themeColor}40` }}
                      />
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">
                            {project.name || ""}
                          </h4>
                          <p className="text-xs font-medium text-gray-600">
                            {project.job || ""}
                          </p>
                        </div>
                        {!!project.timeRange && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${themeColor}15`,
                              color: themeColor,
                            }}
                          >
                            {project.timeRange.start || ""} -{" "}
                            {project.timeRange.end || ""}
                          </span>
                        )}
                      </div>

                      <div className="prose prose-xs max-w-none mt-1">
                        <Markdown>{project.content || ""}</Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Show>
          </div>
        </div>

        {/* 其他区块 */}
        {otherBlocks.map((block) => (
          <section key={block._stableKey}>
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="h-4 w-4"
                style={{ color: themeColor }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>{block.title}</title>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
              <h3
                className="uppercase text-sm font-bold tracking-wider"
                style={{ color: themeColor }}
              >
                {block.title}
              </h3>
            </div>

            <hr
              className="border-t mb-2"
              style={{ borderColor: `${themeColor}50` }}
            />

            {!!block.content && (
              <div className="prose prose-xs max-w-none mb-2">
                <Markdown>{block.content}</Markdown>
              </div>
            )}

            {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
              <div className="space-y-2">
                {block._itemsWithKeys.map((item) => (
                  <div key={item._stableKey} className="relative pl-3 py-0.5">
                    <div
                      className="absolute top-0 left-0 bottom-0 w-0.5"
                      style={{ backgroundColor: `${themeColor}30` }}
                    />
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-sm text-gray-800">
                        {item.title || ""}
                      </h4>
                      {!!item.timeRange && (
                        <span className="text-xs text-gray-500">
                          {item.timeRange.start || ""} -{" "}
                          {item.timeRange.end || ""}
                        </span>
                      )}
                    </div>
                    <div className="prose prose-xs max-w-none">
                      <Markdown>{item.content || ""}</Markdown>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
