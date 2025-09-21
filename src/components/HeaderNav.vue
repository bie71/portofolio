<template>
  <header :class="['absolute top-0 left-0 z-50 w-full', { 'navbar-fixed': isSticky }]">
    <div class="container">
      <div class="navnav relative flex items-center justify-around">
        <div class="px-4">
          <a href="#home" @click.prevent="scrollTo('home')">
            <img :src="brandLogoUrl" :alt="store.data.brand.name" class="w-36 drop-shadow-md" />
          </a>
        </div>
        <div class="flex items-center px-4">
          <button
            type="button"
            name="hamburger"
            class="absolute right-4 block lg:hidden"
            @click="toggleMenu"
            :aria-expanded="isMenuOpen"
            aria-controls="nav-menu"
          >
            <span class="hamburger-line origin-top-left transition duration-300 ease-in-out" :class="{ 'rotate-45 translate-y-[10px]': isMenuOpen }"></span>
            <span class="hamburger-line transition duration-300 ease-in-out" :class="{ 'scale-0': isMenuOpen }"></span>
            <span class="hamburger-line origin-bottom-left transition duration-300 ease-in-out" :class="{ '-rotate-45 -translate-y-[10px]': isMenuOpen }"></span>
          </button>

          <nav
            id="nav-menu"
            :class="[
              'absolute right-4 top-full w-full max-w-[250px] origin-top-right rounded-lg bg-white bg-opacity-70 py-5 font-medium shadow-lg transition duration-300 ease-in-out dark:bg-dark dark:shadow-slate-600 lg:static lg:block lg:max-w-full lg:scale-100 lg:bg-transparent lg:uppercase lg:shadow-none lg:dark:bg-transparent',
              isMenuOpen ? 'scale-100' : 'scale-0 lg:scale-100'
            ]"
          >
            <ul class="block lg:flex">
              <li v-for="link in store.data.navLinks" :key="link.target" class="group">
                <a
                  :href="`#${link.target}`"
                  @click.prevent="scrollTo(link.target)"
                  class="mx-8 flex pt-2.5 pb-1.5 text-sm text-dark transition duration-300 group-hover:text-primary dark:text-white lg:mx-4"
                  :class="{ active: activeSection === link.target }"
                >
                  {{ link.label }}
                </a>
              </li>
              <li class="flex items-center">
                <div class="mt-2 ml-6 flex items-center">
                  <img :src="lightIconUrl" alt="light" class="mr-3 h-6 w-6" />
                  <label class="inline-flex cursor-pointer items-center">
                    <input type="checkbox" class="hidden" :checked="store.isDark" @change="store.toggleTheme" />
                    <div class="flex h-5 w-9 items-center rounded-full border-2 border-primary bg-slate-500 p-[2px]">
                      <div
                        class="toggle-circle h-4 w-4 rounded-full bg-white transition duration-300 ease-in-out"
                        :class="{ 'translate-x-3': store.isDark }"
                      ></div>
                    </div>
                  </label>
                  <img :src="darkIconUrl" alt="dark" class="ml-3 h-6 w-6" />
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <div class="medsos hidden items-center justify-center lg:flex">
          <a
            v-for="social in store.data.socials"
            :key="social.id"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg transition duration-200 hover:bg-primary hover:text-white"
          >
            <SocialIcon :icon="social.icon" :size="25" />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useSiteStore } from '../stores/site';
import SocialIcon from './SocialIcon.vue';
import { resolveAssetUrl } from '../utils/assets';

const store = useSiteStore();

const isMenuOpen = ref(false);
const isSticky = ref(false);
const activeSection = ref(store.data.navLinks?.[0]?.target ?? 'home');
let observer;

const brandLogoUrl = computed(() => resolveAssetUrl(store.data.brand.logo) || resolveAssetUrl(store.defaultSiteData.brand.logo));
const lightIconUrl = resolveAssetUrl('img/icon/light-mode.svg');
const darkIconUrl = resolveAssetUrl('img/icon/dark-mode.svg');

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollTo = (target) => {
  const element = document.getElementById(target);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth' });
  activeSection.value = target;
  isMenuOpen.value = false;
};

const handleScroll = () => {
  isSticky.value = window.scrollY > 64;
};

const registerScrollSpy = () => {
  const ids = store.data.navLinks.map((link) => link.target);
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
  );

  ids.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      observer.observe(section);
    }
  });
};

onMounted(() => {
  registerScrollSpy();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  if (observer) {
    observer.disconnect();
  }
});
</script>
