// ============================================================================
// PAGE CONFIGURATION
// Control all copy, sections, and features from this single file
// ============================================================================

export type AudienceFilter = 'work' | 'school' | 'home' | 'health'

export interface Audience {
  id: string
  icon: string // emoji
  label: string
  benefits: [string, string, string]
  filter: AudienceFilter
}

export type SectionKey =
  | 'hero'
  | 'waitlist'
  | 'features'
  | 'washer'
  | 'tasks'
  | 'personas'
  | 'wheel'
  | 'flow'
  | 'footer'

export interface PageConfig {
  site: {
    title: string
    tagline: string
    description: string
    ogImage: string
  }
  sections: Record<
    SectionKey,
    { enabled: boolean; props?: Record<string, unknown> }
  >
  tasksCategories: Array<'all' | 'home' | 'work' | 'school' | 'health'>
}

// ============================================================================
// MAIN CONFIGURATION
// ============================================================================

export const pageConfig: PageConfig = {
  // Site metadata
  site: {
    title: 'Dystopia',
    tagline: 'Get more done. Keep your data yours.',
    description:
      'Privacy-first task management that runs entirely in your browser. No servers, no tracking, no subscriptions.',
    ogImage: '/og-image.png',
  },

  // Section visibility and props
  sections: {
    hero: {
      enabled: true,
      props: {
        headline: 'Get more done. Keep your data yours.',
        subheadline:
          'A radically simple task manager that stores everything locally. Zero cloud sync, zero tracking, 100% your data.',
        primaryCTA: 'Join the Waitlist',
        heroImage: '/og-image.png', // Path to hero image
      },
    },

    features: {
      enabled: true,
      props: {
        sectionTitle: 'What it can do',
        features: [
          {
            icon: 'Lock',
            title: 'Privacy First',
            description:
              'Your tasks never leave your device. No servers, no tracking, no third parties.',
          },
          {
            icon: 'Zap',
            title: 'Lightning Fast',
            description:
              'Instant load times. Zero latency. Everything runs locally in your browser.',
          },
          {
            icon: 'Database',
            title: 'Your Data, Your Control',
            description:
              'Export to .xlsx or .csv anytime. Import from anywhere. Own your data forever.',
          },
          {
            icon: 'Sparkles',
            title: 'Smart Sorting',
            description:
              'AI-powered task prioritization that learns how you work—without sending data anywhere.',
          },
        ],
      },
    },

    washer: {
      enabled: true,
      props: {
        sectionTitle: 'The Washer Method',
        description:
          'Your tasks go through cycles—just like laundry. Sort by urgency, wash away complexity, dry with focus, and fold into your calendar.',
        cycles: [
          { step: 'Sort', description: 'Separate urgent from important' },
          { step: 'Wash', description: 'Break down complex tasks' },
          { step: 'Dry', description: 'Focus time blocks' },
          { step: 'Fold', description: 'Schedule into your day' },
        ],
      },
    },

    tasks: {
      enabled: true,
      props: {
        sectionTitle: 'Built for all of life',
        subtitle: 'One tool for every context',
        taskTypes: [
          {
            name: 'Home',
            description: 'Errands, chores, life admin',
            color: 'bg-blue-500',
            icon: 'Home',
          },
          {
            name: 'Work',
            description: 'Projects, meetings, deadlines',
            color: 'bg-purple-500',
            icon: 'Briefcase',
          },
          {
            name: 'School',
            description: 'Assignments, study, exams',
            color: 'bg-green-500',
            icon: 'GraduationCap',
          },
          {
            name: 'Health',
            description: 'Fitness, wellness, self-care',
            color: 'bg-red-500',
            icon: 'Heart',
          },
          {
            name: 'Creative',
            description: 'Side projects, hobbies',
            color: 'bg-yellow-500',
            icon: 'Palette',
          },
          {
            name: 'Social',
            description: 'Events, connections',
            color: 'bg-pink-500',
            icon: 'Users',
          },
        ],
      },
    },

    personas: {
      enabled: false,
      props: {
        sectionTitle: 'Built for everyone',
        personas: [
          {
            role: 'The Minimalist',
            description: 'You want simplicity, not another SaaS subscription',
            painPoint: 'Tired of feature bloat and privacy invasions',
          },
          {
            role: 'The Privacy Advocate',
            description: 'Your data belongs to you, not Big Tech',
            painPoint: 'Every app wants to harvest your information',
          },
          {
            role: 'The Busy Parent',
            description: 'Juggling work, home, and everything in between',
            painPoint: 'No time to learn complex productivity systems',
          },
        ],
      },
    },

    wheel: {
      enabled: true,
      props: {
        title: 'Made for you',
        subtitle: "Pick your world; we'll show what changes.",
        small: "Your day stays the same—just smoother. Choose an audience to see the wins.",
        ringOpacity: 0.2,
        audiences: [
          {
            id: 'students',
            icon: '🎓',
            label: 'Students',
            benefits: ['Flashcards in 1 click', 'Reading TL;DR', 'Weekly plan made'],
            filter: 'school',
          },
          {
            id: 'operators',
            icon: '🚀',
            label: 'Operators',
            benefits: ['Update drafts ready', 'Standups summarized', 'Roadmap aligned'],
            filter: 'work',
          },
          {
            id: 'devs',
            icon: '💻',
            label: 'Developers',
            benefits: ['Log explainers', 'PR summaries', 'Snippet search'],
            filter: 'work',
          },
          {
            id: 'clinicians',
            icon: '🩺',
            label: 'Clinicians',
            benefits: ['Handoff briefs', 'Prior labs surfaced', 'Local by default'],
            filter: 'health',
          },
          {
            id: 'support',
            icon: '📞',
            label: 'Support / Sales',
            benefits: ['Call notes to actions', 'Follow-ups drafted', 'Docs pulled fast'],
            filter: 'work',
          },
          {
            id: 'parents',
            icon: '🏠',
            label: 'Parents',
            benefits: ['Chore rota', 'Meal plans', 'Shared reminders'],
            filter: 'home',
          },
          {
            id: 'researchers',
            icon: '🔬',
            label: 'Researchers',
            benefits: ['Paper digests', 'Citations tracked', 'Outline sync'],
            filter: 'work',
          },
          {
            id: 'designers',
            icon: '🎨',
            label: 'Designers / PMs',
            benefits: ['Ticket drafts', 'Spec skeletons', 'Release notes'],
            filter: 'work',
          },
          {
            id: 'k12',
            icon: '🧒',
            label: 'K-12',
            benefits: ['Study guides', 'Practice quizzes', 'Parent summary'],
            filter: 'school',
          },
        ],
      },
    },

    flow: {
      enabled: true,
      props: {
        sectionTitle: 'How it works',
        darkBackground: true,
        steps: [
          {
            label: 'Capture',
            description: 'Brain dump everything. Quick entry, voice notes, or paste from anywhere.',
          },
          {
            label: 'Organize',
            description: 'Auto-categorize with local AI. No data sent to servers.',
          },
          {
            label: 'Prioritize',
            description: 'Smart ranking based on deadlines, context, and your patterns.',
          },
          {
            label: 'Execute',
            description: 'Focus mode shows one task at a time. Get in the zone.',
          },
        ],
      },
    },

    waitlist: {
      enabled: true,
      props: {
        sectionTitle: 'Join the Waitlist',
        description: 'Be first to know when we launch',
        privacyNote:
          '✓ Stored locally on your device • ✓ Export anytime • ✓ Never sold or shared',
        formFields: [
          { name: 'name', label: 'Name', required: true, icon: 'User' },
          { name: 'email', label: 'Email', required: true, icon: 'Mail' },
          { name: 'company', label: 'Company', required: false, icon: 'Briefcase' },
          { name: 'role', label: 'Role', required: false },
        ],
      },
    },

    footer: {
      enabled: true,
      props: {
        tagline: 'Task management that respects your privacy.',
        columns: [
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '#features' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'Pricing', href: '#' },
              { label: 'Roadmap', href: '#' },
            ],
          },
          {
            title: 'Privacy',
            links: [
              { label: 'Privacy Policy', href: '#' },
              { label: 'Security', href: '#' },
              { label: 'Data Ownership', href: '#' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About', href: '#' },
              { label: 'Blog', href: '#' },
              { label: 'Careers', href: '#' },
              { label: 'Contact', href: '#' },
            ],
          },
        ],
        social: [
          { platform: 'Twitter', icon: 'Twitter', url: '#' },
          { platform: 'GitHub', icon: 'Github', url: '#' },
          { platform: 'LinkedIn', icon: 'Linkedin', url: '#' },
        ],
      },
    },
  },

  // Task category filters
  tasksCategories: ['all', 'home', 'work', 'school', 'health'],
}

