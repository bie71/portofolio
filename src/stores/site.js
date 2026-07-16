import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const STORAGE_KEY = 'portfolio-site-data-v5';
const THEME_KEY = 'portfolio-theme';

const defaultSiteData = {
  brand: {
    name: 'Bie77',
    logo: '/img/logo.png',
  },
  navLinks: [
    { label: 'Beranda', target: 'home' },
    { label: 'Tentang Saya', target: 'about' },
    { label: 'Portfolio', target: 'portfolio' },
    { label: 'Blog', target: 'blog' },
    { label: 'Contact', target: 'contact' },
  ],
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/bie71', icon: 'github' },
    { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/biie.7', icon: 'instagram' },
    { id: 'facebook', label: 'Facebook', url: 'https://facebook.com/77.bie', icon: 'facebook' },
    { id: 'discord', label: 'Discord', url: 'https://discord.gg/XSYM4Pvh', icon: 'discord' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/77habibi/', icon: 'linkedin' },
  ],
  hero: {
    greeting: 'Halo Semua 👋, Saya',
    name: 'Habibi',
    roles: ['Software Developer'],
    subtitle: 'Membangun aplikasi mobile offline-first dan sistem backend tangguh.',
    description: 'Membangun aplikasi mobile offline-first, sistem pelacakan real-time, dan arsitektur backend tangguh yang siap mendukung skala bisnis Anda.',
    cta: {
      text: 'Hubungi via Email',
      href: 'mailto:bie77.habibi@gmail.com?subject=Tawaran%20Kolaborasi',
      icon: '/img/icon/gmail.svg',
    },
    heroImage: '/img/boy.png',
    backgroundShapeColor: '#0F62FE',
  },
  about: {
    title: 'Tentang Saya',
    heading: 'Menghubungkan Ide Bisnis dengan Solusi Perangkat Lunak',
    description:
      'Saya adalah Software Engineer yang berdedikasi membangun aplikasi web dan mobile berskala produksi. Dengan spesialisasi di Golang, Node.js, dan React Native, saya merancang arsitektur aplikasi bersih (Clean Architecture), sistem sinkronisasi asinkron, pelacakan lokasi real-time, serta basis data offline-first yang andal untuk menyelesaikan masalah nyata.',
    friendTitle: 'Mari Berkolaborasi 🤝',
    friendDescription:
      'Apakah Anda memiliki ide produk menarik, membutuhkan pengembang untuk memperkuat tim Anda, atau sekadar ingin berdiskusi teknologi? Hubungi saya sekarang.',
  },
  portfolio: {
    title: 'Portfolio',
    subtitle: 'Project Pilihan',
    description: 'Beberapa karya dan eksperimen terbaru.',
    items: [
      {
        id: 'project-1',
        title: 'Personal Web Portfolio',
        description: 'Web portfolio modern berbasis Vue 3 dan Tailwind CSS dengan dark mode, custom GSAP animations, dan bento grid layout yang responsif.',
        image: '/img/foto/web-portofolio.png',
        link: 'https://github.com/bie71/portofolio',
        tags: ['Vue 3', 'Vite', 'Tailwind CSS', 'GSAP', 'AOS'],
      },
      {
        id: 'project-2',
        title: 'Open Music API',
        description: 'RESTful API untuk platform musik dengan fitur autentikasi JWT, kolaborasi, unggah gambar, dan ekspor album berbasis antrean pesan.',
        image: '/img/foto/Open-music-api.png',
        link: 'https://github.com/bie71/open_music_api',
        tags: ['Node.js', 'PostgreSQL', 'Redis', 'JWT', 'RabbitMQ'],
      },
      {
        id: 'project-3',
        title: 'Application Game Store',
        description: 'Aplikasi pengelola kupon game otomatis dengan arsitektur bersih (Clean Architecture) untuk pembuatan prefix kode, kriteria diskon, dan minimum pembelian.',
        image: '/img/foto/Game-store.png',
        link: 'https://github.com/bie71/assignment-final-project',
        tags: ['Golang', 'Clean Arch', 'PostgreSQL', 'Gorm'],
      },
      {
        id: 'project-4',
        title: 'eMeeting - Room Booking System',
        description: 'Sistem pemesanan ruang rapat tangguh dengan Fiber router, integrasi Supabase Database, konfigurasi Viper, dan dokumentasi Swagger UI otomatis.',
        image: '/img/foto/emeeting.png',
        link: 'https://github.com/bie71/e-meeting',
        tags: ['Golang', 'Fiber', 'Supabase', 'Swagger', 'Postman'],
      },
      {
        id: 'project-5',
        title: 'Gudang App',
        description: 'Aplikasi inventori offline-first dengan progres stok visual, asisten profit margin cerdas (AI), sinkronisasi asinkron 2 arah Google Sheets, dan pelaporan PDF/CSV.',
        image: '/img/foto/gudang-app.png',
        link: 'https://github.com/bie71/gudang-app',
        tags: ['React Native', 'Expo', 'SQLite', 'Google Sheets', 'PDF Export'],
      },
      {
        id: 'project-6',
        title: 'KumpulKuy Meetup Coordinator',
        description: 'Platform koordinasi janji temu real-time terintegrasi LeafletJS Map, rute jalan OSRM, pelacakan GPS latar belakang, dan obrolan grup dengan status centang baca (✓✓).',
        image: '/img/foto/kumpulkuy.png',
        link: 'https://github.com/bie71/kumpulkuy',
        tags: ['React Native', 'Expo SDK 57', 'Supabase Realtime', 'LeafletJS', 'OSRM API'],
      },
      {
        id: 'project-7',
        title: 'SmartSeller Lite',
        description: 'Manajer pesanan ritel & dropship untuk melacak transaksi penjualan harian, mengoordinasikan pesanan supplier, dan menganalisis performa laba bersih.',
        image: '/img/foto/smartseller.png',
        link: 'https://github.com/bie71/smartseller-lite',
        tags: ['Vue 3', 'Golang', 'PostgreSQL', 'Dropship Management'],
      },
    ],
  },
  clients: {
    title: 'Clients',
    subtitle: 'Yang Pernah Bekerja Sama',
    description: 'Hanya Sebagai Contoh',
    items: [
      { id: 'gojek', name: 'Gojek', url: 'https://gojek.com', logo: '/img/clients/gojek.svg' },
      { id: 'grab', name: 'Grab', url: 'https://grab.com', logo: '/img/clients/grab.svg' },
      { id: 'google', name: 'Google', url: 'https://google.com', logo: '/img/clients/google.svg' },
      { id: 'bukalapak', name: 'Bukalapak', url: 'https://bukalapak.com', logo: '/img/clients/bukalapak.svg' },
      { id: 'tokopedia', name: 'Tokopedia', url: 'https://tokopedia.com', logo: '/img/clients/tokopedia.svg' },
    ],
  },
  blog: {
    title: 'Blog',
    subtitle: 'Tulisan Terkini',
    description: 'Berikut Adalah Beberapa Rekomendasi Artikel Yang Bisa Dibaca',
    items: [
      {
        id: 'blog-1',
        title: 'Tips Belajar Programming',
        description:
          'Belajar pemrograman itu mudah jika tahu langkahnya. Artikel ini merangkum tips praktis agar lebih konsisten belajar.',
        image: '/img/foto/programming.jpg',
        link: 'https://www.petanikode.com/tips-belajar-pemrograman/',
      },
      {
        id: 'blog-2',
        title: 'Mengenal Ekosistem Node.js',
        description:
          'Ringkasan tooling dan library penting di Node.js untuk membangun layanan backend yang siap produksi.',
        image: '/img/foto/keyboard.jpg',
        link: 'https://nodejs.org/en/learn',
      },
      {
        id: 'blog-3',
        title: 'Belajar Dasar Tailwind CSS',
        description:
          'Tailwind CSS mempermudah styling modern. Baca panduan ini untuk memahami utility class penting.',
        image: '/img/foto/coffee.jpg',
        link: 'https://tailwindcss.com/docs/utility-first',
      },
    ],
    categories: ['Programming', 'Teknologi', 'Gaya Hidup'],
  },
  contact: {
    title: 'Contact',
    subtitle: 'Hubungi Kami',
    description: 'Silakan Isi Dengan Sesuai Format',
    scriptUrl:
      'https://script.google.com/macros/s/AKfycbyKS-gHzhkmTulHFq1HYfCCgz5emp7Ph0_sJSFgs-fnb0w6yDQQrky21c1m6NMRLaHN/exec',
    fields: [
      { id: 'name', label: 'Nama', type: 'text', name: 'nama', placeholder: 'Nama', required: true },
      { id: 'email', label: 'Email', type: 'email', name: 'email', placeholder: 'Email', required: true },
      { id: 'tel', label: 'Telepon', type: 'tel', name: 'telepon', placeholder: 'Telepon', required: true },
      {
        id: 'message',
        label: 'Pesan',
        type: 'textarea',
        name: 'pesan',
        placeholder: 'Pesan',
        required: true,
      },
    ],
    submitText: 'Kirim',
  },
  footer: {
    email: 'bie77.habibi@gmail.com',
    location: 'Jl. Ciracas - Kaujon Serang , Banten - ID',
    mapUrl:
      'https://www.google.com/maps/embed/v1/search?q=Serang%2C%20Banten%2C%20Indonesia&key=AIzaSyDL8-6fm0ERCGcH6GQrBHxzxGIWhWfZTgo',
  },
};

const clone = (value) => {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value));
};

