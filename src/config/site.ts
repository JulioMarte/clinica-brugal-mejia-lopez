import { copy } from '../lib/copy';

export const siteConfig = {
  name: copy('site.name'),
  shortName: copy('site.short_name'),
  description: copy('site.description'),
  tagline: copy('site.tagline'),
  philosophy: copy('site.philosophy'),
  phoneDisplay: '(809) 586-2519',
  phoneHref: 'tel:+18095862519',
  address: 'Calle José del Carmen Ariza #15, Puerto Plata, República Dominicana',
  locale: 'es_DO',
  language: 'es',
} as const;

export const primaryNavigation = [
  { label: copy('nav.doctors'), href: '/medicos/' },
  { label: copy('nav.specialties'), href: '/especialidades/' },
  { label: copy('nav.services'), href: '/servicios/' },
  { label: copy('nav.patients'), href: '/pacientes/' },
  { label: copy('nav.about'), href: '/nosotros/' },
] as const;
