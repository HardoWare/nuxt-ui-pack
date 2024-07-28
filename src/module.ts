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
      prefix: _options.prefix,
      global: _options.global,
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
    // _nuxt.options.css.push(resolver.resolve('./runtime/assets/styles.css'))
    // await installModule('@nuxtjs/tailwindcss', {
    //   exposeConfig: true,
    //   config: {
    //     darkMode: 'class',
    //     content: {
    //       files: [
    //         resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'),
    //         resolver.resolve('./runtime/*.{mjs,js,ts}'),
    //       ],
    //     },
    //   },
    // })
  },
})
