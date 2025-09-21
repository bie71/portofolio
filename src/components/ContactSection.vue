<template>
  <section id="contact" class="bg-transparent pt-36 pb-32 backdrop-blur-sm dark:bg-slate-700 dark:bg-opacity-80">
    <div class="container">
      <div class="w-full px-4">
        <div class="mx-auto mb-16 max-w-xl text-center">
          <h4 class="mb-2 text-lg font-semibold uppercase text-primary">{{ store.data.contact.title }}</h4>
          <h2 class="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">
            {{ store.data.contact.subtitle }}
          </h2>
          <p class="text-md font-medium text-secondary dark:text-third md:text-lg">
            {{ store.data.contact.description }}
          </p>
        </div>
      </div>
      <form ref="formEl" @submit.prevent="handleSubmit" class="w-full lg:mx-auto lg:w-2/3">
        <div v-for="field in store.data.contact.fields" :key="field.id" class="mb-6 w-full px-4">
          <label :for="field.id" class="text-base font-bold text-primary">{{ field.label }}</label>
          <component
            :is="field.type === 'textarea' ? 'textarea' : 'input'"
            :id="field.id"
            :name="field.name"
            :type="field.type === 'textarea' ? undefined : field.type"
            :placeholder="field.placeholder"
            :required="field.required"
            class="mt-3 w-full rounded-lg bg-slate-200 p-3 text-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            :rows="field.type === 'textarea' ? 5 : undefined"
          ></component>
        </div>
        <div class="w-full px-4">
          <button
            type="submit"
            class="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-3 px-10 text-base font-bold text-white shadow-sm transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isSubmitting"
          >
            <span>{{ isSubmitting ? 'Mengirim...' : store.data.contact.submitText }}</span>
            <img
              v-if="isSubmitting"
              :src="loadingIcon"
              alt="loading"
              class="w-8 animate-pulse"
            />
          </button>
          <p v-if="feedback.message" :class="['mt-4 text-center text-sm font-medium', feedback.type === 'error' ? 'text-red-500' : 'text-emerald-500']">
            {{ feedback.message }}
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useSiteStore } from '../stores/site';
import { resolveAssetUrl } from '../utils/assets';

const store = useSiteStore();

const isSubmitting = ref(false);
const feedback = reactive({ type: '', message: '' });
const formEl = ref(null);
const loadingIcon = resolveAssetUrl('img/loading/loading.svg');

const handleSubmit = async () => {
  if (!store.data.contact.scriptUrl || !formEl.value) {
    feedback.type = 'error';
    feedback.message = 'Konfigurasi formulir belum lengkap.';
    return;
  }

  const formData = new FormData(formEl.value);

  isSubmitting.value = true;
  feedback.type = '';
  feedback.message = '';

  try {
    const response = await fetch(store.data.contact.scriptUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Gagal mengirim data');
    }

    feedback.type = 'success';
    feedback.message = 'Data Anda sudah terkirim. Terima kasih!';
    formEl.value.reset();
  } catch (error) {
    feedback.type = 'error';
    feedback.message = 'Terjadi kesalahan saat mengirim data.';
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
