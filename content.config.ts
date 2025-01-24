import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      // Load every file inside the `content` directory
      source: 'docs/**',
      // Specify the type of content in this collection
      type: 'page'
    }),
      blog: defineCollection({
      // Load every file inside the `content` directory
      source: 'blog/**',
      // Specify the type of content in this collection
      type: 'page'
    })
  }
})
