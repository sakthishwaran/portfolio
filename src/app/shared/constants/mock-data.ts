import type { Profile, Project } from '../models/profile.model';

export const PROJECTS: Project[] = [
  {
    id: 'school-erp',
    name: 'Multi-Tenant School ERP',
    description: `Multi-Tenant School ERP System — an enterprise platform that simplifies and digitizes the complete management of
      schools and educational institutions. Built for multiple institutions to operate independently within a single
      application, the platform provides tenant isolation, role-based access control (RBAC), fee management, timetables,
      communications (SMS, Email, WhatsApp), reports and secure JWT authentication. I led frontend and backend work,
      creating responsive Angular interfaces and scalable REST APIs with Node.js and Hapi.js.`,
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Hapi.js', 'PostgreSQL', 'Tailwind CSS', 'JWT', 'Razorpay'],
    role: 'Lead Developer',
    image: 'images/school-erp.png',
  },
  {
    id: 'college-erp',
    name: 'College ERP & CRM',
    description: `College ERP & CRM Platform — a digital campus and CRM solution that automates admissions, attendance, fee
      collection, lead tracking and reporting. The platform integrates payment gateways, cloud file storage and push
      notifications, while providing a dashboard for analytics and operational insights. I worked on backend modules,
      frontend enhancements, third-party integrations (Razorpay, Worldline), and database and performance optimizations.`,
    technologies: ['Laravel', 'PHP', 'JavaScript', 'Bootstrap', 'MySQL', 'AWS S3', 'Firebase', 'Razorpay', 'Worldline'],
    role: 'Full Stack Developer',
    image: 'images/college-erp.png',
  },
];

export const PROFILE: Profile = {
  fullName: 'SAKTHISHWARAN A',
  title: 'Associate Software Engineer',
  summary:
    'Full Stack Developer with 2+ years of experience building scalable enterprise web applications using Angular, TypeScript, Node.js, and Hapi.js. I specialize in creating multi-tenant ERP & CRM solutions with clean architecture, secure APIs, and modern user interfaces.',
  aboutSummary:'Im a passionate Full Stack Developer with 2.5+ years of experience building scalable web applications using Angular, Node.js, Hapi.js, Laravel, TypeScript, and PostgreSQL. I specialize in developing enterprise ERP and CRM solutions with expertise in REST APIs, RBAC, authentication, payment gateway integrations, and cloud services. I enjoy creating clean, efficient, and user-focused applications while continuously learning new technologies and improving my craft as a software engineer.',
  contact: {
    phone: '+91 9047401605',
    email: 'mail2sakthi18@gmail.com',
    location: 'Theni, India',
    linkedin: 'https://www.linkedin.com/in/sakthishwaran',
    github: 'https://github.com/sakthishwaran',
    // profile portrait used in the Hero section
    image: 'images/hero-profile.png',
    resume: 'resume/resume.pdf',
  },
  skills: [
    'Angular',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Hapi.js',
    'Laravel',
    'PHP',
    'PostgreSQL',
    'MySQL',
    'Tailwind CSS',
  ],
  professionalSkills: [
    'Leadership',
    'Problem Solving',
    'Communication',
    'Team Collaboration',
    'Agile',
  ],
  projects: PROJECTS,
};
