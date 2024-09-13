import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChecklistItem } from '../_models/checklist_item';
import { Category } from '../_models/category';

// Supondo que a categoria tenha 'id' e 'name' como campos obrigatórios
export const CHECKLIST_DATA: ChecklistItem[] = [
  {
    guid: 'aaa-bbb-ccc-ddd',
    completed: false,
    description: 'Ir ao oftalmologista',
    deadline: new Date(),
    postDate: new Date(),
    category: { guid: 'aaaa-bbbb-cccc-dddd', name: 'Saúde' },
  },
  {
    guid: 'bbb-ccc-ddd-eee',
    completed: true,
    description: 'Reunião com o gerente',
    deadline: new Date(),
    postDate: new Date(),
    category: { guid: 'aaaa-bbbb-cccc-dddd', name: 'Trabalho' },
  },
];

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  constructor() {}

  public getAllChecklistItems(): Observable<ChecklistItem[]> {
    return of(CHECKLIST_DATA);
  }
}
