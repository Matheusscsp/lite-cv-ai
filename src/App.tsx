import resumeData from "./data/resume";
import { TemplateRender } from "./themes/theme-render";

// 在此处导入模板，修改后面的名字为模板的名字
import Template from "./themes/next";
// 比如这里使用 business 这个模板
// import Template from "./themes/business";

export default function App() {
  return (
    <main className="max-w-4xl mx-auto print:max-w-none print:mx-0">
      <TemplateRender resumeData={resumeData} Template={Template} />
    </main>
  );
}
