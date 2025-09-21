<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <header class="border-b border-slate-700 bg-slate-950/70 py-5 backdrop-blur">
      <div class="container flex flex-wrap items-center justify-between gap-3">
        <h1 class="text-2xl font-bold">Dashboard Admin</h1>
        <div class="flex items-center gap-3">
          <RouterLink
            to="/"
            class="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Lihat Situs
          </RouterLink>
          <button
            type="button"
            class="rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
            @click="resetSite"
          >
            Reset Default
          </button>
        </div>
      </div>
    </header>

    <main class="container space-y-12 py-10">
      <section class="rounded-2xl bg-slate-800/70 p-6 shadow-lg shadow-slate-900/40">
        <h2 class="mb-4 text-xl font-semibold">Hero</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label class="text-sm font-semibold text-slate-300">Sapaan</label>
            <input v-model="store.data.hero.greeting" type="text" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Nama</label>
            <input v-model="store.data.hero.name" type="text" class="admin-input" />
          </div>
          <div class="md:col-span-2">
            <label class="text-sm font-semibold text-slate-300">Deskripsi</label>
            <textarea v-model="store.data.hero.description" rows="3" class="admin-input"></textarea>
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Link CTA</label>
            <input v-model="store.data.hero.cta.href" type="url" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Teks CTA</label>
            <input v-model="store.data.hero.cta.text" type="text" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Gambar Hero</label>
            <input v-model="store.data.hero.heroImage" type="text" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Warna Blob</label>
            <input v-model="store.data.hero.backgroundShapeColor" type="color" class="admin-input h-11" />
          </div>
        </div>
        <div class="mt-6">
          <h3 class="mb-3 text-lg font-semibold">Role</h3>
          <div class="space-y-3">
            <div v-for="(role, index) in store.data.hero.roles" :key="`role-${index}`" class="flex items-center gap-3">
              <input v-model="store.data.hero.roles[index]" type="text" class="admin-input flex-1" />
              <button type="button" class="rounded-md border border-red-400 px-3 py-2 text-xs uppercase tracking-wide text-red-300" @click="removeRole(index)">
                Hapus
              </button>
            </div>
            <button type="button" class="rounded-md border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary" @click="addRole">
              Tambah Role
            </button>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-slate-800/70 p-6 shadow-lg shadow-slate-900/40">
        <h2 class="mb-4 text-xl font-semibold">Tentang Saya</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label class="text-sm font-semibold text-slate-300">Judul</label>
            <input v-model="store.data.about.title" type="text" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Sub Judul</label>
            <input v-model="store.data.about.heading" type="text" class="admin-input" />
          </div>
          <div class="md:col-span-2">
            <label class="text-sm font-semibold text-slate-300">Deskripsi</label>
            <textarea v-model="store.data.about.description" rows="4" class="admin-input"></textarea>
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Judul Ajakan</label>
            <input v-model="store.data.about.friendTitle" type="text" class="admin-input" />
          </div>
          <div class="md:col-span-2">
            <label class="text-sm font-semibold text-slate-300">Deskripsi Ajakan</label>
            <textarea v-model="store.data.about.friendDescription" rows="3" class="admin-input"></textarea>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-slate-800/70 p-6 shadow-lg shadow-slate-900/40">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Sosial Media</h2>
          <button type="button" class="rounded-md border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary" @click="addSocial">
            Tambah Sosial
          </button>
        </div>
        <div class="mt-4 space-y-4">
          <div v-for="(social, index) in store.data.socials" :key="social.id" class="rounded-xl bg-slate-900/40 p-4">
            <div class="grid gap-4 md:grid-cols-3">
              <div>
                <label class="text-sm font-semibold text-slate-300">Label</label>
                <input v-model="social.label" type="text" class="admin-input" />
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-300">URL</label>
                <input v-model="social.url" type="url" class="admin-input" />
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-300">Ikon</label>
                <select v-model="social.icon" class="admin-input">
                  <option v-for="option in iconOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </div>
            </div>
            <button type="button" class="mt-3 rounded-md border border-red-400 px-3 py-2 text-xs uppercase tracking-wide text-red-300" @click="removeSocial(index)">
              Hapus Sosial
            </button>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-slate-800/70 p-6 shadow-lg shadow-slate-900/40">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold">Portfolio</h2>
            <p class="text-sm text-slate-400">Atur project yang tampil di halaman utama.</p>
          </div>
          <button type="button" class="rounded-md border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary" @click="addPortfolio">
            Tambah Project
          </button>
        </div>
        <div class="mt-4 space-y-4">
          <div v-for="(item, index) in store.data.portfolio.items" :key="item.id || index" class="rounded-xl bg-slate-900/40 p-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="text-sm font-semibold text-slate-300">Judul</label>
                <input v-model="item.title" type="text" class="admin-input" />
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-300">URL</label>
                <input v-model="item.link" type="url" class="admin-input" />
              </div>
              <div class="md:col-span-2">
                <label class="text-sm font-semibold text-slate-300">Deskripsi</label>
                <textarea v-model="item.description" rows="3" class="admin-input"></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="text-sm font-semibold text-slate-300">Gambar</label>
                <input v-model="item.image" type="text" class="admin-input" />
              </div>
            </div>
            <button type="button" class="mt-3 rounded-md border border-red-400 px-3 py-2 text-xs uppercase tracking-wide text-red-300" @click="removePortfolio(index)">
              Hapus Project
            </button>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-slate-800/70 p-6 shadow-lg shadow-slate-900/40">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Clients</h2>
          <button type="button" class="rounded-md border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary" @click="addClient">
            Tambah Client
          </button>
        </div>
        <div class="mt-4 space-y-4">
          <div v-for="(client, index) in store.data.clients.items" :key="client.id || index" class="rounded-xl bg-slate-900/40 p-4">
            <div class="grid gap-4 md:grid-cols-3">
              <div>
                <label class="text-sm font-semibold text-slate-300">Nama</label>
                <input v-model="client.name" type="text" class="admin-input" />
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-300">URL</label>
                <input v-model="client.url" type="url" class="admin-input" />
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-300">Logo</label>
                <input v-model="client.logo" type="text" class="admin-input" />
              </div>
            </div>
            <button type="button" class="mt-3 rounded-md border border-red-400 px-3 py-2 text-xs uppercase tracking-wide text-red-300" @click="removeClient(index)">
              Hapus Client
            </button>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-slate-800/70 p-6 shadow-lg shadow-slate-900/40">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Blog</h2>
          <button type="button" class="rounded-md border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary" @click="addBlog">
            Tambah Tulisan
          </button>
        </div>
        <div class="mt-4 space-y-4">
          <div v-for="(post, index) in store.data.blog.items" :key="post.id || index" class="rounded-xl bg-slate-900/40 p-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="text-sm font-semibold text-slate-300">Judul</label>
                <input v-model="post.title" type="text" class="admin-input" />
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-300">URL</label>
                <input v-model="post.link" type="url" class="admin-input" />
              </div>
              <div class="md:col-span-2">
                <label class="text-sm font-semibold text-slate-300">Ringkasan</label>
                <textarea v-model="post.description" rows="3" class="admin-input"></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="text-sm font-semibold text-slate-300">Gambar</label>
                <input v-model="post.image" type="text" class="admin-input" />
              </div>
            </div>
            <button type="button" class="mt-3 rounded-md border border-red-400 px-3 py-2 text-xs uppercase tracking-wide text-red-300" @click="removeBlog(index)">
              Hapus Tulisan
            </button>
          </div>
        </div>
        <div class="mt-6">
          <h3 class="mb-3 text-lg font-semibold">Kategori</h3>
          <div class="space-y-3">
            <div v-for="(category, index) in store.data.blog.categories" :key="`category-${index}`" class="flex items-center gap-3">
              <input v-model="store.data.blog.categories[index]" type="text" class="admin-input flex-1" />
              <button type="button" class="rounded-md border border-red-400 px-3 py-2 text-xs uppercase tracking-wide text-red-300" @click="removeCategory(index)">
                Hapus
              </button>
            </div>
            <button type="button" class="rounded-md border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary" @click="addCategory">
              Tambah Kategori
            </button>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-slate-800/70 p-6 shadow-lg shadow-slate-900/40">
        <h2 class="mb-4 text-xl font-semibold">Kontak</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="md:col-span-2">
            <label class="text-sm font-semibold text-slate-300">Google Script URL</label>
            <input v-model="store.data.contact.scriptUrl" type="url" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Judul</label>
            <input v-model="store.data.contact.title" type="text" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Sub Judul</label>
            <input v-model="store.data.contact.subtitle" type="text" class="admin-input" />
          </div>
          <div class="md:col-span-2">
            <label class="text-sm font-semibold text-slate-300">Deskripsi</label>
            <textarea v-model="store.data.contact.description" rows="3" class="admin-input"></textarea>
          </div>
        </div>
        <div class="mt-6">
          <h3 class="mb-3 text-lg font-semibold">Field Formulir</h3>
          <div class="space-y-4">
            <div v-for="(field, index) in store.data.contact.fields" :key="field.id || index" class="rounded-xl bg-slate-900/40 p-4">
              <div class="grid gap-4 md:grid-cols-3">
                <div>
                  <label class="text-sm font-semibold text-slate-300">Label</label>
                  <input v-model="field.label" type="text" class="admin-input" />
                </div>
                <div>
                  <label class="text-sm font-semibold text-slate-300">Nama Field</label>
                  <input v-model="field.name" type="text" class="admin-input" />
                </div>
                <div>
                  <label class="text-sm font-semibold text-slate-300">Tipe</label>
                  <select v-model="field.type" class="admin-input">
                    <option value="text">text</option>
                    <option value="email">email</option>
                    <option value="tel">tel</option>
                    <option value="textarea">textarea</option>
                  </select>
                </div>
                <div>
                  <label class="text-sm font-semibold text-slate-300">Placeholder</label>
                  <input v-model="field.placeholder" type="text" class="admin-input" />
                </div>
                <div>
                  <label class="text-sm font-semibold text-slate-300">ID</label>
                  <input v-model="field.id" type="text" class="admin-input" />
                </div>
                <div class="flex items-center gap-2">
                  <input v-model="field.required" type="checkbox" class="h-4 w-4 rounded border-slate-600" />
                  <span class="text-sm text-slate-300">Wajib</span>
                </div>
              </div>
              <button type="button" class="mt-3 rounded-md border border-red-400 px-3 py-2 text-xs uppercase tracking-wide text-red-300" @click="removeField(index)">
                Hapus Field
              </button>
            </div>
          </div>
          <button type="button" class="mt-4 rounded-md border border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary" @click="addField">
            Tambah Field
          </button>
        </div>
      </section>

      <section class="rounded-2xl bg-slate-800/70 p-6 shadow-lg shadow-slate-900/40">
        <h2 class="mb-4 text-xl font-semibold">Footer</h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div>
            <label class="text-sm font-semibold text-slate-300">Nama Brand</label>
            <input v-model="store.data.brand.name" type="text" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Email</label>
            <input v-model="store.data.footer.email" type="email" class="admin-input" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-300">Lokasi</label>
            <input v-model="store.data.footer.location" type="text" class="admin-input" />
          </div>
          <div class="md:col-span-3">
            <label class="text-sm font-semibold text-slate-300">Link Map</label>
            <input v-model="store.data.footer.mapUrl" type="text" class="admin-input" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useSiteStore } from '../stores/site';

