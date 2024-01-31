import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testInput.component.html',
  styleUrls: ['./testInput.component.scss'],
})
export class TestInputComponent {
  @Output() inputValueChange = new EventEmitter<string>();

  @Input() label: string = '';
  @Input() description: string = '';
  @Input() required: boolean = false;

  private _inputValue: string = '';

  get inputValue() {
    return this._inputValue;
  }

  set inputValue(newValue: string) {
    this._inputValue = newValue;
    this.inputValueChange.emit(newValue);
  }

  onInputChange(event: any): void {
    const newValue = event.target.value;
    this.inputValue = newValue;
  }
}