const isBlank = (value) => typeof value === 'string' && value.trim().length === 0;

const normalizeAssetPath = (value) => {
  if (value === undefined || value === null) return value;
  if (typeof value === 'string') {
    if (isBlank(value)) return undefined;
    const trimmed = value.trim();
    if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:')) return trimmed;
    const sanitized = trimmed.replace(/^\/+/, '');
    return `/${sanitized}`;
  }
  return value;
};

const normalizeSocialIcon = (icon) => {
  if (icon === undefined || icon === null) return icon;
  if (typeof icon !== 'string') return icon;
  if (isBlank(icon)) return undefined;
  return icon.includes('/') ? normalizeAssetPath(icon) : icon.trim();
};

const mergeSection = (defaults, overrides) => {
  if (Array.isArray(defaults)) {
    return Array.isArray(overrides) ? clone(overrides) : clone(defaults);
  }

  if (defaults && typeof defaults === 'object') {
    return {
      ...clone(defaults),
      ...(overrides && typeof overrides === 'object' ? clone(overrides) : {}),
    };
  }

  return overrides !== undefined ? clone(overrides) : clone(defaults);
};

const mergeData = (overrides) => {
  const result = clone(defaultSiteData);

  if (!overrides || typeof overrides !== 'object') {
    return result;
  }

  Object.entries(overrides).forEach(([key, value]) => {
    if (!(key in defaultSiteData)) {
      result[key] = clone(value);
      return;
    }

    result[key] = mergeSection(defaultSiteData[key], value);
  });

  return result;
};

