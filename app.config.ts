import type { Props as SocialLink } from '@/components/SocialLink.vue'

interface HeaderLink {
  title: string
  to: unknown // TODO: Improve type
}

const headerLinks: HeaderLink[] = [
  { title: 'Blog', to: '/blog' },
  { title: 'Docs', to: '/docs/introduction' },
]

const socialLinks: SocialLink[] = [
  { icon: 'x', href: 'https://twitter.com/me_jd_solanki' },
  { icon: 'github', href: 'https://github.com/jd-solanki/nuxtpress' },
]

export default defineAppConfig({
  nuxtPress: {
    title: 'NuxtPress',
    logoSrc: '/images/NuxtPress.png',
    rootLinkTo: '/',
    header: {
      links: headerLinks,
      socialLinks,
    },
  },
})
