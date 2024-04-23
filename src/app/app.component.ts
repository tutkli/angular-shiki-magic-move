import { Component } from '@angular/core'
import { PlaygroundComponent } from './playground.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlaygroundComponent],
  template: `
    <app-playground />
  `,
})
export class AppComponent {}
