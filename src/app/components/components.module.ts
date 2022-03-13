import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './features/home/home.component';
import { InfoComponent } from './features/info/info.component';
import { AngularPaginatedTableFypModule } from 'angular-paginated-table-fyp';



@NgModule({
  declarations: [
    HomeComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    AngularPaginatedTableFypModule
  ],
  exports: [
  ]
})
export class ComponentsModule { }
