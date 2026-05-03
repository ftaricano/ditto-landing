import {
  BarChart3,
  BellRing,
  Brain,
  Building2,
  ClipboardCheck,
  Filter,
  LineChart,
  Network,
  Radio,
  ScanLine,
  Sparkles,
  Store,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Feature = {
  id: 'extract' | 'understand' | 'act';
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  metric: string;
  icon: LucideIcon;
  mockup: 'inbox' | 'sentiment' | 'alerts';
  reversed: boolean;
};

export type UseCase = {
  id: 'franchises' | 'smbs';
  tab: string;
  title: string;
  audience: string;
  description: string;
  metric: string;
  details: string[];
};

export const navItems = [
  { label: 'Product', href: '#extract' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Demo', href: '#demo' },
];

export const contactEmail = 'hello@ditto.ai';

export const clientLogos = ['NOVA MART', 'CAFÉ LUMA', 'URBAN BOWL', 'HELIX RETAIL', 'KITE MARKET', 'BRASA'];

export const pillars = [
  {
    title: 'Extract',
    body: 'Capture reviews, ratings, and comments from every retail surface before they fragment.',
    icon: ScanLine,
  },
  {
    title: 'Understand',
    body: 'Filter repetition, detect sentiment shifts, and cluster themes into clean signal.',
    icon: Brain,
  },
  {
    title: 'Act',
    body: 'Route the right insight to operations, store managers, and owners with next steps.',
    icon: Workflow,
  },
];

export const features: Feature[] = [
  {
    id: 'extract',
    eyebrow: '01 · EXTRACT',
    title: 'Pull every review stream into one clean intake.',
    description:
      'Ditto watches iFood, Google Reviews, Yelp, App Stores, and owned channels, then normalizes messy feedback into a single operating feed.',
    bullets: ['Channel health by source', 'Duplicate and spam suppression', 'Unit-level capture status'],
    metric: '12 sources synced',
    icon: Radio,
    mockup: 'inbox',
    reversed: false,
  },
  {
    id: 'understand',
    eyebrow: '02 · UNDERSTAND',
    title: 'Turn repetitive comments into themes your team can trust.',
    description:
      'The NLP layer separates noise from signal, maps sentiment, and highlights the topics that are moving customer experience.',
    bullets: ['Sentiment deltas by unit', 'Theme clustering with evidence', 'Noise confidence scoring'],
    metric: '87% clarity score',
    icon: Filter,
    mockup: 'sentiment',
    reversed: true,
  },
  {
    id: 'act',
    eyebrow: '03 · ACT',
    title: 'Move from insight to action before patterns become churn.',
    description:
      'Ditto turns signals into routed alerts, manager playbooks, and executive snapshots that keep retail teams aligned.',
    bullets: ['Priority alerts', 'Owner-ready summaries', 'Recommended next action'],
    metric: '4 actions queued',
    icon: BellRing,
    mockup: 'alerts',
    reversed: false,
  },
];

export const useCases: UseCase[] = [
  {
    id: 'franchises',
    tab: 'Franquias',
    title: 'One source of truth across hundreds of units.',
    audience: 'For franchise operators',
    description:
      'Compare stores, regions, and channels without manually stitching review exports into another spreadsheet.',
    metric: '218 units ranked by signal quality',
    details: ['Region heatmaps', 'Unit comparability', 'Executive weekly readout'],
  },
  {
    id: 'smbs',
    tab: 'PMEs',
    title: 'Fast clarity for owner-led teams.',
    audience: 'For owner-led teams',
    description:
      'See what customers are repeating, what changed this week, and which operational fix deserves attention first.',
    metric: '2 hours saved every Monday',
    details: ['Priority inbox', 'Plain-English summaries', 'Low-maintenance setup'],
  },
];

export const socialStats = [
  { value: '42k', label: 'reviews normalized monthly' },
  { value: '31%', label: 'faster issue triage' },
  { value: '6', label: 'channels watched per brand' },
];

export const pricingPlans = [
  {
    name: 'PME',
    icon: Store,
    price: 'Early access',
    body: 'One to five locations, weekly clarity reports, and priority issue routing.',
  },
  {
    name: 'Franchise',
    icon: Building2,
    price: 'Sales-led',
    body: 'Multi-unit benchmarking, regional dashboards, and operating playbooks.',
  },
];

export const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Extract', href: '#extract' },
      { label: 'Understand', href: '#understand' },
      { label: 'Act', href: '#act' },
      { label: 'Integrations', href: '#extract' },
    ],
  },
  {
    title: 'Use cases',
    links: [
      { label: 'Franquias', href: '#use-cases' },
      { label: 'PMEs', href: '#use-cases' },
      { label: 'Operations', href: '#use-cases' },
      { label: 'CX teams', href: '#use-cases' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#social-proof' },
      { label: 'Security', href: `mailto:${contactEmail}?subject=Ditto security` },
      { label: 'Careers', href: `mailto:${contactEmail}?subject=Ditto careers` },
      { label: 'Contact', href: `mailto:${contactEmail}` },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: `mailto:${contactEmail}?subject=Ditto privacy` },
      { label: 'Terms', href: `mailto:${contactEmail}?subject=Ditto terms` },
      { label: 'DPA', href: `mailto:${contactEmail}?subject=Ditto DPA` },
      { label: 'Status', href: '#footer' },
    ],
  },
];

export const mockupIcons = [Sparkles, LineChart, BarChart3, Network, ClipboardCheck];
