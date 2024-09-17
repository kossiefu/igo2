import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-number-per-page',
  templateUrl: './number-per-page.component.html',
  styleUrls: ['./number-per-page.component.scss']
})
export class NumberPerPageComponent {
  @Output() numberChange = new EventEmitter<number>();

  onSelect(value: any) {
    console.log('Selected: ', value);
    this.numberChange.next(value);
  }
}
