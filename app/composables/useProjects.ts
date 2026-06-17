export interface Project {
  title: string
  tags: string[]
  image: string
  link: string
  status: 'published' | 'coming_soon'
}

export const PROJECTS: Project[] = [
  {
    title: 'Mbrosia — Music Streaming UI',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS', 'GO'],
    image: '/portfolio/audio-app.png',
    link: 'https://mbrosia.netlify.app/',
    status: 'published',
  },
  {
    title: 'Breathe Triangle — Wellness App',
    tags: ['Vue 2', 'Vuetify', 'HTML', 'CSS'],
    image: '/portfolio/breath-triangle.png',
    link: 'https://triangle-breath.netlify.app/',
    status: 'published',
  },
  {
    title: 'Tasartir',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/tasartir.png',
    link: '#',
    status: 'coming_soon',
  },
  {
    title: 'Sheron — E-commerce Platform',
    tags: ['Vue 3', 'Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/sheron.png',
    link: 'https://sheron-web.tasartir.com/en',
    status: 'published',
  },
  {
    title: 'Landing Page for Pavel Ivannikov',
    tags: ['Tailwind CSS', 'HTML', 'CSS'],
    image: '/portfolio/pivannikov.png',
    link: '#',
    status: 'coming_soon',
  },
]

export const useProjects = () => PROJECTS
