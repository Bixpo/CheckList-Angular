import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';  // Importação do MatIconModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryComponent } from './category/category.component';
import { DialogComponent } from './dialog/dialog.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistEditComponent } from './checklist-edit/checklist-edit.component';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';

import { LOCALE_ID } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    CategoryComponent,
    DialogComponent,
    CategoryEditComponent,
    CategoryFormComponent,
    ChecklistComponent,
    ChecklistEditComponent,
    ChecklistFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,  // Adicionando o MatIconModule
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
