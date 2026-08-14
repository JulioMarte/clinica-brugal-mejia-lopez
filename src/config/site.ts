export const siteConfig = {
  name: 'Melosa Clínica Brugal',
  shortName: 'Clínica Brugal',
  description:
    'Clínica privada en Puerto Plata con atención médica especializada, emergencias, diagnóstico y servicios hospitalarios.',
  tagline: 'Cuidarte es amarte.',
  philosophy: 'Medicina especializada con trato humano personalizado.',
  phoneDisplay: '(809) 586-2519',
  phoneHref: 'tel:+18095862519',
  address: 'Calle José del Carmen Ariza #15, Puerto Plata, República Dominicana',
  locale: 'es_DO',
  language: 'es',
} as const;

export const primaryNavigation = [
  { label: 'Médicos', href: '/medicos/' },
  { label: 'Especialidades', href: '/especialidades/' },
  { label: 'Servicios', href: '/servicios/' },
  { label: 'Pacientes', href: '/pacientes/' },
  { label: 'Nosotros', href: '/nosotros/' },
] as const;
