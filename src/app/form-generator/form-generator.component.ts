import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormDataI } from '../interfaces/form-data.interface';
import { HttpClientModule } from '@angular/common/http';
import jsonData from '../assets/form-data.json';
import {
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

      if (field.type === 'testCheckbox') {
        const checkboxGroup = this.fb.group({});
        field.choices?.forEach((choice) => {
          checkboxGroup.addControl(choice, new FormControl(false));
        });
        this.form.addControl(field.labelEn, checkboxGroup);
      } else {
        this.form.addControl(field.labelEn, this.fb.control('', validators));
      }
    });
  }

  updateFormControlValue(controlName: string, newValue: any) {
    console.log(newValue);
    this.form.get(controlName)?.setValue(newValue);
    // console.log(this.form.get('Name'));
  }

  updateCheckboxValues(
    controlName: string,
    values: { [key: string]: boolean }
  ) {
    const checkboxGroup = this.form.get(controlName) as FormGroup;
    checkboxGroup.patchValue(values);
  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
