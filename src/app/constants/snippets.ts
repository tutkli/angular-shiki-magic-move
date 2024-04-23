export const angularBefore = `import { Component, signal } from '@angular/core'

@Component({style
  selector: 'app-root',
  standalone: true,
  template: \`
  <div class="container">
    <button (click)="add()">{{count()}}</button>
  </div>
  \`
})
export class AppComponent {
  count = signal(0)

  add() {
    this.count.set(this.count() + 1)
  }
}`

export const angularAfter = `<script lang="ts">
  import { signal } from '@angular/core';

  const count = signal(0);

  function add() {
    count.set(count() + 1);
  }
</script>

<template>
  <div class="container">
    <button (click)="add()">{{count()}}</button>
  </div>
</template>`
