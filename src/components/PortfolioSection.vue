<template>
  <section id="portfolio" class="relative bg-slate-50 pt-36 pb-32 transition-colors duration-300 dark:bg-[#030014] overflow-hidden">
    <!-- Grid Overlay for Futuristic Tech Look -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#0f62fe08_1px,transparent_1px),linear-gradient(to_bottom,#0f62fe08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
    <div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0"></div>
    <div class="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>

    <div class="container relative z-10">
      <div class="w-full px-4">
        <div class="mx-auto mb-16 max-w-xl text-center">
          <h4 class="mb-2 text-lg font-semibold uppercase tracking-wider text-primary">{{ store.data.portfolio.title }}</h4>
          <h2 class="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl tracking-tight">
            {{ store.data.portfolio.subtitle }}
          </h2>
          <p class="text-md font-medium text-slate-500 dark:text-slate-400 md:text-lg">
            {{ store.data.portfolio.description }}
          </p>
        </div>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <div
          v-for="(item, index) in store.data.portfolio.items"
          :key="item.id || index"
          :class="[
            'group relative rounded-3xl overflow-hidden border p-6 transition-all duration-500 backdrop-blur-md flex flex-col justify-between',
            // Custom Grid Spanning for Bento Grid Layout
            index === 0 ? 'md:col-span-2 lg:col-span-3 min-h-[350px] lg:flex-row' : '',
            index === 4 || index === 5 ? 'md:col-span-2 min-h-[400px] lg:min-h-[450px]' : 'col-span-1 min-h-[380px]',
            // Color Themes
            'bg-white/40 border-slate-200/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 dark:bg-slate-950/40 dark:border-slate-800/80 dark:hover:border-primary/50 dark:hover:shadow-[0_0_40px_rgba(15,98,254,0.12)]'
          ]"
          data-aos="fade-up"
          data-aos-duration="1000"
          :data-aos-delay="(index % 3) * 100"
          data-aos-once="true"
        >
          <!-- Radial hover glow effect for dark mode -->
          <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <!-- Card Content Wrapper -->
          <div :class="['flex flex-col justify-between h-full w-full', index === 0 ? 'lg:flex-row lg:gap-8 lg:items-center' : '']">
            <!-- Project Text Details -->
            <div :class="[index === 0 ? 'lg:w-1/2 flex flex-col justify-center' : 'w-full']">
              <!-- Category / Tech Badges -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in (item.tags || getFallbackTags(item.title))"
                  :key="tag"
                  class="text-xs font-semibold px-3 py-1 rounded-full border bg-slate-100/80 border-slate-200/60 text-slate-600 dark:bg-slate-900/60 dark:border-slate-800/80 dark:text-slate-300"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Title & External Link -->
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                <a :href="item.link" target="_blank" rel="noopener noreferrer" class="focus:outline-none">
                  {{ item.title }}
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </h3>

              <!-- Description -->
              <p class="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                {{ item.description }}
              </p>

              <!-- CTA / GitHub Link Button -->
              <a
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-bold text-primary group/link hover:underline mt-auto"
              >
                Explore Repository
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <!-- Project Image Mockup -->
            <div :class="[
              'relative rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-inner group-hover:shadow-2xl transition-all duration-500 z-10 flex-shrink-0',
              index === 0 ? 'mt-6 lg:mt-0 lg:w-1/2 aspect-video' : 'mt-6 w-full aspect-video'
            ]">
              <img
                :src="assetUrl(item.image, index)"
                :alt="item.title"
                class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <!-- Dark overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '../stores/site';
import { resolveAssetUrl } from '../utils/assets';

const store = useSiteStore();

const assetUrl = (path, index) => {
  const resolved = resolveAssetUrl(path);
  if (resolved) return resolved;
  const fallback = store.defaultSiteData.portfolio.items[index]?.image;
  return resolveAssetUrl(fallback);
};

const getFallbackTags = (title) => {
  const t = title.toLowerCase();
  if (t.includes('music')) return ['Node.js', 'PostgreSQL', 'Redis'];
  if (t.includes('game')) return ['Golang', 'Clean Arch', 'PostgreSQL'];
  if (t.includes('meeting') || t.includes('room')) return ['Golang', 'Fiber', 'Supabase'];
  if (t.includes('gudang')) return ['React Native', 'Expo', 'SQLite'];
  if (t.includes('kumpul') || t.includes('meetup')) return ['React Native', 'Expo', 'Supabase'];
  if (t.includes('seller')) return ['Vue 3', 'Golang', 'PostgreSQL'];
  return ['Web Dev', 'API'];
};
</script>
