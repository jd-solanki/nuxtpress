<script setup lang="ts">
definePageMeta({
  layout: 'content', // NuxtPress provides content layout
  contentName: 'blog',
  hideAside: true,
})

const route = useRoute()
const slug = route.params.slug

const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(route.path).first()
})
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <ContentRenderer :value="post" />
</template>
