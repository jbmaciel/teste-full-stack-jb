import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntidadesListComponent } from './entidades-list/entidades-list.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: EntidadesListComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EntidadesModule { }
