import type { WriteTextType } from './writeText'

export interface TextTyperType {
  items: WriteTextType[]
  nextDelay?: number
  afterDelay?: number
  deleteSpeed?: number
}
