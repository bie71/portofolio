<template>
  <section id="about" class="bg-transparent pt-35 pb-32 backdrop-blur-sm dark:bg-dark dark:bg-opacity-80">
    <div class="container">
      <div class="flex flex-wrap">
        <div ref="leftEl" class="about-left mb-10 w-full px-4 lg:w-1/2">
          <h4 class="mb-3 text-lg font-bold uppercase text-primary">{{ store.data.about.title }}</h4>
          <h2 class="mb-5 max-w-md text-3xl font-bold text-dark dark:text-white lg:text-4xl">
            {{ store.data.about.heading }}
          </h2>
          <p class="max-w-xl text-base font-medium text-secondary dark:text-third lg:text-lg">
            {{ store.data.about.description }}
          </p>
        </div>
        <div ref="rightEl" class="about-right w-full px-4 lg:w-1/2">
          <h3 class="mb-4 text-2xl font-semibold text-dark dark:text-white lg:mt-11 lg:text-3xl">
            {{ store.data.about.friendTitle }}
          </h3>
          <p class="mb-6 max-w-xl text-base font-medium text-secondary dark:text-third lg:text-lg">
            {{ store.data.about.friendDescription }}
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <a
              v-for="social in store.data.socials"
              :key="social.id"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-300 transition duration-200 hover:border-primary hover:bg-primary hover:text-white"
            >
              <SocialIcon :icon="social.icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useSiteStore } from '../stores/site';
import SocialIcon from './SocialIcon.vue';

const store = useSiteStore();

const leftEl = ref(null);
const rightEl = ref(null);
let observer;

const handleEntries = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('about-show');
    }
  });
};

onMounted(() => {
  observer = new IntersectionObserver(handleEntries, {
    threshold: 0.25,
    rootMargin: '-10% 0px',
  });

  [leftEl.value, rightEl.value].forEach((el) => {
    if (el) observer.observe(el);
  });
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>
