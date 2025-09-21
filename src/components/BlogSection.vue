<template>
  <section id="blog" class="bg-slate-100 pt-36 pb-32 dark:bg-dark">
    <div class="container">
      <div class="w-full px-4">
        <div class="mx-auto mb-16 max-w-xl text-center">
          <h4 class="mb-2 text-lg font-semibold uppercase text-primary">{{ store.data.blog.title }}</h4>
          <h2 class="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">
            {{ store.data.blog.subtitle }}
          </h2>
          <p class="text-md font-medium text-secondary dark:text-third md:text-lg">
            {{ store.data.blog.description }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div
          v-for="(item, index) in store.data.blog.items"
          :key="item.id || index"
          class="w-full px-4 lg:w-1/2 xl:w-1/3"
          data-aos="zoom-in-down"
          :data-aos-delay="(index + 1) * 50"
          data-aos-duration="1000"
        >
          <div class="mb-10 overflow-hidden rounded-xl bg-white shadow-lg duration-300 ease-in-out hover:ring-2 hover:ring-primary dark:bg-slate-700">
            <img :src="assetUrl(item.image, index)" :alt="item.title" class="w-full duration-200 ease-in-out hover:scale-110" />
            <div class="py-8 px-6">
              <h3>
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mb-3 block truncate text-xl font-semibold text-dark transition hover:text-primary dark:text-white"
                >
                  {{ item.title }}
                </a>
              </h3>
              <p class="mb-6 text-base font-medium text-secondary dark:text-third">
                {{ item.description }}
              </p>
              <a
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg"
              >
                Baca Selengkapnya..
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
