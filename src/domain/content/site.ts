export type Person = {
  fullName: string;
  givenName: string;
  familyName: string;
  jobTitle: string;
  email: string;
  city: string;
  country: string;
  languages: string[];
  employer: string;
  credential: string;
  alumniOf: string;
  skills: string[];
  profiles: string[];
};

export type SiteIdentity = {
  url: string;
  name: string;
  title: string;
  titleTemplate: string;
  description: string;
  locale: string;
  person: Person;
};

export function canonical(site: SiteIdentity, path = "/"): string {
  return new URL(path, site.url).toString();
}
