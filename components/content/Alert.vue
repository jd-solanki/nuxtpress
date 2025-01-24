<script lang="ts" setup>
interface Props {
  title?: string
  type?: 'note' | 'info' | 'tip' | 'warning' | 'danger'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'note',
})

const alertTitle = computed(() => {
  if (props.title) {
    return props.title
  }

  switch (props.type) {
    case 'note':
      return 'NOTE'
    case 'info':
      return 'INFO'
    case 'tip':
      return 'TIP'
    case 'warning':
      return 'WARNING'
    case 'danger':
      return 'DANGER'
    default:
      return 'NOTE'
  }
})
</script>

<template>
  <div class="flex flex-col px-4 pt-4 pb-2 my-4 text-sm border rounded-lg" :class="`np-alert-${props.type}`">
    <p class="m-0 font-semibold np-alert-title">
      {{ alertTitle }}
    </p>
    <div class="np-alert-content">
      <slot />
    </div>
  </div>
</template>

<style lang=scss>
.np-alert-content {
 p, pre {
    margin-top: 8px;
    margin-bottom: 8px;
 }
}
</style>
