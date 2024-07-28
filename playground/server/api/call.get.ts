import type { Return } from '~/types'

export default defineEventHandler(async (e): Promise<Return> => {
  const { page }: { page: number } = getQuery(e)
  let noMore: boolean = false
  if (page > 4) {
    noMore = true
  }
  const data = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'John Smith' },
    { id: 4, name: 'Jane Smith' },
  ]
  return { data, noMore }
})
