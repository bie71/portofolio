<template>
  <section id="home" class="bg-transparent pt-36 backdrop-blur-sm dark:bg-dark dark:bg-opacity-80">
    <div class="container">
      <div ref="wrapperEl" class="div-RL flex flex-wrap">
        <div class="w-full self-center px-4 lg:w-1/2">
          <h1 class="text-base font-semibold text-primary md:text-xl">
            {{ store.data.hero.greeting }}
            <span ref="nameEl" class="mt-1 block text-4xl font-bold text-dark dark:text-white lg:text-5xl">
              {{ store.data.hero.name }}
            </span>
          </h1>
          <h2 ref="subtitleEl" class="mb-5 text-lg font-medium text-secondary dark:text-third lg:text-2xl">
            <span v-if="primaryRole">{{ primaryRole }}</span>
            <template v-for="role in otherRoles" :key="role">
              <span class="px-1">|</span>
              <span class="text-dark dark:text-white">{{ role }}</span>
            </template>
          </h2>
          <p class="mb-8 font-medium leading-relaxed text-secondary dark:text-third">
            {{ store.data.hero.description }}
          </p>

          <a
            :href="store.data.hero.cta.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-xl bg-primary py-3 px-8 text-base font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg"
          >
            <img :src="ctaIconUrl" alt="whatsapp" class="-ml-4 mr-2 w-11" />
            {{ store.data.hero.cta.text }}
          </a>
        </div>

        <div class="mt-10 w-full self-end px-4 md:mt-0 lg:w-1/2">
          <div class="relative mt-10 lg:right-0 lg:mt-9">
            <img
              ref="imageEl"
              :src="heroImageUrl"
              alt="hero"
              class="imghabibi relative z-10 mx-auto mb-5 max-w-full rounded-3xl drop-shadow-lg hover:-translate-y-2 hover:drop-shadow-2xl dark:shadow-slate-400"
            />
            <span class="absolute bottom-20 left-1/2 -translate-x-1/2 md:scale-125">
              <svg
                class="drop-shadow-md"
                width="400"
                height="400"
                viewBox="0 0 200 200"
                fill-opacity="0.8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  :fill="store.data.hero.backgroundShapeColor"
                  d="M33.3,-50.9C47.6,-49.5,66.5,-49.4,75.6,-41.1C84.8,-32.9,84.3,-16.4,81.6,-1.6C78.9,13.3,74,26.6,65.8,36.5C57.5,46.4,45.9,52.9,34.4,60C22.9,67.1,11.4,74.9,0.2,74.5C-11,74.1,-22,65.7,-34.9,59.4C-47.8,53,-62.6,48.8,-71.2,39.3C-79.8,29.8,-82.2,14.9,-80.3,1.1C-78.5,-12.7,-72.3,-25.5,-66.1,-39.1C-59.9,-52.8,-53.6,-67.4,-42.6,-70.7C-31.6,-74,-15.8,-65.9,-3.1,-60.5C9.6,-55.1,19.1,-52.4,33.3,-50.9Z"
                  transform="translate(100 100) scale(1.2)"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { useSiteStore } from '../stores/site';
import { resolveAssetUrl } from '../utils/assets';

const store = useSiteStore();

const nameEl = ref(null);
const subtitleEl = ref(null);
const imageEl = ref(null);
const wrapperEl = ref(null);

const roles = computed(() => store.data.hero.roles || []);
const primaryRole = computed(() => roles.value[0] || '');
const otherRoles = computed(() => roles.value.slice(1));
const heroImageUrl = computed(() => resolveAssetUrl(store.data.hero.heroImage) || resolveAssetUrl(store.defaultSiteData.hero.heroImage));
const ctaIconUrl = computed(() => resolveAssetUrl(store.data.hero.cta?.icon) || resolveAssetUrl(store.defaultSiteData.hero.cta.icon));

onMounted(() => {
  if (wrapperEl.value) {
    wrapperEl.value.classList.add('div-show');
  }

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(TextPlugin);

    if (nameEl.value) {
      gsap.to(nameEl.value, {
        duration: 1.5,
        delay: 1.2,
        text: store.data.hero.name,
      });
    }

    if (subtitleEl.value) {
      gsap.from(subtitleEl.value, {
        duration: 1.5,
        delay: 1.2,
        x: -200,
        opacity: 0,
        ease: 'back',
      });
    }

    if (imageEl.value) {
      gsap.from(imageEl.value, {
        duration: 1.5,
        delay: 1,
        opacity: 0,
        y: -100,
        ease: 'elastic',
      });
    }
  }
});
</script>
