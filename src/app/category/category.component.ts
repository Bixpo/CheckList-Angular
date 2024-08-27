import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

export const CATEGORY_DATA = [
  { name: 'Educação', guid: 'aaa-bbb-ccc-dddd' },
  { name: 'Saúde', guid: 'aaa-bbb-ccc-dddd' },
  { name: 'Trabalho', guid: 'aaa-bbb-ccc-dddd' },
  { name: 'Outros', guid: 'aaa-bbb-ccc-dddd' },
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = CATEGORY_DATA;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public editCategory(inputCategory: Category) {
    console.log('edit category click');

    const dialogRef = this.dialog.open(CategoryEditComponent, {
      disableClose: true,
      data: { editCategory: inputCategory },
    });

    dialogRef.componentInstance.closeModelEventEmitter.subscribe(
      (closeModal: boolean) => {
        if (!closeModal) {
          dialogRef.close(); // Fecha o modal ao clicar em "Cancelar"
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      console.log('Modal editar fechada');
    });
  }

  public deleteCategory(category: Category) {
    this.dialog
      .open(DialogComponent, {
        disableClose: true,
        data: {
          dialogMsg: 'Você tem certeza que gostaria de apagar a categoria?',
          leftButtonLabel: 'Cancelar',
          rightButtonLabel: 'Confirmar',
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          console.log('Categoria apagada com sucesso!');
        } else {
          console.log('Categoria não apagada');
        }
      });
  }

  public createNewCategory() {
    console.log('create new category click');

    const dialogRef = this.dialog.open(CategoryEditComponent, {
      disableClose: true,
      data: { editCategory: null }, // Passa null para indicar uma nova categoria
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nova categoria criada:', result);
        // Adicione a nova categoria ao dataSource
        this.dataSource.push(result);
        this.dataSource = [...this.dataSource]; // Atualiza a tabela
      } else {
        console.log('Criação de nova categoria cancelada');
      }
    });
  }
}
