import { defineNuxtModule, createResolver, addComponentsDir, installModule } from '@nuxt/kit'

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
      global: _options.global,
      isAsync: true,
      path: resolver.resolve('./runtime/components'),
      prefix: _options.prefix,
      watch: true,
    })
    _nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolver.resolve('./runtime/components'),
        prefix: 'UP',
      })
    })
    await installModule('@nuxtjs/tailwindcss', {
      configPath: resolver.resolve('./runtime', 'tailwind.config'),
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolver.resolve('./runtime/*.{mjs,js,ts}'),
          ],
        },
      },
    })
  },
})