// ============================================================================
// LEGACY COMPATIBILITY HELPERS
// Helper to maintain backwards compatibility with existing components
// ============================================================================

export const siteConfig = {
  hero: {
    title: pageConfig.site.title,
    subtitle: pageConfig.sections.hero.props?.headline as string,
    cta: pageConfig.sections.hero.props?.primaryCTA as string,
  },
  features: {
    title: pageConfig.sections.features.props?.sectionTitle as string,
    items: pageConfig.sections.features.props?.features as Array<{
      icon: string
      title: string
      description: string
    }>,
  },
  washer: {
    title: pageConfig.sections.washer.props?.sectionTitle as string,
    description: pageConfig.sections.washer.props?.description as string,
  },
  tasks: {
    title: pageConfig.sections.tasks.props?.sectionTitle as string,
    items: (pageConfig.sections.tasks.props?.taskTypes as Array<{
      name: string
      description: string
      color: string
    }>) || [],
  },
  personas: {
    title: pageConfig.sections.personas.props?.sectionTitle as string,
    items: pageConfig.sections.personas.props?.personas as Array<{
      role: string
      description: string
      painPoint: string
    }>,
  },
  underTheHood: {
    title: pageConfig.sections.flow.props?.sectionTitle as string,
    steps: pageConfig.sections.flow.props?.steps as Array<{
      label: string
      description: string
    }>,
  },
}

