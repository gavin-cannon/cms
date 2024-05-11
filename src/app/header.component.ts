import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  collapsed = true;
  @Output() headerClickEvent = new EventEmitter<string>();

  onHeaderClick(selectedItem: string) {
    this.headerClickEvent.emit(selectedItem);
   }
}