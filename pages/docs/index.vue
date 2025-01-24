<script setup lang="ts">
const { data: pages } = await useAsyncData('docs', () => queryCollection('docs').all())
</script>

<template>
  <div>
    <h1>Docs</h1>
    <ul>
      <li v-for="page in pages" :key="page.id">
        <NuxtLink :to="page.path">{{ page.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
