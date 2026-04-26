export type NavKey = 'home' | 'about' | 'services' | 'blog' | 'contacts';

export const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/pro-nas' },
  { key: 'services', href: '/ekspertyza' },
  { key: 'blog', href: '/analityka' },
  { key: 'contacts', href: '/kontakty' }
];
