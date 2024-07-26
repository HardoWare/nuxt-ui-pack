import { defineNuxtModule, addPlugin, createResolver, addComponentsDir } from '@nuxt/kit'

export interface ModuleOptions {
  prefix: string
  global: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ui-pack',
    configKey: 'uiPack',
    version: '1.0.0',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: 'UP',
    global: false,
  },
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)
    await addComponentsDir({
      path: resolver.resolve('./runtime/components'),
    })
    addPlugin(resolver.resolve('./runtime/plugin'))
    // addTemplate({
    //   filename: resolver.resolve('./runtime/types'),
    //   src: resolver.resolve('./runtime/'),
    //   getContents: () => {},
    // })
    _nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolver.resolve('./runtime/components'),
        prefix: 'UP',
      })
    })
    // await installModule('@nuxtjs/tailwindcss', {
    //   exposeConfig: true,
    //   config: {
    //     darkMode: 'class',
    //     content: {
    //       files: [
    //         './runtime/components/**/*.{vue,js,ts}',
    //         './runtime/layouts/**/*.vue',
    //         './runtime/pages/**/*.vue',
    //         './runtime/app.vue',
    //       ],
    //     },
    //   },
    // })
  },
})
