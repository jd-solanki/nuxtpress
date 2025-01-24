<script setup lang="ts">
definePageMeta({
  layout: 'content', // NuxtPress provides content layout
  contentName: 'docs',
})

const route = useRoute()
const slug = route.params.slug

const { data: page } = await useAsyncData(`docs-${slug}`, () => {
  return queryCollection('docs').path(route.path).first()
})
</script>

<template>
  <ContentRenderer :value="page" />
</template>
