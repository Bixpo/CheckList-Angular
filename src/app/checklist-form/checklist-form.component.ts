import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ChecklistItem } from '../_models/checklist_item';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Category } from '../_models/category';
import { CATEGORY_DATA } from '../category/category.component';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css'],
})
export class ChecklistFormComponent implements OnInit {
  @Input() public actionName = 'Editar';
  @Input() public checklistItem!: ChecklistItem;
  @Output() public formCloseEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @ViewChild(FormGroupDirective)
  checklistFormGroupDirective!: FormGroupDirective;

  public categories: Category[] = CATEGORY_DATA;

  public checklistForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checklistForm = this.formBuilder.group({
      completed: [
        this.checklistItem != null ? this.checklistItem.completed : false,
        Validators.required,
      ],
      description: [
        this.checklistItem != null ? this.checklistItem.description : '',
        Validators.required,
      ],
      deadline: [
        this.checklistItem != null ? this.checklistItem.deadline : new Date(),
        Validators.required,
      ],
      category: [
        this.checklistItem != null ? this.checklistItem.category : null,
        Validators.required,
      ],
    });
  }

  public clearForm() {
    this.checklistForm.reset();
    this.checklistFormGroupDirective.resetForm();
  }

  public save() {
    this.formCloseEvent.emit(true);
  }

  public cancel() {
    this.formCloseEvent.emit(false);
  }
}
