export interface GalleryResponse<T> {
  data: T[]
  noMore: boolean
}

export interface ExampleItems {
  id: number
  name: string
}

export interface GalleryUi {
  wrapper?: string
  body?: {
    wrapper?: string
    item?: string
    loading?: string
    noItems?: string
  }
}
