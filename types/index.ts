export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  status: "live" | "ongoing" | "upcoming";
  featured?: boolean;
  badge?: string;
}

export interface Skill {
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  badge: string; // emoji or icon identifier
  color: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  created_at: string;
  approved: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  projectType?: string;
}
