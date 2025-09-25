import { Show } from "@/shared";
import {
  Award,
  BookOpen,
  Calendar,
  Flag,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function FreshGradTheme({
  resumeData,
  templateOptions,
}: {
  resumeData: NormalizedResume;
  templateOptions: Record<string, string>;
}) {
  const { base, blocks } = resumeData;
  const themeColor = templateOptions.themeColor || "#4CAF50";

  // 查找教育背景和实习/项目经验区块
  const educationBlock = blocks.find((block) => block.type === "education");
  const workBlock = blocks.find((block) => block.type === "work");
  const projectBlock = blocks.find((block) => block.type === "project");
  const skillsBlock = blocks.find(
    (block) =>
      block.title?.includes("技能") ||
      block.title?.includes("专业") ||
      block.id === "skills"
  );

  // 其他区块
  const otherBlocks = blocks.filter(
    (block) =>
      block.type !== "education" &&
      block.type !== "work" &&
      block.type !== "project" &&
      block.id !== skillsBlock?.id
  );

  return (
    <div className="max-w-3xl mx-auto bg-white">
      {/* 应届生风格头部 - 使用活力色彩 */}
      <header
        className="py-4 px-5 border-b-2"
        style={{ borderColor: themeColor }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: themeColor }}
            >
              {base.name}
            </h1>
            <h2 className="text-base text-gray-700 mt-1 font-medium">
              {base.job}
            </h2>

            {/* 个人信息 - 紧凑网格布局 */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-3 text-sm">
              <Show when={!!base.phone}>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-gray-500" />
                  <span>{base.phone}</span>
                </div>
              </Show>

              <Show when={!!base.email}>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-500" />
                  <span className="break-all">{base.email}</span>
                </div>
              </Show>

              <Show when={!!base.location}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-500" />
                  <span>{base.location}</span>
                </div>
              </Show>

              <Show when={!!base.personalWebsite}>
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-gray-500" />
                  <a
                    href={normalizeUrl(base.personalWebsite)}
                    className="hover:underline break-all"
                  >
                    {base.personalWebsite}
                  </a>
                </div>
              </Show>

              <Show when={!!base.gender}>
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-gray-500" />
                  <span>性别：{base.gender}</span>
                </div>
              </Show>

              <Show when={!!base.age}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  <span>年龄：{base.age}岁</span>
                </div>
              </Show>

              <Show when={!!base.politicalStatus}>
                <div className="flex items-center gap-2">
                  <Flag className="h-3.5 w-3.5 text-gray-500" />
                  <span>政治面貌：{base.politicalStatus}</span>
                </div>
              </Show>
            </div>
          </div>

          {/* 头像区域 */}
          <Show when={!!base.avatar}>
            <div
              className="w-24 h-24 overflow-hidden rounded-lg border-2"
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
      </header>

      <div className="p-5 space-y-4">
        {/* 1. 教育背景区块 - 使用特殊样式突出显示 */}
        <Show when={!!educationBlock}>
          <section>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap
                className="w-5 h-5"
                style={{ color: themeColor }}
              />
              <h3
                className="text-lg font-bold border-b pb-1"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {educationBlock?.title || "教育背景"}
              </h3>
            </div>

            <div className="space-y-3">
              {educationBlock?._itemsWithKeys?.map((edu) => (
                <div
                  key={edu._stableKey}
                  className=""
                  style={{ borderColor: themeColor }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-800">
                        {edu.school || ""}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="h-3.5 w-3.5 text-gray-400" />
                        <span className="font-medium">{edu.major || ""}</span>
                        <span className="text-gray-400">•</span>
                        <span>{edu.degree || ""}</span>
                      </div>
                    </div>
                    {!!edu.timeRange && (
                      <span
                        className="text-xs px-2 py-1 rounded font-medium"
                        style={{
                          backgroundColor: `${themeColor}15`,
                          color: themeColor,
                        }}
                      >
                        {edu.timeRange.start || ""} - {edu.timeRange.end || ""}
                      </span>
                    )}
                  </div>

                  <div className="prose prose-sm max-w-none mt-2">
                    <Markdown>{edu.content || ""}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Show>

        {/* 2. 技能区块 - 紧凑布局 */}
        <Show when={!!skillsBlock}>
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5" style={{ color: themeColor }} />
              <h3
                className="text-lg font-bold border-b pb-1"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {skillsBlock?.title || "专业技能"}
              </h3>
            </div>

            {!!skillsBlock?.content && (
              <div className="prose prose-sm max-w-none mb-2">
                <Markdown>{skillsBlock.content}</Markdown>
              </div>
            )}

            <div className="grid grid-cols-1 gap-2 pl-2">
              {skillsBlock?._itemsWithKeys?.map((skill) => (
                <div
                  key={skill._stableKey}
                  className=" py-1"
                  style={{ borderColor: `${themeColor}80` }}
                >
                  <h4 className="text-sm font-medium text-gray-800 mb-1">
                    {skill.title || ""}
                  </h4>
                  <div className="prose prose-sm max-w-none">
                    <Markdown>{skill.content || ""}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Show>

        {/* 3. 工作/实习经验区块 */}
        <Show when={!!workBlock}>
          <section>
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5"
                style={{ color: themeColor }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>实习/工作经验</title>
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <h3
                className="text-lg font-bold border-b pb-1"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {workBlock?.title || "实习/工作经验"}
              </h3>
            </div>

            <div className="space-y-3">
              {workBlock?._itemsWithKeys?.map((work) => (
                <div
                  key={work._stableKey}
                  className=""
                  style={{ borderColor: `${themeColor}60` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-800">
                        {work.company || ""}
                      </h4>
                      <p className="text-sm font-medium text-gray-600">
                        {work.job || ""}
                      </p>
                    </div>
                    {!!work.timeRange && (
                      <span
                        className="text-xs px-2 py-1 rounded font-medium"
                        style={{
                          backgroundColor: `${themeColor}15`,
                          color: themeColor,
                        }}
                      >
                        {work.timeRange.start || ""} -{" "}
                        {work.timeRange.end || ""}
                      </span>
                    )}
                  </div>

                  <div className="prose prose-sm max-w-none mt-2">
                    <Markdown>{work.content || ""}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Show>

        {/* 4. 项目经验区块 */}
        <Show when={!!projectBlock}>
          <section>
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5"
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
                className="text-lg font-bold border-b pb-1"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {projectBlock?.title || "项目经验"}
              </h3>
            </div>

            <div className="space-y-3">
              {projectBlock?._itemsWithKeys?.map((project) => (
                <div
                  key={project._stableKey}
                  className=""
                  style={{ borderColor: `${themeColor}40` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-800">
                        {project.name || ""}
                      </h4>
                      <p className="text-sm font-medium text-gray-600">
                        {project.job || ""}
                      </p>
                    </div>
                    {!!project.timeRange && (
                      <span
                        className="text-xs px-2 py-1 rounded font-medium"
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

                  <div className="prose prose-sm max-w-none mt-2">
                    <Markdown>{project.content || ""}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Show>

        {/* 5. 其他区块 */}
        {otherBlocks.map((block) => (
          <section key={block._stableKey}>
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5"
                style={{ color: themeColor }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>{block.title}</title>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <h3
                className="text-lg font-bold border-b pb-1"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {block.title}
              </h3>
            </div>

            {!!block.content && (
              <div
                key={`${block._stableKey}-content`}
                className="prose prose-sm max-w-none mb-2"
              >
                <Markdown>{block.content}</Markdown>
              </div>
            )}

            {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
              <div className="space-y-2 pl-2">
                {block._itemsWithKeys.map((item) => (
                  <div
                    key={item._stableKey}
                    className=" py-1"
                    style={{ borderColor: `${themeColor}30` }}
                  >
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-medium text-gray-800">
                        {item.title || ""}
                      </h4>
                      {!!item.timeRange && (
                        <span className="text-xs text-gray-500">
                          {item.timeRange.start || ""} -{" "}
                          {item.timeRange.end || ""}
                        </span>
                      )}
                    </div>
                    <div className="prose prose-sm max-w-none mt-1">
                      <Markdown>{item.content || ""}</Markdown>
                    </div>
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
