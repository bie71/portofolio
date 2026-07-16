<template>
  <section id="blog" class="relative bg-slate-50 pt-36 pb-32 transition-colors duration-300 dark:bg-[#030014]/80 overflow-hidden">
    <!-- Dot background element -->
    <div class="absolute inset-0 bg-[radial-gradient(#0f62fe05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

    <div class="container relative z-10">
      <div class="w-full px-4">
        <div class="mx-auto mb-16 max-w-xl text-center">
          <h4 class="mb-2 text-lg font-semibold uppercase tracking-wider text-primary">{{ store.data.blog.title }}</h4>
          <h2 class="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl tracking-tight">
            {{ store.data.blog.subtitle }}
          </h2>
          <p class="text-md font-medium text-slate-500 dark:text-slate-400 md:text-lg">
            {{ store.data.blog.description }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap justify-center">
        <div
          v-for="(item, index) in store.data.blog.items"
          :key="item.id || index"
          class="w-full px-4 md:w-1/2 lg:w-1/3"
          data-aos="fade-up"
          :data-aos-delay="(index + 1) * 100"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div class="group mb-10 overflow-hidden rounded-3xl border bg-white/40 border-slate-200/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 dark:bg-slate-950/40 dark:border-slate-800/80 dark:hover:border-primary/50 dark:hover:shadow-[0_0_40px_rgba(15,98,254,0.12)] transition-all duration-500 backdrop-blur-md">
            <div class="overflow-hidden aspect-video">
              <img :src="assetUrl(item.image, index)" :alt="item.title" class="w-full h-full object-cover duration-500 ease-in-out group-hover:scale-105" />
            </div>
            <div class="py-8 px-6">
              <h3>
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mb-3 block truncate text-xl font-bold text-slate-900 transition duration-300 hover:text-primary dark:text-white"
                >
                  {{ item.title }}
                </a>
              </h3>
              <p class="mb-6 text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed h-12 overflow-hidden line-clamp-2">
                {{ item.description }}
              </p>
              <a
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center rounded-xl bg-primary py-2.5 px-5 text-sm font-bold text-white shadow-sm transition duration-300 hover:opacity-90 hover:shadow-lg"
              >
                Baca Selengkapnya
              </a>
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
  const fallback = store.defaultSiteData.blog.items[index]?.image;
  return resolveAssetUrl(fallback);
};
</script>
