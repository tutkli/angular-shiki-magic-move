import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core'
import { MagicMoveRenderer } from 'shiki-magic-move/renderer'
import { ShikiMagicMoveRendererInputs } from './types'

@Component({
  selector: 'shiki-magic-move-renderer',
  standalone: true,
  template: `
    <pre
      #container
      class="shiki-magic-move-container over w-fit overflow-hidden rounded border border-stone-200 p-4 font-mono shadow-xl"></pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShikiMagicMoveRendererComponent {
  tokens = input.required<ShikiMagicMoveRendererInputs['tokens']>()
  animate = input<ShikiMagicMoveRendererInputs['animate']>(true)
  previous = input<ShikiMagicMoveRendererInputs['previous']>()
  options = input<ShikiMagicMoveRendererInputs['options']>()
  onStart = input<ShikiMagicMoveRendererInputs['onStart']>()
  onEnd = input<ShikiMagicMoveRendererInputs['onEnd']>()

  container = viewChild.required<ElementRef<HTMLPreElement>>('container')
  renderer = computed(
    () => new MagicMoveRenderer(this.container().nativeElement)
  )

  constructor() {
    effect(() => {
      this.render()
    })
  }

  async render() {
    const renderer = this.renderer()
    Object.assign(renderer.options, this.options())
    if (this.animate()) {
      if (this.previous()) renderer.replace(this.previous()!)
      await renderer.render(this.tokens())
    } else {
      renderer.replace(this.tokens())
    }
  }
}
