import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'
import {
  codeToKeyedTokens,
  createMagicMoveMachine,
} from 'shiki-magic-move/core'
import { ShikiMagicMoveRendererComponent } from './shiki-magic-move-renderer.component'
import { ShikiMagicMoveInputs } from './types'

@Component({
  selector: 'shiki-magic-move',
  standalone: true,
  imports: [ShikiMagicMoveRendererComponent],
  template: `
    <shiki-magic-move-renderer
      [tokens]="result().current"
      [previous]="result().previous"
      [options]="options()"
      [onStart]="onStart()"
      [onEnd]="onEnd()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShikiMagicMoveComponent {
  highlighter = input.required<ShikiMagicMoveInputs['highlighter']>()
  lang = input.required<ShikiMagicMoveInputs['lang']>()
  theme = input.required<ShikiMagicMoveInputs['theme']>()
  code = input.required<ShikiMagicMoveInputs['code']>()
  options = input<ShikiMagicMoveInputs['options']>()
  onStart = input<ShikiMagicMoveInputs['onStart']>()
  onEnd = input<ShikiMagicMoveInputs['onEnd']>()

  machine = computed(() =>
    createMagicMoveMachine(
      code =>
        codeToKeyedTokens(this.highlighter(), this.code(), {
          lang: this.lang(),
          theme: this.theme(),
        }),
      this.options()
    )
  )

  result = computed(() => this.machine().commit(this.code()))
}
