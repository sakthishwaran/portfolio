export interface ContactInfo {
  phone?: string;
  email: string;
  location?: string;
  linkedin?: string;
  github?: string;
  image?: string;
  resume?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role?: string;
  image?: string;
  live?: string;
  repo?: string;
}

export interface Profile {
  fullName: string;
  title: string;
  summary: string;
  aboutSummary: string;
  contact: ContactInfo;
  skills: string[];
  professionalSkills: string[];
  highlights?: string[];
  projects: Project[];
}
