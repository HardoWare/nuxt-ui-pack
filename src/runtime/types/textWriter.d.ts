import type { TextItem } from './textItem'

export interface TextWriter {
  items: TextItem[]
  nextDelay?: number
  afterDelay?: number
  deleteSpeed?: number
}
