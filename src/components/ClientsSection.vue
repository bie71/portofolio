<template>
  <section id="clients" class="bg-slate-800 pt-36 pb-32 dark:bg-slate-300">
    <div class="container">
      <div class="w-full px-4">
        <div class="mx-auto mb-16 text-center">
          <h4 class="mb-2 text-lg font-semibold uppercase text-primary">{{ store.data.clients.title }}</h4>
          <h2 class="mb-4 text-3xl font-bold text-white dark:text-dark sm:text-4xl lg:text-5xl">
            {{ store.data.clients.subtitle }}
          </h2>
          <p class="text-md font-medium text-secondary md:text-lg">
            {{ store.data.clients.description }}
          </p>
        </div>
      </div>

      <div class="w-full px-4">
        <div class="flex flex-wrap items-center justify-center">
          <a
            v-for="(client, index) in store.data.clients.items"
            :key="client.id || index"
            :href="client.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
          >
            <img :src="assetUrl(client.logo, index)" :alt="client.name" class="w-full" />
          </a>
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
  const fallback = store.defaultSiteData.clients.items[index]?.logo;
  return resolveAssetUrl(fallback);
};
</script>
