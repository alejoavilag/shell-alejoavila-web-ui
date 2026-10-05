import type { LayerId } from "../architecture/layer";

export type Link = {
  href: string;
  label: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type LayerColumn = {
  label: string;
  technology: string;
  points: string[];
};

export type LayerSection = {
  layer: LayerId;
  eyebrow: string;
  title: string;
  lead: string;
  points?: string[];
  columns?: LayerColumn[];
};

export type Hero = {
  badge: string;
  name: string;
  role: string;
  lead: string;
  stack: string[];
  primary: Link;
  secondary: Link;
};

export type Profile = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  closing: string;
  facts: Fact[];
};

export type Expertise = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  closing: string;
  flowsLabel: string;
  flows: string[];
};

export type BuildStatus = "live" | "building";

export type BuildRecord = {
  label: string;
  detail: string;
  status: BuildStatus;
};

export type CaseStudy = {
  eyebrow: string;
  title: string;
  lead: string;
  records: BuildRecord[];
  repositories: Link[];
};

export type Contact = {
  eyebrow: string;
  title: string;
  lead: string;
  channels: Link[];
  credit: string;
};

export type LandingContent = {
  hero: Hero;
  profile: Profile;
  expertise: Expertise;
  layers: LayerSection[];
  caseStudy: CaseStudy;
  contact: Contact;
};

export function liveRecords(caseStudy: CaseStudy): BuildRecord[] {
  return caseStudy.records.filter((record) => record.status === "live");
}
