// Personal Information
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  profileImage?: string;
  resume?: string;
}

// Experience
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}

// Education
export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
  achievements: string[];
  courses: string[];
  logo?: string;
}

// Projects
export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export interface ArchitectureLayer {
  name: string;
  components: string[];
  description: string;
}

export interface Architecture {
  description: string;
  diagram?: string;
  layers: ArchitectureLayer[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  category: 'AI/ML' | 'Full Stack' | 'Research' | 'Open Source';
  featured: boolean;
  thumbnail: string;
  images?: string[];
  github?: string;
  demo?: string;
  metrics: ProjectMetric[];
  architecture?: Architecture;
  challenges: string[];
  learnings: string[];
  startDate: string;
  endDate?: string;
}

// Skills
export interface Skill {
  name: string;
  category: 'Deep Learning' | 'LLMs' | 'Computer Vision' | 'Data' | 'Infrastructure' | 'Languages' | 'Tools';
  level: 'Learning' | 'Using' | 'Mastered' | 'Want to Learn';
  experience: string;
  projects: string[];
  icon?: string;
}

// Open Source
export interface OpenSourceContribution {
  id: string;
  repository: string;
  organization: string;
  type: 'PR' | 'Issue' | 'Feature' | 'Bug Fix' | 'Documentation';
  title: string;
  description: string;
  date: string;
  status: 'Merged' | 'Open' | 'Closed';
  url: string;
  impact: string;
}
