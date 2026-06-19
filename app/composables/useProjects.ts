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
    image: '/portfolio/audio-app.png',
    link: 'https://mbrosia.netlify.app/',
    status: 'published',
  },
  {
    title: 'Breathe Triangle - Wellness App',
    tags: ['Vue 2', 'Vuetify', 'HTML', 'CSS'],
    image: '/portfolio/breath-triangle.png',
    link: 'https://triangle-breath.netlify.app/',
    status: 'published',
  },
  {
    title: 'Company\'s Page Redesign',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/company.png',
    link: '#',
    status: 'published',
  },
  {
    title: 'Sheron - E-commerce Platform',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/sheron.png',
    link: 'https://sheron-web.tasartir.com/en',
    status: 'published',
  },
  {
    title: 'Official Rolex Retailer in Bratislava',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/rolex.png',
    link: 'https://sheron-web.tasartir.com/en/rolex',
    status: 'published',
  },
  {
    title: 'Pavel Ivannikov\'s Portfolio Page',
    tags: ['Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/pivannikov.png',
    link: '#',
    status: 'coming_soon',
  },
]

export const useProjects = () => PROJECTS