const store = useSiteStore();

const iconOptions = ['github', 'instagram', 'facebook', 'discord', 'linkedin', 'external'];

const uniqueId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const addRole = () => {
  store.data.hero.roles.push('');
};

const removeRole = (index) => {
  store.data.hero.roles.splice(index, 1);
};

const addSocial = () => {
  store.data.socials.push({ id: uniqueId('social'), label: '', url: '', icon: 'external' });
};

const removeSocial = (index) => {
  store.data.socials.splice(index, 1);
};

const addPortfolio = () => {
  store.data.portfolio.items.push({
    id: uniqueId('project'),
    title: 'Project Baru',
    description: '',
    image: '/img/foto/102.jpg',
    link: '#',
  });
};

const removePortfolio = (index) => {
  store.data.portfolio.items.splice(index, 1);
};

const addClient = () => {
  store.data.clients.items.push({ id: uniqueId('client'), name: 'Client Baru', url: '#', logo: '/img/clients/google.svg' });
};

const removeClient = (index) => {
  store.data.clients.items.splice(index, 1);
};

const addBlog = () => {
  store.data.blog.items.push({
    id: uniqueId('blog'),
    title: 'Judul Baru',
    description: '',
    image: '/img/foto/103.jpg',
    link: '#',
  });
};

const removeBlog = (index) => {
  store.data.blog.items.splice(index, 1);
};

const addCategory = () => {
  store.data.blog.categories.push('Kategori Baru');
};

const removeCategory = (index) => {
  store.data.blog.categories.splice(index, 1);
};

const addField = () => {
  store.data.contact.fields.push({
    id: uniqueId('field'),
    label: 'Field Baru',
    name: 'field_baru',
    type: 'text',
    placeholder: '',
    required: false,
  });
};

const removeField = (index) => {
  store.data.contact.fields.splice(index, 1);
};

const resetSite = () => {
  store.resetData();
};
</script>

<style scoped>
.admin-input {
  @apply mt-2 w-full rounded-lg border border-slate-600 bg-slate-900/60 p-3 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary;
}
</style>
