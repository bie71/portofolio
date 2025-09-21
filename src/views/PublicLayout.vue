<template>
  <div class="relative min-h-screen overflow-hidden">
    <Preloader v-if="showPreloader" />
    <BackgroundWave />
    <HeaderNav />
    <main>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ClientsSection />
      <BlogSection />
      <ContactSection />
    </main>
    <FooterSection />
    <BackToTopButton />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import AOS from 'aos';
import HeaderNav from '../components/HeaderNav.vue';
import BackgroundWave from '../components/BackgroundWave.vue';
import HeroSection from '../components/HeroSection.vue';
import AboutSection from '../components/AboutSection.vue';
import PortfolioSection from '../components/PortfolioSection.vue';
import ClientsSection from '../components/ClientsSection.vue';
import BlogSection from '../components/BlogSection.vue';
import ContactSection from '../components/ContactSection.vue';
import FooterSection from '../components/FooterSection.vue';
import BackToTopButton from '../components/BackToTopButton.vue';
import Preloader from '../components/Preloader.vue';
import { useSiteStore } from '../stores/site';

const showPreloader = ref(true);
const store = useSiteStore();

onMounted(() => {
  showPreloader.value = true;
  setTimeout(() => {
    showPreloader.value = false;
  }, 1500);

  AOS.init({ once: true });
});

watch(
  () => store.data,
  () => {
    AOS.refreshHard();
  },
  { deep: true }
);
</script>
