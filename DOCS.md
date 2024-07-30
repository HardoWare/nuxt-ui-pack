# Documentation
## Featuring:
- [Fade in component](#fade-in)
- [Infinite scroll component](#infinite-scroll)
- [Text writers component](#text-writer)


## Fade In
### Usage

```vue
<UPFadeIn>
  Default fade from bottom
</UPFadeIn>

<UPFadeIn :threshold="0.6" from="top" :depth="10" repeat>
  60% of element should be visible, entering from top, 10vh translate, repeat if element in screen
  It works especially good with long text or images
</UPFadeIn>
```

### Default
```ts
const props = withDefaults(defineProps<FadeIn>(), {
  threshold: 0.3,   // persent of elment visible to show
  from: 'bottom',   // element entny direction
  depth: 5,         // number: 5vh, if from left 5vw OR string with unit: '30px'
  repeat: false,    // repeat fadein if visible again
})
```

### Props
```ts
type FadeIn = {
  threshold?: number | string
  from?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  depth?: number | string
  repeat?: true | false
}
```

## Infinite scroll
### Usage

#### You have to provide apiCall method with query parameters of your api evenHandler Import GalleryResponse with your Type
```ts
const apiCall = async (page: number): Promise<GalleryResponse<ExampleItems>> => {
  return await $fetch('/api/call', { query: { page: page } })
}
```

#### You can template items, loading, noMore with slots
If default classes in component are not applied, do so in <strong style="color:yellow">:ui</strong> prop.
```vue
<UPInfinityScroll :ui="{ body: { wrapper: 'grid grid-cols-2 gap-2' } }" :api-call="apiCall" class="w-3/4 mx-auto mt-4 text-white bg-gray-600 overflow-hidden">
  <template #default="{ item }">
    <div class="h-32 flex justify-center align-middle bg-gray-500">
      <h2 class="text-2xl h-fit w-fit">
        {{ item.id }} {{ item.name }}
      </h2>
    </div>
  </template>
</UPInfinityScroll>
<!-- if you want to space <slot/> and sentence use &nbsp in <slot/> -->
```
#### Example api eventHandler
```ts
export default defineEventHandler(async (e): Promise<GalleryResponse<ExampleItems>> => {
  const { page }: { page: number } = getQuery(e)
  let noMore: boolean = false
  if (page > 6)
    noMore = true
  const data: ExampleItems[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'John Smith' },
    { id: 4, name: 'Jane Smith' },
  ]
  return { data, noMore }
})
```

### Default
```ts
const props = defineProps<{
  ui?: GalleryUi
  apiCall: (index: number) => Promise<GalleryResponse<unknown>>
}>()
```

### Props
```ts
interface GalleryResponse<T> {
  data: T[]             // provide item type, output is always array
  noMore: boolean
}

interface GalleryUi {
  wrapper?: string
  body?: {
    wrapper?: string
    item?: string
    loading?: string
    noItems?: string
  }
}
```

## Text writer
### Usage
```ts
const items: TextItem[] = [
    { sentence: 'Four' },
    { sentence: 'Banana' },
    { sentence: 'Long text if you want to' },
]
```
```vue
<UPTextWriter :items="items">
  One, Two, Three<!--&nbsp-->
</UPTextWriter>
<!-- if you want to space <slot/> and sentence use &nbsp in <slot/> -->
```

### Default
```ts
const props = withDefaults(defineProps<TextWriter>(), {
  items: () => [] as TextItem[],
  nextDelay: defaultNextDelay,      // 500ms
  afterDelay: defaultAfterDelay,    // 3000ms
  deleteSpeed: defaultDeleteSpeed,  // 50ms
})
```

### Props
```ts
interface TextWriter {
  items: TextItem[]     // items array
  nextDelay?: number    // delay to write next item
  afterDelay?: number   // await time after text is written
  deleteSpeed?: number  // char delete speed in string
}
interface TextItem {
  sentence: string      // sentence string
  speed?: number        // char speed
  color?: string        // color class
}
```


<span style="color:brown">
Text content
</span>
