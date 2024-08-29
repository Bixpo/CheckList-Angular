import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ChecklistItem } from '../_models/checklist_item';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-checklist-edit',
  templateUrl: './checklist-edit.component.html',
  styleUrls: ['./checklist-edit.component.css'],
})
export class ChecklistEditComponent implements OnInit {
  public actionName = 'Editar';
  public checklistItem!: ChecklistItem;

  @Output() closeModelEventEmitter = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ChecklistEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.updateChecklistItem != null) {
      this.checklistItem = data.updateChecklistItem;
    }
    if (data.actionName != null) {
      this.actionName = data.actionName;
    }
  }

  ngOnInit(): void {}

  public onFormClose($event: any) {
    this.dialogRef.close();
  }
}
