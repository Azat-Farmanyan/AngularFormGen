import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testSelect.component.html',
  styleUrls: ['./testSelect.component.scss'],
})
export class TestSelectComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() required: boolean = false;
}
