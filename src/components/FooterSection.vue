<template>
  <footer class="bg-dark pt-24 pb-12">
    <div class="container">
      <div class="flex flex-wrap">
        <div class="mb-12 w-full px-4 font-medium text-slate-300 md:w-1/3">
          <h2 class="mb-5 text-4xl font-bold text-white duration-500 hover:-translate-y-1 hover:text-primary">
            {{ store.data.brand.name }}
          </h2>
          <h3 class="mb-2 text-2xl font-bold text-white">Hubungi Kami</h3>
          <p>
            <a :href="`mailto:${store.data.footer.email}`" target="_blank" class="hover:text-primary">
              <img :src="gmailIconUrl" alt="gmail" class="mr-2 inline-block w-[20px]" />
              {{ store.data.footer.email }}
            </a>
          </p>
          <p class="mt-2">
            <img :src="locationIconUrl" alt="location" class="mr-2 inline-block w-[20px]" />
            {{ store.data.footer.location }}
          </p>
          <div class="p-3">
            <iframe
              class="maps rounded-lg"
              loading="lazy"
              allowfullscreen
              :src="store.data.footer.mapUrl"
            ></iframe>
          </div>
        </div>

        <div class="mb-12 w-full px-4 md:w-1/3">
          <h3 class="mb-5 text-xl font-semibold text-white">Kategori Tulisan</h3>
          <ul class="text-slate-300">
            <li v-for="category in store.data.blog.categories" :key="category">
              <span class="mb-3 inline-block text-base">{{ category }}</span>
            </li>
          </ul>
        </div>

        <div class="mb-12 w-full px-4 md:w-1/3">
          <h3 class="mb-5 text-xl font-semibold text-white">Tautan</h3>
          <ul class="text-slate-300">
            <li v-for="link in store.data.navLinks" :key="link.target">
              <a :href="`#${link.target}`" class="mb-3 inline-block text-base hover:text-primary">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-full border-t border-slate-700 pt-10">
        <p class="text-medium text-center text-xs text-slate-400">
          Dibuat Dengan <span class="text-lg text-pink-500">♥</span>
          <a href="https://github.com/bie71" target="_blank" class="font-bold text-primary">Habibi</a>
          Menggunakan
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="font-bold text-sky-500">
            Tailwind CSS
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSiteStore } from '../stores/site';
import { resolveAssetUrl } from '../utils/assets';

const store = useSiteStore();
const gmailIconUrl = resolveAssetUrl('img/icon/gmail.svg');
const locationIconUrl = resolveAssetUrl('img/icon/location.svg');
</script>