const normalizeData = (rawData) => {
  const data = mergeData(rawData);

  if (data.brand) {
    const resolvedLogo = normalizeAssetPath(data.brand.logo);
    data.brand.logo = resolvedLogo || defaultSiteData.brand.logo;
  }

  if (data.hero) {
    const resolvedHeroImage = normalizeAssetPath(data.hero.heroImage);
    data.hero.heroImage = resolvedHeroImage || defaultSiteData.hero.heroImage;
    if (data.hero.cta) {
      const resolvedCtaIcon = normalizeAssetPath(data.hero.cta.icon);
      data.hero.cta.icon = resolvedCtaIcon || defaultSiteData.hero.cta.icon;
    }
  }

  if (Array.isArray(data.socials)) {
    data.socials = data.socials.map((item) => ({
      ...item,
      icon: normalizeSocialIcon(item.icon),
    }));
  }

  if (data.portfolio?.items) {
    data.portfolio.items = data.portfolio.items.map((item, index) => {
      const resolvedImage = normalizeAssetPath(item.image);
      const fallback = defaultSiteData.portfolio.items[index]?.image;
      return {
        ...item,
        image: resolvedImage || normalizeAssetPath(fallback) || resolvedImage,
      };
    });
  }

  if (data.clients?.items) {
    data.clients.items = data.clients.items.map((item, index) => {
      const resolvedLogo = normalizeAssetPath(item.logo);
      const fallback = defaultSiteData.clients.items[index]?.logo;
      return {
        ...item,
        logo: resolvedLogo || normalizeAssetPath(fallback) || resolvedLogo,
      };
    });
  }

  if (data.blog?.items) {
    data.blog.items = data.blog.items.map((item, index) => {
      const resolvedImage = normalizeAssetPath(item.image);
      const fallback = defaultSiteData.blog.items[index]?.image;
      return {
        ...item,
        image: resolvedImage || normalizeAssetPath(fallback) || resolvedImage,
      };
    });
  }

  return data;
};

const loadData = () => {
  if (typeof window === 'undefined') {
    return normalizeData();
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return normalizeData(parsed);
    }
  } catch (error) {
    console.warn('Failed to read site data from storage', error);
  }

  return normalizeData();
};

const loadTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }

  return 'dark';
};

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const useSiteStore = defineStore('site', () => {
  const data = ref(loadData());
  const theme = ref(loadTheme());

  const isDark = computed(() => theme.value === 'dark');

  const persistData = (value) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  };

  const persistTheme = (value) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(THEME_KEY, value);
  };

  watch(
    data,
    (value) => {
      const normalized = normalizeData(value);
      if (!deepEqual(value, normalized)) {
        data.value = normalized;
        return;
      }
      persistData(value);
    },
    { deep: true }
  );

  watch(
    theme,
    (value) => {
      persistTheme(value);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', value === 'dark');
      }
    },
    { immediate: true }
  );

  const setTheme = (value) => {
    theme.value = value === 'dark' ? 'dark' : 'light';
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  const updateSection = (section, payload) => {
    data.value = normalizeData({
      ...data.value,
      [section]: mergeSection(defaultSiteData[section], payload),
    });
  };

  const replaceData = (nextData) => {
    data.value = normalizeData(nextData);
  };

  const resetData = () => {
    data.value = normalizeData();
  };

  return {
    data,
    isDark,
    theme,
    toggleTheme,
    setTheme,
    updateSection,
    replaceData,
    resetData,
    defaultSiteData: clone(defaultSiteData),
  };
});
