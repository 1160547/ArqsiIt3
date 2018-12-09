import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { AcabamentosComponent } from './acabamentos/acabamentos.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MaterialComponent } from './materiais/material.component';
import { ItemComponent }      from './itens/itens.component';
import { ItemDetailComponent }  from './item-detail/item-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ItemDetailComponent },
  { path: 'produtos', component: ProdutosComponent},
  { path: 'acabamentos', component: AcabamentosComponent },
 { path: 'materiais', component: MaterialComponent },
  { path: 'itens', component: ItemComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
