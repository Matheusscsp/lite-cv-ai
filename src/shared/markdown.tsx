import MarkdownImpl from "markdown-to-jsx";
export default function Markdown({ children }: { children: any }) {
  return (
    <div className="text-inherit prose prose-sm max-w-none prose-headings:font-semibold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h4:text-sm prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5">
      <MarkdownImpl>{children}</MarkdownImpl>
    </div>
  );
}
