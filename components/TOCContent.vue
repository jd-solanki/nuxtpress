<script lang="ts" setup>
import { useScrollSpy } from '../composables/useScrollSpy'

const route = useRoute()

const { data } = await useAsyncData(
  'toc',
  () => queryContent(route.path).findOne(),
  {
    watch: [() => route.path],
  },
)

const links = computed(() => data.value?.body?.toc?.links || [])
const { activeId } = useScrollSpy(links)
</script>

<template>
  <div v-if="links.length" class="px-4 py-2 text-sm border-l np-toc-content">
    <span class="inline-block mb-2 font-medium text-gray-700">On this page</span>
    <ul>
      <li v-for="link in links" :key="link.text" class="mb-2">
        <a
          :href="`#${link.id}`"
          class="transition-opacity opacity-75 hover:opacity-100" :class="[
            activeId === link.id ? '!opacity-100 text-gray-700' : '',
          ]"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
