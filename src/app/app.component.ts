import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string = 'document';

  onNavClick(navFeature: string) {
    this.selectedFeature = navFeature;
  }
}
