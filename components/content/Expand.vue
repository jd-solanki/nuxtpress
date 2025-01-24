<script lang="ts" setup>
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'More Info',
})
</script>

<template>
  <details class="px-4 pt-4 pb-2 my-4 text-sm border rounded-lg np-expand">
    <summary class="mb-2 cursor-pointer">
      {{ props.title }}
    </summary>
    <slot />
  </details>
</template>

<style lang=scss>
.np-expand summary ~ {
 p, pre {
    margin-top: 8px;
    margin-bottom: 8px;
 }
}
</style>
