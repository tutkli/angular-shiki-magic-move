import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { bundledThemesInfo } from 'shiki/themes';
import { bundledLanguagesInfo } from 'shiki';

const defaultOptions = {
  theme: 'vitesse-dark',
  lang: 'typescript',
  autoCommit: true,
  duration: 750,
  code: 'Hello world',
  useDebugStyles: false,
  stagger: 3,
  lineNumbers: false,
};

@Component({
  standalone: true,
  imports: [FormsModule, NgClass],
  selector: 'app-playground',
  template: ` <div
    class="flex flex-col font-sans min-h-screen lg:max-h-screen px-4 py-4 gap-4"
  >
    <div class="flex flex-col items-center flex-none  text-center">
      <span
        class="text-2xl font-thin bg-gradient-to-r from-teal-400 to-orange-500 inline-block text-transparent bg-clip-text"
      >
        <span>Shiki</span>
        <span class="font-extrabold mx-1">Magic</span>
        <span class="italic font-serif">Move</span>
      </span>
      <div class="text-stone-500">
        Smoothly animated code blocks with
        <a
          href="https://github.com/shikijs/shiki"
          target="_blank"
          class="underline"
          >Shiki</a
        >.
        <a
          href="https://github.com/shikijs/shiki-magic-move"
          target="_blank"
          class="underline"
          >GitHub</a
        >
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4 flex-auto overflow-hidden">
      <div class="overflow-hidden flex flex-col gap-4">
        <div class="flex-none flex flex-wrap gap-4 items-center -mb-[4px]">
          <button class="border border-stone-200 rounded px-3 py-1">
            Toggle examples
          </button>
          <!--          TODO Mas botones-->
        </div>

        <textarea
          [(ngModel)]="input"
          class="font-mono w-full h-full flex-auto p-4 border border-gray:20 rounded bg-transparent min-h-100"
        ></textarea>

        <div class="flex-none flex flex-wrap gap-6 items-center">
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
              class="w-40"
            />
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
              class="w-40"
            />
          </label>
          <label class="text-sm flex items-center gap-1">
            <input [(ngModel)]="useDebugStyles" type="checkbox" />
            Style for debugging
          </label>
          <label class="text-sm flex items-center gap-1">
            <input [(ngModel)]="lineNumbers" type="checkbox" />
            Line Numbers
          </label>
          <button
            class="border border-stone-200 rounded px-3 py-1"
            (click)="resetOptions()"
          >
            Reset Options
          </button>
        </div>
      </div>

      <div
        class="overflow-auto flex flex-col gap-4"
        [ngClass]="{ 'magic-move-debug-style': useDebugStyles() }"
      >
        <div class="flex-none flex flex-wrap gap-2 items-center">
          <select
            [(ngModel)]="theme"
            class="border border-stone-200 rounded px-2 py-1 text-sm"
          >
            @for (t of bundledThemesInfo; track t.id) {
            <option [value]="t.id">{{ t.displayName }}</option>
            }
          </select>
          <select
            [(ngModel)]="lang"
            class="border border-stone-200 rounded px-2 py-1 text-sm"
          >
            @for (l of bundledLanguagesInfo; track l.id) {
            <option [value]="l.id">{{ l.name }}</option>
            }
          </select>
        </div>
        <div #rendererContainer class="overflow-auto"></div>
      </div>
    </div>
  </div>`,
})
export class PlaygroundComponent {
  input = signal(defaultOptions.code);
  duration = signal(defaultOptions.duration);
  stagger = signal(defaultOptions.stagger);
  useDebugStyles = signal(defaultOptions.useDebugStyles);
  lineNumbers = signal(defaultOptions.lineNumbers);
  theme = signal(defaultOptions.theme);
  lang = signal(defaultOptions.lang);

  resetOptions() {}

  protected readonly bundledThemesInfo = bundledThemesInfo;
  protected readonly bundledLanguagesInfo = bundledLanguagesInfo;
}
