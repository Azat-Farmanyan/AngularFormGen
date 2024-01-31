import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testSelect.component.html',
  styleUrls: ['./testSelect.component.scss'],
})
export class TestSelectComponent implements OnChanges {
  @Output() inputValueChange = new EventEmitter<string>();

  ngOnChanges(): void {
    if (this.activeOption.length === 0) {
      if (this.choices.length > 0) {
        this.activeOption = this.choices[0];
        this.selectedItem = this.choices[0];
        // this.inputValueChange.emit(this.selectedItem);
      }
    }
  }
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() required: boolean = false;
  @Input() activeOption: string = '';
  @Input({
    required: true,
  })
  choices: string[] = [];

  selectedItem: string = '';
  optionsIsOpen: boolean = false;

  optionToggle() {
    this.optionsIsOpen = !this.optionsIsOpen;
  }

  setActive(selectedItemRes: string) {
    this.activeOption = selectedItemRes;
    this.selectedItem = selectedItemRes;

    this.inputValueChange.emit(this.selectedItem);
  }
}
