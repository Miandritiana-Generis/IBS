import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/dark-logo2.png"
          class="align-middle m-2"
          alt="logo"
          width="90%"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
