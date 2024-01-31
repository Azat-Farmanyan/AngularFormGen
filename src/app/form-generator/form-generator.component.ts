import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormDataI } from '../interfaces/form-data.interface';
import { HttpClientModule } from '@angular/common/http';
import jsonData from '../assets/form-data.json';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TestCheckboxComponent } from '../components/testCheckbox/testCheckbox.component';
import { TestInputComponent } from '../components/testInput/testInput.component';
import { TestNumberComponent } from '../components/testNumber/testNumber.component';
import { TestSelectComponent } from '../components/testSelect/testSelect.component';

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TestSelectComponent,
    TestNumberComponent,
    TestInputComponent,
    TestCheckboxComponent,
  ],
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
})
export class FormGeneratorComponent implements OnInit {
  formData: FormDataI = jsonData;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup([]);
  }

  ngOnInit(): void {
    this.formData.fields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];

      if (field.type === 'testCheckbox' && !!field.multiple === false) {
        const checkboxGroup = this.fb.group({}, validators);
        field.choices?.forEach((choice) => {
          checkboxGroup.addControl(choice, new FormControl(false));
        });
        this.form.addControl(field.labelEn, checkboxGroup);
      } else if (!!field.multiple) {
        const fieldArray = this.fb.array([], validators);
        this.form.addControl(field.labelEn, fieldArray);
      } else {
        this.form.addControl(field.labelEn, this.fb.control('', validators));
      }
    });
  }

  updateFormControlValue(
    controlName: string,
    newValue: any,
    multiple: boolean = false
  ) {
    multiple
      ? this.updateMultipleValues(controlName, newValue)
      : this.form.get(controlName)?.setValue(newValue);
  }

  updateCheckboxValues(
    controlName: string,
    values: { [key: string]: boolean }
  ) {
    const checkboxGroup = this.form.get(controlName) as FormGroup;
    checkboxGroup.patchValue(values);
  }

  updateMultipleValues(controlName: string, values: string[]) {
    const multipleArray = this.form.get(controlName) as FormArray;

    while (multipleArray.length) {
      multipleArray.removeAt(0);
    }

    values.forEach((value) => {
      multipleArray.push(this.fb.control(value));
    });
  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.form.reset();
    }
  }
}
