<script lang="ts" setup>
// TODO: Can we somehow get the current content name in this component (Better way)?
const route = useRoute()

// const [prev, next] = await queryContent(contentName)
//   .only(['path', 'title'])
//   .findSurround(route.path)

const { contentName } = route.meta

// * data[0] is previous page & data[1] is next page
const { data } = await useAsyncData(
  'pagination',
  () => queryCollectionItemSurroundings(contentName, route.path),
  {
    watch: [() => route.path],
  },
)
</script>

<template>
  <div v-if="data" class="grid gap-6 sm:grid-cols-2">
    <NuxtLink v-if="data[0]" :to="data[0].path" class="flex flex-col px-4 py-3 no-underline transition-all ease-in-out border rounded-lg hover:border-indigo-500 hover:text-indigo-500">
      <small class="text-gray-400">Previous Page</small>
      <span>{{ data[0].title }}</span>
    </NuxtLink>
    <NuxtLink v-if="data[1]" :to="data[1].path" class="flex flex-col col-start-2 px-4 py-3 no-underline transition-all ease-in-out border rounded-lg hover:border-indigo-500 hover:text-indigo-500">
      <small class="text-gray-400">Next Page</small>
      <span>{{ data[1].title }}</span>
    </NuxtLink>
  </div>
</template>
