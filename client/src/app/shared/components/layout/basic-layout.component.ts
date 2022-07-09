import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-layout',
  template: `
    <header class="gable-header">
      <span class="gable-logo-text">
        Gable
      </span>
    </header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent {

}
