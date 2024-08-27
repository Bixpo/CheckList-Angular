import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../_models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  @Input() public actionName = 'Editar';

  public categoryForm!: FormGroup;

  @Output() closeModelEventEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Input() public editCategory!: Category;

  public isFormReady = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [
        this.editCategory != null ? this.editCategory.name : '',
        Validators.required,
      ],
    });
    this.isFormReady = true;
  }

  public cancel() {
    console.log('Cancelar clicado');
    this.closeModelEventEmitter.emit(false);
  }

  public save() {
    console.log('Save clicado');
    this.closeModelEventEmitter.emit(true);
  }
}
