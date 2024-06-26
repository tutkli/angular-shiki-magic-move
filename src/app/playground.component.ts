import { NgClass } from '@angular/common'
import { Component, computed, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { computedAsync } from 'ngxtension/computed-async'
import { bundledLanguagesInfo, getHighlighter } from 'shiki'
import { bundledThemesInfo } from 'shiki/themes'
import { angularAfter, angularBefore } from './constants/snippets'
import { ShikiMagicMoveComponent } from './shiki-magic-move/shiki-magic-move.component'
import { ShikiMagicMoveInputs } from './shiki-magic-move/types'

const defaultOptions = {
  theme: 'aurora-x',
  lang: 'typescript',
  autoCommit: true,
  duration: 750,
  code: angularBefore,
  useDebugStyles: false,
  stagger: 3,
  lineNumbers: false,
}

@Component({
  standalone: true,
  imports: [FormsModule, NgClass, ShikiMagicMoveComponent],
  selector: 'app-playground',
  template: `
    <div
      class="flex min-h-screen flex-col gap-4 px-4 py-4 font-sans lg:max-h-screen">
      <div class="flex flex-none flex-col items-center text-center">
        <span
          class="inline-block bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-2xl font-thin text-transparent">
          <span>Shiki</span>
          <span class="mx-1 font-extrabold">Magic</span>
          <span class="font-serif italic">Move</span>
        </span>
        <div class="text-stone-500">
          Smoothly animated code blocks with
          <a
            href="https://github.com/shikijs/shiki"
            target="_blank"
            class="underline">
            Shiki
          </a>
          .
          <a
            href="https://github.com/shikijs/shiki-magic-move"
            target="_blank"
            class="underline">
            GitHub
          </a>
        </div>
      </div>

      <div class="grid flex-auto gap-4 overflow-hidden md:grid-cols-2">
        <div class="flex flex-col gap-4 overflow-hidden">
          <div class="-mb-[4px] flex flex-none flex-wrap items-center gap-4">
            <button
              class="rounded border border-stone-200 px-3 py-1"
              (click)="toggleExample()">
              Toggle examples
            </button>
            <!--          TODO Mas botones-->
          </div>

          <textarea
            [(ngModel)]="code"
            class="border-gray:20 min-h-100 h-full w-full flex-auto rounded border bg-transparent p-4 font-mono"></textarea>

          <div class="flex flex-none flex-wrap items-center gap-6">
            <label class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                Duration
                <span class="op50 text-sm">{{ duration() }}ms</span>
              </div>
              <input
                [(ngModel)]="duration"
                type="range"
                min="100"
                max="20000"
                class="w-40" />
            </label>
            <label class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                Stagger
                <span class="op50 text-sm">{{ stagger() }}ms</span>
              </div>
              <input
                [(ngModel)]="stagger"
                type="range"
                min="0"
                max="20"
                class="w-40" />
            </label>
            <label class="flex items-center gap-1 text-sm">
              <input [(ngModel)]="useDebugStyles" type="checkbox" />
              Style for debugging
            </label>
            <!--            <label class="flex items-center gap-1 text-sm">-->
            <!--              <input [(ngModel)]="lineNumbers" type="checkbox" />-->
            <!--              Line Numbers-->
            <!--            </label>-->
            <button
              class="rounded border border-stone-200 px-3 py-1"
              (click)="resetOptions()">
              Reset Options
            </button>
          </div>
        </div>

        <div
          class="flex flex-col gap-4 overflow-auto"
          [ngClass]="{ 'magic-move-debug-style': useDebugStyles() }">
          <div class="flex flex-none flex-wrap items-center gap-2">
            <select
              [(ngModel)]="theme"
              class="rounded border border-stone-200 px-2 py-1 text-sm">
              @for (t of bundledThemesInfo; track t.id) {
                <option [value]="t.id">{{ t.displayName }}</option>
              }
            </select>
            <select
              [(ngModel)]="lang"
              class="rounded border border-stone-200 px-2 py-1 text-sm">
              @for (l of bundledLanguagesInfo; track l.id) {
                <option [value]="l.id">{{ l.name }}</option>
              }
            </select>
          </div>
          @if (highlighter(); as highlighter) {
            <shiki-magic-move
              class="overflow-auto"
              [highlighter]="highlighter"
              [code]="code()"
              [lang]="lang()"
              [theme]="theme()"
              [options]="options()" />
          }
        </div>
      </div>
    </div>
  `,
})
export class PlaygroundComponent {
  code = signal(defaultOptions.code)
  duration = signal(defaultOptions.duration)
  stagger = signal(defaultOptions.stagger)
  useDebugStyles = signal(defaultOptions.useDebugStyles)
  lineNumbers = signal(defaultOptions.lineNumbers)
  theme = signal(defaultOptions.theme)
  lang = signal(defaultOptions.lang)

  highlighter = computedAsync(() => {
    return getHighlighter({
      themes: bundledThemesInfo.map(t => t.id),
      langs: bundledLanguagesInfo.map(l => l.id),
    })
  })

  options = computed<ShikiMagicMoveInputs['options']>(() => ({
    duration: this.duration(),
    stagger: this.stagger(),
    lineNumbers: this.lineNumbers(),
  }))

  toggleExample() {
    this.code.update(code =>
      code === angularBefore ? angularAfter : angularBefore
    )
  }

  resetOptions() {
    this.code.set(defaultOptions.code)
    this.duration.set(defaultOptions.duration)
    this.stagger.set(defaultOptions.stagger)
    this.useDebugStyles.set(defaultOptions.useDebugStyles)
    this.lineNumbers.set(defaultOptions.lineNumbers)
    this.theme.set(defaultOptions.theme)
    this.lang.set(defaultOptions.lang)
  }

  protected readonly bundledThemesInfo = bundledThemesInfo
  protected readonly bundledLanguagesInfo = bundledLanguagesInfo
}
