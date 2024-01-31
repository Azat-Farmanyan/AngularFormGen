import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  forwardRef,
  input,
} from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldI } from '../../interfaces/form-data.interface';

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testInput.component.html',
  styleUrls: ['./testInput.component.scss'],
})
export class TestInputComponent implements OnChanges {
  ngOnChanges(): void {
    if (!this.required) {
      this.multiple
        ? this.inputValueChange.emit(this.inputValuesArray)
        : this.inputValueChange.emit(this._inputValue);
    }
  }

  @Output() inputValueChange = new EventEmitter<string | string[]>();

  @Input() field: FormFieldI;
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() required: boolean = false;
  @Input() multiple: boolean = false;

  private _inputValue: string = '';
  inputValuesArray: string[] = [''];

  get inputValue() {
    return this._inputValue;
  }

  set inputValue(newValue: string) {
    this._inputValue = newValue;

    this.inputValueChange.emit(this._inputValue);
  }

  onInputChange(event: any): void {
    const newValue = event.target.value;
    this.inputValue = newValue;
  }

  onInputChangeForMultiple(event: any, inputItemIndex: number): void {
    const newValue = event.target.value;

    this.inputValuesArray[inputItemIndex] = newValue;

    this.inputValueChange.emit(this.inputValuesArray);
  }

  createInput() {
    if (this.inputValuesArray[this.inputValuesArray.length - 1].length > 0)
      this.inputValuesArray.push('');
  }
  deleteInput() {
    this.inputValuesArray.pop();
    this.inputValueChange.emit(this.inputValuesArray);
  }
}
