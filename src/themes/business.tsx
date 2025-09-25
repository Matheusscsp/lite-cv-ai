import { Show } from "@/shared";
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  ChevronRight,
  Flag,
  Globe,
  Mail,
  MapPin,
  Phone,
  Target,
  User,
} from "lucide-react";
import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function BusinessTheme({
  resumeData,
  templateOptions,
}: {
  resumeData: NormalizedResume;
  templateOptions: Record<string, string>;
}) {
  const { base, blocks } = resumeData;
  const themeColor = templateOptions.themeColor || "#0A66C2";

  // 商务风格适合将工作经验放在最前面，重点突出职业成就
  const workBlock = blocks.find((block) => block.type === "work");
  const skillsBlock = blocks.find(
    (block) =>
      block.title?.includes("技能") ||
      block.title?.includes("专业") ||
      block.id === "skills"
  );
  const projectBlock = blocks.find((block) => block.type === "project");
  const educationBlock = blocks.find((block) => block.type === "education");

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
      {/* 商务风格头部 - 专业紧凑 */}
      <header className="relative">
        {/* 顶部装饰条 */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: themeColor }}
        />

        <div className="pt-6 px-6 pb-4">
          <div className="flex flex-row justify-between items-start">
            <div>
              <h1
                className="text-xl font-bold tracking-tight"
                style={{ color: themeColor }}
              >
                {base.name}
              </h1>
              <h2 className="text-base font-medium text-gray-700 mt-0.5 uppercase tracking-wide">
                {base.job}
              </h2>

              {/* 个人信息 - 商务风格紧凑布局 */}
              <div className="grid grid-cols-2 gap-y-1 gap-x-4 mt-3 text-sm">
                <Show when={!!base.phone}>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-gray-500" />
                    <span>{base.phone}</span>
                  </div>
                </Show>

                <Show when={!!base.email}>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-gray-500" />
                    <span className="break-all">{base.email}</span>
                  </div>
                </Show>

                <Show when={!!base.location}>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gray-500" />
                    <span>{base.location}</span>
                  </div>
                </Show>

                <Show when={!!base.personalWebsite}>
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-gray-500" />
                    <a
                      href={normalizeUrl(base.personalWebsite)}
                      className="hover:underline break-all"
                    >
                      {base.personalWebsite}
                    </a>
                  </div>
                </Show>
              </div>
            </div>

            {/* 头像区域 */}
            <Show when={!!base.avatar}>
              <div
                className="w-24 h-24 overflow-hidden rounded-full border-2 shadow-sm"
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
        </div>

        {/* 额外信息条 - 商务风格 */}
        <div
          className="text-white text-xs py-2 px-6 flex gap-5 justify-center items-center"
          style={{ backgroundColor: themeColor }}
        >
          <Show when={!!base.gender}>
            <div className="flex items-center gap-1.5">
              <User className="h-3 w-3 opacity-80" />
              <span>性别：{base.gender}</span>
            </div>
          </Show>

          <Show when={!!base.age}>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 opacity-80" />
              <span>年龄：{base.age}岁</span>
            </div>
          </Show>

          <Show when={!!base.politicalStatus}>
            <div className="flex items-center gap-1.5">
              <Flag className="h-3 w-3 opacity-80" />
              <span>政治面貌：{base.politicalStatus}</span>
            </div>
          </Show>
        </div>
      </header>

      <div className="p-6 space-y-5">
        {/* 1. 工作经验 - 商务简历最重要的部分 */}
        <Show when={!!workBlock}>
          <section>
            <div className="flex items-center mb-3">
              <Briefcase
                className="h-4 w-4 mr-2"
                style={{ color: themeColor }}
                aria-hidden="true"
              />
              <h3
                className="text-base font-bold uppercase tracking-wider"
                style={{ color: themeColor }}
              >
                {workBlock?.title || "职业经历"}
              </h3>
            </div>

            <div className="space-y-4">
              {workBlock?._itemsWithKeys?.map((work) => (
                <div
                  key={work._stableKey}
                  className=""
                  style={{ borderColor: themeColor }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-gray-400" />
                        <h4 className="font-bold text-gray-800">
                          {work.company || ""}
                        </h4>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mt-0.5 mb-1">
                        {work.job || ""}
                      </p>
                    </div>
                    <div
                      className="text-xs px-2 py-1 rounded-sm font-medium flex items-center"
                      style={{
                        backgroundColor: `${themeColor}15`,
                        color: themeColor,
                      }}
                    >
                      {work.timeRange?.start || ""} -{" "}
                      {work.timeRange?.end || ""}
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none mt-2">
                    <Markdown>{work.content || ""}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Show>

        {/* 2. 专业技能 - 商务简历简洁展示核心能力 */}
        <Show when={!!skillsBlock}>
          <section>
            <div className="flex items-center mb-3">
              <Target
                className="h-4 w-4 mr-2"
                style={{ color: themeColor }}
                aria-hidden="true"
              />
              <h3
                className="text-base font-bold uppercase tracking-wider"
                style={{ color: themeColor }}
              >
                {skillsBlock?.title || "专业技能"}
              </h3>
            </div>

            {!!skillsBlock?.content && (
              <div
                className="prose prose-sm max-w-none mb-3 "
                style={{ borderColor: `${themeColor}40` }}
              >
                <Markdown>{skillsBlock.content}</Markdown>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {skillsBlock?._itemsWithKeys?.map((skill) => (
                <div
                  key={skill._stableKey}
                  className=""
                  style={{ borderColor: `${themeColor}40` }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <ChevronRight
                      className="h-3.5 w-3.5"
                      style={{ color: themeColor }}
                      aria-hidden="true"
                    />
                    <h4 className="font-semibold text-sm">
                      {skill.title || ""}
                    </h4>
                  </div>
                  <div className="prose prose-sm max-w-none pl-5">
                    <Markdown>{skill.content || ""}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Show>

        {/* 3. 项目经验 - 商务风格强调成果和影响 */}
        <Show when={!!projectBlock}>
          <section>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
                aria-hidden="true"
                style={{ color: themeColor }}
              >
                <title>项目图标</title>
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <line x1="22" y1="8.5" x2="12" y2="15.5" />
                <line x1="2" y1="8.5" x2="12" y2="15.5" />
              </svg>
              <h3
                className="text-base font-bold uppercase tracking-wider"
                style={{ color: themeColor }}
              >
                {projectBlock?.title || "项目经验"}
              </h3>
            </div>

            <div className="space-y-4">
              {projectBlock?._itemsWithKeys?.map((project) => (
                <div
                  key={project._stableKey}
                  className=""
                  style={{ borderColor: `${themeColor}60` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {project.name || ""}
                      </h4>
                      <p className="text-sm font-medium text-gray-600 mt-0.5 mb-1">
                        {project.job || ""}
                      </p>
                    </div>
                    {!!project.timeRange && (
                      <div
                        className="text-xs px-2 py-1 rounded-sm font-medium"
                        style={{
                          backgroundColor: `${themeColor}15`,
                          color: themeColor,
                        }}
                      >
                        {project.timeRange.start || ""} -{" "}
                        {project.timeRange.end || ""}
                      </div>
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

        {/* 4. 教育背景 - 商务简历简洁展示 */}
        <Show when={!!educationBlock}>
          <section>
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
                aria-hidden="true"
                style={{ color: themeColor }}
              >
                <title>教育图标</title>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
              <h3
                className="text-base font-bold uppercase tracking-wider"
                style={{ color: themeColor }}
              >
                {educationBlock?.title || "教育背景"}
              </h3>
            </div>

            <div className="space-y-3">
              {educationBlock?._itemsWithKeys?.map((edu) => (
                <div
                  key={edu._stableKey}
                  className=""
                  style={{ borderColor: `${themeColor}40` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {edu.school || ""}
                      </h4>
                      <p className="text-sm text-gray-700 mt-0.5 mb-1">
                        <span className="font-medium">{edu.major || ""}</span>
                        {edu.major && edu.degree && (
                          <span className="mx-1">•</span>
                        )}
                        <span>{edu.degree || ""}</span>
                      </p>
                    </div>
                    {!!edu.timeRange && (
                      <div
                        className="text-xs px-2 py-1 rounded-sm font-medium"
                        style={{
                          backgroundColor: `${themeColor}15`,
                          color: themeColor,
                        }}
                      >
                        {edu.timeRange.start || ""} - {edu.timeRange.end || ""}
                      </div>
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

        {/* 5. 其他区块 */}
        {otherBlocks.map((block) => (
          <section key={block._stableKey}>
            <div className="flex items-center mb-3">
              <Award
                className="h-4 w-4 mr-2"
                style={{ color: themeColor }}
                aria-hidden="true"
              />
              <h3
                className="text-base font-bold uppercase tracking-wider"
                style={{ color: themeColor }}
              >
                {block.title}
              </h3>
            </div>

            {!!block.content && (
              <div
                className="prose prose-sm max-w-none mb-3 "
                style={{ borderColor: `${themeColor}40` }}
              >
                <Markdown>{block.content}</Markdown>
              </div>
            )}

            {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
              <div className="space-y-3">
                {block._itemsWithKeys.map((item) => (
                  <div
                    key={item._stableKey}
                    className=""
                    style={{ borderColor: `${themeColor}40` }}
                  >
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-gray-800">
                        {item.title || ""}
                      </h4>
                      {!!item.timeRange && (
                        <span className="text-xs text-gray-500">
                          {item.timeRange.start || ""} -{" "}
                          {item.timeRange.end || ""}
                        </span>
                      )}
                    </div>
                    <div className="prose prose-sm max-w-none mt-1.5">
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
