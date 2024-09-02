import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding text-center">
      <a href="/">
        <img
          src="./assets/images/logos/dark-logo.png"
          class="align-middle m-2"
          alt="logo"
          width="80%"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
