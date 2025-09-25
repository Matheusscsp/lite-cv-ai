import type { Resume } from "@/shared/resume";
import { BLOCK_IDS } from "@/shared/resume";

const resumeData: Resume = {
  base: {
    name: "张三",
    job: "前端开发工程师",
    location: "北京市海淀区",
    phone: "138****1234",
    email: "zhangsan@example.com",
    personalWebsite: "https://zhangsan.example.com",
    gender: "男",
    age: 28,
    politicalStatus: "群众",
    avatar: "/images/avatar.jpg",
  },
  blocks: [
    {
      id: "self-intro",
      title: "个人概况",
      type: "list",
      content:
        "5年前端开发经验，熟悉现代化前端技术栈，参与过多个大型项目的开发和维护。有良好的代码风格，能够高效地解决复杂问题。",
      items: [],
    },
    {
      id: BLOCK_IDS.EDUCATION,
      title: "教育背景",
      type: "education",
      items: [
        {
          title: "北京大学",
          school: "北京大学",
          degree: "本科",
          major: "计算机科学与技术",
          timeRange: {
            start: "2014.09",
            end: "2018.06",
          },
          content:
            "主修课程：数据结构、算法设计与分析、操作系统、计算机网络、软件工程等。\n- 获得校级奖学金两次\n- 参与校内科技创新项目，获得校级优秀项目奖",
        },
        {
          title: "清华大学",
          school: "清华大学",
          degree: "硕士",
          major: "软件工程",
          timeRange: {
            start: "2018.09",
            end: "2021.06",
          },
          content:
            "研究方向：Web应用优化与性能分析。\n- 参与国家级科研项目，发表学术论文2篇\n- 获得国家奖学金一次",
        },
      ],
    },
    {
      id: BLOCK_IDS.WORK,
      title: "工作经历",
      type: "work",
      items: [
        {
          title: "科技有限公司",
          company: "科技有限公司",
          job: "高级前端开发工程师",
          timeRange: {
            start: "2021.07",
            end: "至今",
          },
          content:
            "负责公司核心产品的前端架构设计和开发，主导多个关键模块的实现。\n\n工作内容：\n- 负责产品前端架构设计和技术选型\n- 优化前端性能，提升用户体验\n- 编写高质量、可复用的代码\n- 指导初级工程师，进行代码审核\n\n成就：\n- 重构前端架构，页面加载速度提升50%\n- 建立前端组件库，提高团队开发效率\n- 推动前端自动化测试，bug率降低30%",
        },
        {
          title: "互联网科技公司",
          company: "互联网科技公司",
          job: "前端开发工程师",
          timeRange: {
            start: "2018.07",
            end: "2021.06",
          },
          content:
            "参与公司产品的前端开发，负责多个功能模块的实现和优化。\n\n工作内容：\n- 使用React开发响应式Web应用\n- 与后端工程师协作完成接口对接\n- 解决兼容性问题，确保产品在各平台正常运行\n\n成就：\n- 独立完成用户中心模块重构\n- 开发了多个高复用性组件\n- 获得年度优秀员工称号",
        },
      ],
    },
    {
      id: BLOCK_IDS.PROJECT,
      title: "项目经验",
      type: "project",
      items: [
        {
          title: "企业管理系统",
          name: "企业管理系统",
          job: "前端技术负责人",
          timeRange: {
            start: "2022.03",
            end: "2022.11",
          },
          content:
            "一个大型企业内部管理系统，包括人事、财务、库存等多个模块。\n\n技术栈：React, TypeScript, Next.js, TailwindCSS\n\n职责：\n- 负责前端架构设计和技术选型\n- 实现核心功能模块\n- 优化系统性能和用户体验\n- 协调前后端合作\n\n成果：\n- 系统上线后运行稳定，用户满意度高\n- 开发周期比计划提前两周完成\n- 建立了完善的组件库和开发文档",
        },
        {
          title: "电子商务平台",
          name: "电子商务平台",
          job: "前端开发工程师",
          timeRange: {
            start: "2019.05",
            end: "2020.01",
          },
          content:
            "面向C端用户的电子商务平台，提供商品浏览、购买、支付等功能。\n\n技术栈：Vue.js, Vuex, Element UI\n\n职责：\n- 负责商品详情页和购物车功能开发\n- 实现支付流程和订单管理\n- 优化移动端适配\n\n成果：\n- 平台日活跃用户超过10万\n- 购物流程转化率提升20%\n- 页面加载速度优化50%",
        },
      ],
    },
    {
      id: BLOCK_IDS.SKILLS,
      title: "专业技能",
      type: "list",
      items: [
        {
          title: "前端开发",
          content:
            "熟练掌握HTML5, CSS3, JavaScript, TypeScript等前端技术，能够使用现代前端框架如React, Vue.js进行高效开发。",
        },
        {
          title: "框架和库",
          content:
            "熟悉React, Next.js, Vue.js等框架，以及Redux, MobX等状态管理库。能够使用TailwindCSS, Styled-Components等样式解决方案。",
        },
        {
          title: "工程化和性能优化",
          content:
            "熟悉Webpack, Vite等构建工具，了解模块化、组件化开发理念。有丰富的前端性能优化经验，能够解决复杂的性能问题。",
        },
        {
          title: "其他技能",
          content:
            "了解Node.js后端开发，熟悉Git版本控制，具备良好的团队协作能力和问题解决能力。英语CET-6，能够阅读技术文档和进行简单的交流。",
        },
      ],
    },
    {
      id: BLOCK_IDS.HONOR,
      title: "荣誉奖项",
      type: "honor",
      items: [
        {
          title: "年度优秀员工",
          subtitle: "科技有限公司",
          content:
            "在2023年度评选中被评为公司优秀员工，表彰工作成果和团队贡献。",
          timeRange: {
            start: "",
            end: "2023",
          },
        },
        {
          title: "优秀毕业生",
          subtitle: "清华大学",
          content: "因学术表现和综合素质优秀，被评为2021届校级优秀毕业生。",
          timeRange: {
            start: "",
            end: "2021",
          },
        },
        {
          title: "全国大学生软件设计大赛二等奖",
          subtitle: "教育部",
          content: "在全国性软件设计大赛中表现突出，项目获得专家评委一致好评。",
          timeRange: {
            start: "",
            end: "2020",
          },
        },
      ],
    },
  ],
};

export default resumeData;
