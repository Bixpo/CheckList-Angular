import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../_models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  public editCategory!: Category;
  public actionName: string = 'Editar';
  closeModelEventEmitter: any;

  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    if (dialogData.editCategory != null) {
      this.editCategory = dialogData.editCategory;
    } else {
      this.editCategory = new Category(); // Inicializa uma nova categoria
    }
    this.actionName = dialogData.actionName || 'Editar';
  }

  ngOnInit(): void {}

  // Escuta o evento emitido pelo CategoryFormComponent
  public onFormClose(closeModal: boolean) {
    if (!closeModal) {
      this.dialogRef.close(); // Fecha o modal ao cancelar
    } else {
      // Lógica de salvamento pode ser adicionada aqui
      this.dialogRef.close(this.editCategory); // Fecha e retorna a categoria editada
    }
  }
}
