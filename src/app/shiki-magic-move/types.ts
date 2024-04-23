import {
  KeyedTokensInfo,
  MagicMoveDifferOptions,
  MagicMoveRenderOptions,
} from 'shiki-magic-move/types'
import type { HighlighterCore } from 'shiki/core'

export type ShikiMagicMoveInputs = {
  highlighter: HighlighterCore
  lang: string
  theme: string
  code: string
  options?: MagicMoveRenderOptions & MagicMoveDifferOptions
  onStart?: () => void
  onEnd?: () => void
}

export type ShikiMagicMoveRendererInputs = {
  tokens: KeyedTokensInfo
  animate?: boolean
  previous?: KeyedTokensInfo
  options?: MagicMoveRenderOptions
  onStart?: () => void
  onEnd?: () => void
}
