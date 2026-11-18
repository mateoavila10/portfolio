// Lista de proyectos. Se muestran en este orden y se numeran solos (01, 02, 03...).
//
// Campos:
//   name        nombre del proyecto
//   pitch       una línea que resume qué es
//   description párrafo corto
//   features    lista de funciones destacadas
//   tags        tecnologías
//   private     true = código privado (muestra la etiqueta y no muestra botón)
//   url         link para visitar (dejalo vacío si no hay)
//   urlLabel    texto del botón
//   image       ruta a una captura dentro de /public/projects (ej: '/projects/padel.webp').
//               Si está vacío, se muestra un placeholder.

export const projects = [
  {
    name: 'Padel SaaS',
    pitch: 'Plataforma multi-club para gestionar clubes de pádel.',
    description:
      'Cada club entra a su propio espacio y ve solo sus datos. El foco estuvo en que las reservas sean confiables cuando mucha gente reserva a la vez y en tratar con cuidado los datos sensibles.',
    features: [
      'Reservas sin solapamientos mediante transacciones serializables',
      'Modo TV en tiempo real con Server-Sent Events (SSE)',
      'Tokens de Mercado Pago cifrados con AES-256-GCM',
      'Registro de auditoría de las acciones importantes',
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'Express', 'Prisma', 'MySQL', 'Redis', 'Docker'],
    private: true,
    url: '',
    urlLabel: '',
    image: '',
  },
  {
    name: 'Tucumán BB',
    pitch: 'Sistema de gestión para un club deportivo.',
    description:
      'Reemplaza planillas sueltas por un sistema con jugadores, socios, cuotas y caja. Cada rol ve y puede hacer solo lo que le corresponde.',
    features: [
      'Jugadores y socios, con cuotas e historial de precios',
      'Pagos parciales o con método mixto, y caja diaria',
      'Permisos por rol con Row Level Security',
      'Edge Function para crear usuarios de forma segura',
      'Importador del Excel que ya usaba el club',
    ],
    tags: ['React', 'Vite', 'Tailwind', 'TanStack Query', 'Zod', 'Supabase', 'PostgreSQL'],
    private: true,
    url: '',
    urlLabel: '',
    image: '',
  },
  {
    name: 'Panel de sucursales',
    pitch: 'Dashboard de ingresos y egresos de varias sucursales.',
    description:
      'Reúne los movimientos de cada sucursal en un solo lugar y los muestra en gráficos para comparar y seguir su evolución.',
    features: [
      'Ingresos y egresos por sucursal',
      'Gráficos comparativos con Recharts',
      'API propia con Node.js y Express sobre MySQL',
    ],
    tags: ['React 19', 'Vite', 'Recharts', 'Node.js', 'Express', 'MySQL', 'Railway'],
    private: true,
    url: '',
    urlLabel: '',
    image: '',
  },
  {
    name: 'Sinergia Rent a Car',
    pitch: 'Sitio comercial para alquiler de autos con reservas por WhatsApp.',
    description:
      'El cliente elige un auto o un combo con hotel y la reserva llega directo por WhatsApp. El negocio administra las reservas desde un panel propio.',
    features: [
      'Reservas por WhatsApp: solo auto o combo con hotel',
      'Clima en tiempo real con la API de OpenWeather',
      'Panel de administración de reservas',
    ],
    tags: ['React', 'Vite', 'React Router', 'Node.js', 'Express', 'MySQL'],
    private: false,
    url: 'https://github.com/mateoavila10/Sinergia-Rent-a-Car',
    urlLabel: 'Ver código en GitHub',
    image: '',
  },
  {
    name: 'Strivo',
    pitch: 'Sitio web publicado en Vercel.',
    // [COMPLETAR] ampliá la descripción, las funciones y las tecnologías de Strivo
    description: '[COMPLETAR] Qué es Strivo, para quién es y qué problema resuelve.',
    features: [],
    tags: ['Vercel'],
    private: false,
    url: 'https://strivol.vercel.app',
    urlLabel: 'Visitar sitio',
    image: '',
  },
]
