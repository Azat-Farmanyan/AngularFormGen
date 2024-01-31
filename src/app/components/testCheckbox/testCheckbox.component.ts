import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormFieldI } from '../../interfaces/form-data.interface';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testCheckbox.component.html',
  styleUrls: ['./testCheckbox.component.scss'],
})
export class TestCheckboxComponent {
  //  "type": "testCheckbox",
  //     "labelRu": "Навыки",
  //     "labelEn": "Skills",
  //     "required": true,
  //     "choices": [

  @Input() field: FormFieldI;
  @Output() checkboxValuesChange = new EventEmitter<{
    [key: string]: boolean;
  }>();

  private _checkboxValues: { [key: string]: boolean } = {};

  get checkboxValues() {
    return this._checkboxValues;
  }

  set checkboxValues(newValues: { [key: string]: boolean }) {
    this._checkboxValues = newValues;
    this.checkboxValuesChange.emit(newValues);
  }

  onCheckboxChange(choice: string, event: any): void {
    if (choice === 'Выделить все') {
      // If "Выделить все" is clicked, set all checkboxes to the state of the "Выделить все" checkbox
      const selectAllValue = event.target.checked;

      const updatedValues: { [key: string]: boolean } = {};
      this.field.choices?.forEach((c) => (updatedValues[c] = selectAllValue));

      this.checkboxValues = updatedValues;
    } else {
      // If any other checkbox is clicked, update its state
      this.checkboxValues = {
        ...this.checkboxValues,
        [choice]: event.target.checked,
      };
    }
  }
  // @Input() label: string = '';
  // @Input() description: string = '';
  // @Input() required: boolean = false;
  // @Input() choices: string[] = [];
}
