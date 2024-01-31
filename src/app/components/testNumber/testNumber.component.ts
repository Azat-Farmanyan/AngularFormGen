import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-number',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testNumber.component.html',
  styleUrls: ['./testNumber.component.scss'],
})
export class TestNumberComponent {
  @Output() inputValueChange = new EventEmitter<number>();

  @Input() label: string = '';
  @Input() description: string = '';
  @Input() required: boolean = false;

  private _inputValue: number = 1;

  get inputValue() {
    return this._inputValue;
  }

  set inputValue(newValue: number) {
    this._inputValue = newValue;
  }

  onInputChange(event: any): void {
    const newValue = +event.target.value;
    if (newValue < 1) {
      this._inputValue = 1;
    } else {
      this.inputValue = newValue;
      this.inputValueChange.emit(this._inputValue);
    }
  }

  increaseNumber() {
    this._inputValue++;
    this.inputValueChange.emit(this._inputValue);
  }

  decreaseNumber() {
    if (this._inputValue > 1) {
      this._inputValue--;
      this.inputValueChange.emit(this._inputValue);
    }
  }
}
