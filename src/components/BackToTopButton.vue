<template>
  <button
    v-show="isVisible"
    @click="scrollTop"
    class="fixed bottom-4 right-4 z-[999] h-11 w-11 animate-pulse rounded-full bg-primary p-4 text-white shadow-md transition hover:animate-none lg:h-14 lg:w-14"
    aria-label="Kembali ke atas"
  >
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-full w-full fill-current">
      <path
        d="M12.468.186a.7.7 0 0 0-.95 0L1.924 9.193a1.705 1.705 0 0 0-.475 1.095v3.59c0 .358.214.452.475.207l9.601-9.01a.705.705 0 0 1 .95 0l9.603 9.01c.262.245.475.151.475-.207v-3.59a1.71 1.71 0 0 0-.475-1.095zm0 9.783a.705.705 0 0 0-.95 0l-9.595 9.002a1.705 1.705 0 0 0-.475 1.094v3.59c0 .358.214.453.475.208l9.601-9.007a.701.701 0 0 1 .95 0l9.603 9.008c.262.244.475.15.475-.208v-3.59a1.71 1.71 0 0 0-.475-1.094Z"
      />
    </svg>
  </button>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 200;
};

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
