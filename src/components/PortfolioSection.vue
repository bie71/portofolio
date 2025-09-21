<template>
  <section id="portfolio" class="bg-slate-100 pt-36 pb-32 dark:bg-dark">
    <div class="container">
      <div class="w-full px-4">
        <div class="mx-auto mb-16 max-w-xl text-center">
          <h4 class="mb-2 text-lg font-semibold uppercase text-primary">{{ store.data.portfolio.title }}</h4>
          <h2 class="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">
            {{ store.data.portfolio.subtitle }}
          </h2>
          <p class="text-md font-medium text-secondary dark:text-third md:text-lg">
            {{ store.data.portfolio.description }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div
          v-for="(item, index) in store.data.portfolio.items"
          :key="item.id || index"
          class="px-4 md:w-1/2"
          data-aos="fade-down"
          data-aos-duration="1000"
          :data-aos-delay="index % 2 === 0 ? 0 : 100"
          data-aos-easing="ease-in-out"
        >
          <div class="mb-12 rounded-xl p-4 duration-300 ease-in-out hover:shadow-xl hover:ring-2 hover:ring-primary">
            <div class="overflow-hidden rounded-md shadow-md">
              <img :src="assetUrl(item.image, index)" :alt="item.title" class="w-full duration-300 ease-linear hover:scale-110" />
            </div>
            <h3 class="mt-5 mb-4 text-xl font-semibold text-dark dark:text-white">
              <a :href="item.link" target="_blank" rel="noopener noreferrer" class="hover:text-primary">
                {{ item.title }}
              </a>
            </h3>
            <p class="text-base font-medium text-secondary dark:text-third">
              {{ item.description }}
            </p>
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
</script>
