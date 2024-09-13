import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistItem } from '../_models/checklist_item';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
import { ChecklistService } from '../service/checklist.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
})
export class ChecklistComponent implements OnInit {
  public dataSource: ChecklistItem[] = [];

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
  constructor(
    private dialog: MatDialog,
    private ChecklistService: ChecklistService
  ) {}

  ngOnInit(): void {
    this.ChecklistService.getAllChecklistItems().subscribe(
      (resp: ChecklistItem[]) => {
        this.dataSource = resp;
      }
    );
  }

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
