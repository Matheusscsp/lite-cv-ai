import { Show } from "@/shared";
import {
  Award,
  Briefcase,
  Calendar,
  Code,
  Flag,
  Globe,
  Layers,
  Mail,
  MapPin,
  Phone,
  Server,
  User,
} from "lucide-react";
import Markdown from "../shared/markdown";
import { type NormalizedResume, normalizeUrl } from "./shared";

export default function SeniorTechTheme({
  resumeData,
  templateOptions,
}: {
  resumeData: NormalizedResume;
  templateOptions: Record<string, string>;
}) {
  const { base, blocks } = resumeData;
  const themeColor = templateOptions.themeColor || "#546E7A";
  const density = templateOptions.density || "high";

  // 按照技术专家简历逻辑整理区块顺序
  const skillsBlock = blocks.find(
    (block) =>
      block.title?.includes("技能") ||
      block.title?.includes("专业") ||
      block.id === "skills"
  );

  const workBlock = blocks.find((block) => block.type === "work");
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

  // 根据密度设置不同的空间和字体大小
  const getDensityStyles = () => {
    switch (density) {
      case "low":
        return {
          spacing: "space-y-5",
          itemSpacing: "space-y-4",
          padding: "p-6",
          textBase: "text-base",
          textSm: "text-sm",
          textXs: "text-xs",
          iconSize: "h-4 w-4",
        };
      case "medium":
        return {
          spacing: "space-y-4",
          itemSpacing: "space-y-3",
          padding: "p-5",
          textBase: "text-sm",
          textSm: "text-xs",
          textXs: "text-[10px]",
          iconSize: "h-3.5 w-3.5",
        };
      default:
        return {
          spacing: "space-y-3",
          itemSpacing: "space-y-2",
          padding: "p-4",
          textBase: "text-sm",
          textSm: "text-xs",
          textXs: "text-[10px]",
          iconSize: "h-3 w-3",
        };
    }
  };

  const styles = getDensityStyles();

  return (
    <div className="max-w-3xl mx-auto bg-white">
      {/* 技术专家头部 - 紧凑高效 */}
      <header
        className={`border-b-2 ${styles.padding}`}
        style={{ borderColor: themeColor }}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h1
                className={`font-bold tracking-tight ${
                  styles.textBase === "text-base" ? "text-2xl" : "text-xl"
                }`}
                style={{ color: themeColor }}
              >
                {base.name}
              </h1>
              <div
                className="px-2 py-0.5 rounded text-xs uppercase tracking-wide font-medium"
                style={{
                  backgroundColor: `${themeColor}20`,
                  color: themeColor,
                }}
              >
                {base.job}
              </div>
            </div>

            {/* 个人信息 - 紧凑网格布局 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mt-2">
              <Show when={!!base.phone}>
                <div className="flex items-center gap-1.5">
                  <Phone
                    className={styles.iconSize}
                    style={{ color: themeColor }}
                  />
                  <span className={styles.textSm}>{base.phone}</span>
                </div>
              </Show>

              <Show when={!!base.email}>
                <div className="flex items-center gap-1.5">
                  <Mail
                    className={styles.iconSize}
                    style={{ color: themeColor }}
                  />
                  <span className={`${styles.textSm} break-all`}>
                    {base.email}
                  </span>
                </div>
              </Show>

              <Show when={!!base.location}>
                <div className="flex items-center gap-1.5">
                  <MapPin
                    className={styles.iconSize}
                    style={{ color: themeColor }}
                  />
                  <span className={styles.textSm}>{base.location}</span>
                </div>
              </Show>

              <Show when={!!base.personalWebsite}>
                <div className="flex items-center gap-1.5">
                  <Globe
                    className={styles.iconSize}
                    style={{ color: themeColor }}
                  />
                  <a
                    href={normalizeUrl(base.personalWebsite)}
                    className={`${styles.textSm} hover:underline break-all`}
                    style={{ color: themeColor }}
                  >
                    {base.personalWebsite}
                  </a>
                </div>
              </Show>

              <Show when={!!base.gender}>
                <div className="flex items-center gap-1.5">
                  <User
                    className={styles.iconSize}
                    style={{ color: themeColor }}
                  />
                  <span className={styles.textSm}>性别：{base.gender}</span>
                </div>
              </Show>

              <Show when={!!base.age}>
                <div className="flex items-center gap-1.5">
                  <Calendar
                    className={styles.iconSize}
                    style={{ color: themeColor }}
                  />
                  <span className={styles.textSm}>年龄：{base.age}岁</span>
                </div>
              </Show>

              <Show when={!!base.politicalStatus}>
                <div className="flex items-center gap-1.5">
                  <Flag
                    className={styles.iconSize}
                    style={{ color: themeColor }}
                  />
                  <span className={styles.textSm}>
                    政治面貌：{base.politicalStatus}
                  </span>
                </div>
              </Show>
            </div>
          </div>

          {/* 头像区域 */}
          <Show when={!!base.avatar}>
            <div
              className="w-24 h-24 overflow-hidden rounded border-2"
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

      <div className={`${styles.padding} ${styles.spacing}`}>
        {/* 1. 技能区块 - 技术专家最重要的区块 */}
        <Show when={!!skillsBlock}>
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4" style={{ color: themeColor }} />
              <h3
                className={`font-bold tracking-wide ${styles.textBase}`}
                style={{ color: themeColor }}
              >
                {skillsBlock?.title || "专业技能"}
              </h3>
            </div>

            <div className="" style={{ borderColor: themeColor }}>
              {!!skillsBlock?.content && (
                <div
                  className={`prose max-w-none mb-2 ${
                    styles.textSm === "text-sm" ? "prose-sm" : "prose-xs"
                  }`}
                >
                  <Markdown>{skillsBlock.content}</Markdown>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {skillsBlock?._itemsWithKeys?.map((skill) => (
                  <div
                    key={skill._stableKey}
                    className="border-l pl-2"
                    style={{ borderColor: `${themeColor}60` }}
                  >
                    <h4
                      className={`font-medium text-gray-800 ${styles.textSm}`}
                    >
                      {skill.title || ""}
                    </h4>
                    <div
                      className={`prose max-w-none ${
                        styles.textSm === "text-sm" ? "prose-sm" : "prose-xs"
                      }`}
                    >
                      <Markdown>{skill.content || ""}</Markdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Show>

        {/* 2. 工作经验区块 - 技术深度展示 */}
        <Show when={!!workBlock}>
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4" style={{ color: themeColor }} />
              <h3
                className={`font-bold tracking-wide ${styles.textBase}`}
                style={{ color: themeColor }}
              >
                {workBlock?.title || "工作经验"}
              </h3>
            </div>

            <div
              className={` ${styles.itemSpacing}`}
              style={{ borderColor: themeColor }}
            >
              {workBlock?._itemsWithKeys?.map((work) => (
                <div key={work._stableKey} className="relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4
                        className={`font-semibold text-gray-800 ${styles.textSm}`}
                      >
                        {work.company || ""}
                        <span className="mx-1 text-gray-400">|</span>
                        <span className="font-medium text-gray-600">
                          {work.job || ""}
                        </span>
                      </h4>
                    </div>
                    {!!work.timeRange && (
                      <span
                        className={`${styles.textXs} px-1.5 py-0.5 rounded font-medium`}
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

                  <div
                    className={`prose max-w-none mt-1 ${
                      styles.textSm === "text-sm" ? "prose-sm" : "prose-xs"
                    }`}
                  >
                    <Markdown>{work.content || ""}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Show>

        {/* 3. 项目经验区块 - 技术实践展示 */}
        <Show when={!!projectBlock}>
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4" style={{ color: themeColor }} />
              <h3
                className={`font-bold tracking-wide ${styles.textBase}`}
                style={{ color: themeColor }}
              >
                {projectBlock?.title || "项目经验"}
              </h3>
            </div>

            <div
              className={` ${styles.itemSpacing}`}
              style={{ borderColor: themeColor }}
            >
              {projectBlock?._itemsWithKeys?.map((project) => (
                <div key={project._stableKey} className="relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4
                        className={`font-semibold text-gray-800 ${styles.textSm}`}
                      >
                        {project.name || ""}
                        <Show when={!!project.job}>
                          <span className="mx-1 text-gray-400">|</span>
                          <span className="font-medium text-gray-600">
                            {project.job || ""}
                          </span>
                        </Show>
                      </h4>
                    </div>
                    {!!project.timeRange && (
                      <span
                        className={`${styles.textXs} px-1.5 py-0.5 rounded font-medium`}
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

                  <div
                    className={`prose max-w-none mt-1 ${
                      styles.textSm === "text-sm" ? "prose-sm" : "prose-xs"
                    }`}
                  >
                    <Markdown>{project.content || ""}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Show>

        {/* 4. 教育背景区块 - 对于资深技术人员，放在后面 */}
        <Show when={!!educationBlock}>
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-4 h-4" style={{ color: themeColor }} />
              <h3
                className={`font-bold tracking-wide ${styles.textBase}`}
                style={{ color: themeColor }}
              >
                {educationBlock?.title || "教育背景"}
              </h3>
            </div>

            <div
              className={` ${styles.itemSpacing}`}
              style={{ borderColor: themeColor }}
            >
              {educationBlock?._itemsWithKeys?.map((edu) => (
                <div key={edu._stableKey} className="relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4
                        className={`font-semibold text-gray-800 ${styles.textSm}`}
                      >
                        {edu.school || ""}
                        <span className="mx-1 text-gray-400">|</span>
                        <span className="font-medium">{edu.major || ""}</span>
                        <span className="mx-1 text-gray-400">|</span>
                        <span>{edu.degree || ""}</span>
                      </h4>
                    </div>
                    {!!edu.timeRange && (
                      <span
                        className={`${styles.textXs} px-1.5 py-0.5 rounded font-medium`}
                        style={{
                          backgroundColor: `${themeColor}15`,
                          color: themeColor,
                        }}
                      >
                        {edu.timeRange.start || ""} - {edu.timeRange.end || ""}
                      </span>
                    )}
                  </div>

                  <div
                    className={`prose max-w-none mt-1 ${
                      styles.textSm === "text-sm" ? "prose-sm" : "prose-xs"
                    }`}
                  >
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
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4" style={{ color: themeColor }} />
              <h3
                className={`font-bold tracking-wide ${styles.textBase}`}
                style={{ color: themeColor }}
              >
                {block.title}
              </h3>
            </div>

            <div className="" style={{ borderColor: themeColor }}>
              {!!block.content && (
                <div
                  key={`${block._stableKey}-content`}
                  className={`prose max-w-none mb-2 ${
                    styles.textSm === "text-sm" ? "prose-sm" : "prose-xs"
                  }`}
                >
                  <Markdown>{block.content}</Markdown>
                </div>
              )}

              {block._itemsWithKeys && block._itemsWithKeys.length > 0 && (
                <div className={styles.itemSpacing}>
                  {block._itemsWithKeys.map((item) => (
                    <div key={item._stableKey} className="relative">
                      <div className="flex justify-between items-baseline">
                        <h4
                          className={`font-medium text-gray-800 ${styles.textSm}`}
                        >
                          {item.title || ""}
                        </h4>
                        {!!item.timeRange && (
                          <span className={`${styles.textXs} text-gray-500`}>
                            {item.timeRange.start || ""} -{" "}
                            {item.timeRange.end || ""}
                          </span>
                        )}
                      </div>
                      <div
                        className={`prose max-w-none mt-0.5 ${
                          styles.textSm === "text-sm" ? "prose-sm" : "prose-xs"
                        }`}
                      >
                        <Markdown>{item.content || ""}</Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
