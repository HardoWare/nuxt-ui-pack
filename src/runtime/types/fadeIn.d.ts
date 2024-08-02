export type FadeFrom = 'top' | 'bottom' | 'left' | 'right' | 'center'

export interface FadeIn {
  threshold?: number | string
  from?: FadeFrom
  depth?: number | string
  repeat?: true | false
}
