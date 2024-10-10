<script lang="ts" setup>
const route = useRoute()
const appConfig = useAppConfig()

const isAsideVisible = ref(false)
watch(
  () => route.path,
  () => {
    isAsideVisible.value = false
  },
)

const isPaginationHidden = computed(() => !!route.meta.hidePagination)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="sticky top-0 border-b-[length:var(--header-border-width)] bg-[--body-bg]">
      <div class="container max-w-8xl flex min-h-[--header-height] items-center px-8 py-2 mx-auto header-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="cursor-pointer lg:hidden me-4 size-6" @click="isAsideVisible = true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h18M3 18h18" /></svg>
        <NuxtLink :to="appConfig.nuxtPress.rootLinkTo" class="flex items-center gap-3">
          <img :src="appConfig.nuxtPress.logoSrc" alt="Logo" class="w-6 h-6">
          <span class="text-lg font-medium">{{ appConfig.nuxtPress.title }}</span>
        </NuxtLink>
        <div class="flex-grow" />
        <div class="flex *:px-5 divide-x">
          <ul v-if="appConfig.nuxtPress.header.links.length" class="flex gap-5 text-sm np-header-links-container">
            <li v-for="link in appConfig.nuxtPress.header.links" :key="link.title">
              <NuxtLink exact-active-class="text-indigo-500" class="font-medium hover:text-indigo-500" :to="link.to">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>

          <!-- Social Links -->
          <ul v-if="appConfig.nuxtPress.header.socialLinks.length" class="flex gap-4 item-center">
            <li v-for="link in appConfig.nuxtPress.header.socialLinks" :key="link.href">
              <SocialLink :icon="link.icon" :href="link.href" />
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="container flex justify-center flex-grow mx-auto max-w-8xl">
      <div class="fixed inset-0 transition-all ease-in-out bg-black/20 aside-overlay" :class="isAsideVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'" @click="isAsideVisible = false" />
      <aside v-if="!route.meta.hideAside" :class="isAsideVisible ? 'translate-x-0' : '-translate-x-full'" class="fixed transition-transform bg-[--body-bg] left-0 top-0 bottom-0 lg:translate-x-0 lg:sticky w-60 border-r p-8 lg:h-[calc(100dvh-var(--header-height)-var(--header-border-width))] lg:top-[calc(var(--header-height)+var(--aside-nav-margin-top)+var(--header-border-width))]">
        <ContentAsideNav />
      </aside>
      <div class="flex-grow">
        <div class="max-w-3xl p-8 pt-16 mx-auto prose">
          <main class="flex flex-col h-full">
            <slot />
            <template v-if="!isPaginationHidden">
              <div class="flex-grow" />
              <hr class="my-8">
              <NextPrevPagination />
            </template>
          </main>
        </div>
      </div>

      <aside class="hidden xl:block h-full shrink-0 mt-[--toc-margin-top] w-60 sticky top-[calc(var(--header-height)+var(--toc-margin-top)+var(--header-border-width))]">
        <TOCContent />
      </aside>
    </div>
  </div>
</template>
