export interface Project {
  title: string
  tags: string[]
  image: string
  link: string
  status: 'published' | 'coming_soon'
}

export const PROJECTS: Project[] = [
  {
    title: 'Mbrosia - Music Streaming UI',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS', 'GO'],
    image: '/portfolio/audio-app.webp',
    link: 'https://mbrosia.netlify.app/',
    status: 'published',
  },
  {
    title: 'Breathe Triangle - Wellness App',
    tags: ['Vue 2', 'Vuetify', 'HTML', 'CSS'],
    image: '/portfolio/breath-triangle.webp',
    link: 'https://triangle-breath.netlify.app/',
    status: 'published',
  },
  {
    title: 'Company\'s Page Redesign',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/company.webp',
    link: '#',
    status: 'published',
  },
  {
    title: 'Sheron - E-commerce Platform',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/sheron.webp',
    link: 'https://sheron-web.tasartir.com/en',
    status: 'published',
  },
  {
    title: 'Official Rolex Retailer in Bratislava',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/rolex.webp',
    link: 'https://sheron-web.tasartir.com/en/rolex',
    status: 'published',
  },
  {
    title: 'Pavel Ivannikov\'s Portfolio Page',
    tags: ['Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/pivannikov.webp',
    link: '#',
    status: 'coming_soon',
  },
]

export const useProjects = () => PROJECTS
