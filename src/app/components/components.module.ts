import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './features/home/home.component';
import { InfoComponent } from './features/info/info.component';
import { PaginatedTableComponent } from './shared/paginated-table/paginated-table.component';



@NgModule({
  declarations: [
    HomeComponent,
    InfoComponent,
    PaginatedTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginatedTableComponent
  ]
})
export class ComponentsModule { }
