export const navigation = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Closing Tracker',
    children: [
      {
        title: 'User Guide',
        path: '/closing/guide',
        description: 'Fields, views, and workflows for the Closing Tracker',
      },
      {
        title: 'Automation Guide',
        path: '/closing/automation',
        description: 'Power Automate flows for the Closing Tracker',
      },
      {
        title: 'Excel Info',
        path: '/closing/excel-info',
        description: 'Power Query M Code and Excel PM Tracker documentation',
      },
      {
        title: 'AI Prompts',
        path: '/closing/ai-prompts',
        description: 'Copy-paste prompts for AI assistants',
      },
    ],
  },
  {
    title: 'Drafting Tracker',
    children: [
      {
        title: 'User Guide',
        path: '/drafting/guide',
        description: 'Fields, views, and workflows for the Drafting Tracker',
      },
      {
        title: 'Automation Guide',
        path: '/drafting/automation',
        description: 'Power Automate flows for the Drafting Tracker',
      },
      {
        title: 'Excel Info',
        path: '/drafting/excel-info',
        description: 'Power Query M Code and Excel PM Tracker documentation',
      },
      {
        title: 'AI Prompts',
        path: '/drafting/ai-prompts',
        description: 'Copy-paste prompts for AI assistants',
      },
    ],
  },
  {
    title: 'EV Tracker',
    children: [
      {
        title: 'Project Overview',
        path: '/ev/overview',
        description: 'Complete workflow from intake to completion',
      },
      {
        title: 'User Guide',
        path: '/ev/guide',
        description: 'Fields, views, and workflows for the EV Tracker',
      },
      {
        title: 'Automation Guide',
        path: '/ev/automation',
        description: 'Power Automate flows for the EV Tracker',
      },
      {
        title: 'Excel Info',
        path: '/ev/excel-info',
        description: 'Power Query M Code and Excel PM Tracker documentation',
      },
      {
        title: 'AI Prompts',
        path: '/ev/ai-prompts',
        description: 'Copy-paste prompts for AI assistants',
      },
    ],
  },
  {
    title: 'Small Cell Tracker',
    children: [
      {
        title: 'Project Overview',
        path: '/small-cell/overview',
        description: 'Complete workflow from intake to completion',
      },
      {
        title: 'User Guide',
        path: '/small-cell/guide',
        description: 'Fields, views, and workflows for the Small Cell Tracker',
      },
      {
        title: 'Automation Guide',
        path: '/small-cell/automation',
        description: 'Power Automate flows for the Small Cell Tracker',
      },
      {
        title: 'Excel Info',
        path: '/small-cell/excel-info',
        description: 'Power Query M Code, SPIDA integration, and Excel PM Tracker documentation',
      },
      {
        title: 'AI Prompts',
        path: '/small-cell/ai-prompts',
        description: 'Copy-paste prompts for AI assistants',
      },
    ],
  },
];

export const docPaths = {
  '/': '/docs/index.md',
  '/closing/guide': '/docs/closing/guide.md',
  '/closing/automation': '/docs/closing/automation.md',
  '/closing/excel-info': '/docs/closing/excel-info.md',
  '/closing/ai-prompts': '/docs/closing/ai-prompts.md',
  '/drafting/guide': '/docs/drafting/guide.md',
  '/drafting/automation': '/docs/drafting/automation.md',
  '/drafting/excel-info': '/docs/drafting/excel-info.md',
  '/drafting/ai-prompts': '/docs/drafting/ai-prompts.md',
  '/ev/overview': '/docs/ev/overview.md',
  '/ev/guide': '/docs/ev/guide.md',
  '/ev/automation': '/docs/ev/automation.md',
  '/ev/excel-info': '/docs/ev/excel-info.md',
  '/ev/ai-prompts': '/docs/ev/ai-prompts.md',
  '/small-cell/overview': '/docs/small-cell/overview.md',
  '/small-cell/guide': '/docs/small-cell/guide.md',
  '/small-cell/automation': '/docs/small-cell/automation.md',
  '/small-cell/excel-info': '/docs/small-cell/excel-info.md',
  '/small-cell/ai-prompts': '/docs/small-cell/ai-prompts.md',
};

export const getPageTitle = (path) => {
  for (const item of navigation) {
    if (item.path === path) return item.title;
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) return `${item.title} - ${child.title}`;
      }
    }
  }
  return 'TechServ Documentation';
};
