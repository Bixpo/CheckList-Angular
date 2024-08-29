import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CATEGORY_DATA } from '../category/category.component';
import { ChecklistItem } from '../_models/checklist_item';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';

export const CHECKLIST_DATA = [
  {
    guid: 'aaa-bbb-ccc-ddd',
    completed: false,
    description: 'Ir ao oftalmologista',
    deadline: Date.now(),
    postdate: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name === 'Educação'),
  },
  {
    guid: 'aaa-bbb-ccc-ddd',
    completed: true,
    description: 'Reunião com o gerente',
    deadline: Date.now(),
    postdate: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name === 'Trabalho'),
  },
];

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
})
export class ChecklistComponent implements OnInit {
  public dataSource = CHECKLIST_DATA;

  public displayedColumns: string[] = [
    'id',
    'completed',
    'description',
    'deadline',
    'postdate',
    'category',
    'actions',
  ];

  // Injeção de MatDialog no construtor
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public updateCompleteStatus(status: boolean) {
    console.log(`Status alterado: ${status}`);
  }

  public createNewItem() {
    const dialogRef = this.dialog.open(ChecklistEditComponent, {
      disableClose: true,
      data: { actionName: 'Criar' },
    });

    dialogRef.componentInstance.closeModelEventEmitter.subscribe(
      (closeModal: boolean) => {
        if (!closeModal) {
          dialogRef.close(); // Fecha o modal ao clicar em "Cancelar"
        }
      }
    );
  }

  public updateChecklistItem(checklistItem: ChecklistItem) {
    console.log('Atualizando item do checklist');

    const dialogRef = this.dialog.open(ChecklistEditComponent, {
      disableClose: true,
      data: { updateChecklistItem: checklistItem, actionName: 'Editar' },
    });

    dialogRef.componentInstance.closeModelEventEmitter.subscribe(
      (closeModal: boolean) => {
        if (!closeModal) {
          dialogRef.close(); // Fecha o modal ao clicar em "Cancelar"
        }
      }
    );
  }

  public deleteChecklistItem(checklistItem: ChecklistItem) {
    console.log('Deletando item do checklist');

    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      data: {
        dialogMsg: 'Você tem certeza que deseja apagar esse item?',
        leftButtonLabel: 'Cancelar',
        rightButtonLabel: 'Confirmar',
      },
    });

    dialogRef.afterClosed().subscribe((resp: boolean) => {
      if (resp) {
        console.log('Item do checklist apagado com sucesso!');
        // Adicione aqui a lógica para remover o item do checklist
      } else {
        console.log('Item do checklist não apagado');
      }
    });
  }
}
