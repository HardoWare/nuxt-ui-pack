import type { GalleryResponse, ExampleItems } from '../../../src/runtime/types'

export default defineEventHandler(async (e): Promise<GalleryResponse<ExampleItems>> => {
  const { page }: { page: number } = getQuery(e)
  let noMore: boolean = false
  if (page > 7)
    noMore = true
  const data: ExampleItems[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'John Smith' },
    { id: 4, name: 'Jane Smith' },
    { id: 5, name: 'Jane Doe' },
    { id: 6, name: 'John Smith' },
    { id: 7, name: 'Jane Smith' },
  ]
  return { data, noMore }
})
