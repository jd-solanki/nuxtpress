<script setup lang="ts">
definePageMeta({
  layout: 'content',
  hideAside: true,
  hidePagination: true,
})

const { data: blog } = await useAsyncData('blog', () => queryCollection('blog').all())
</script>

<template>
  <div>
    <h1 class="mb-10 text-4xl font-semibold text-gray-900">
      Blog
    </h1>
    <ul class="not-prose">
      <li v-for="post in blog" :key="post.path" class="mb-6">
        <NuxtLink :to="post.path" class="inline-block mb-1 text-xl font-medium transition-opacity">
          {{ post.title }}
        </NuxtLink>
        <div class="flex gap-3 text-gray-400">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 2v4m8-4v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></g></svg>
            <time class="text-sm">{{ new Date(post.meta.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/(\d+)/, (d) => d + (["st","nd","rd"][((+d + 90) % 100 - 10) % 10 - 1] || "th")) }}</time>
          </div>
          <template v-if="post.meta.readingTime">
              <span>&middot;</span>
              <span>{{ post.meta.readingTime }}</span>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>
