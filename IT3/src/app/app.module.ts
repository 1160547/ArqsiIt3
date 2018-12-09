import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MessagesComponent }    from './messages/messages.component';
import { AppRoutingModule }     from './app-routing.module';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { AcabamentoDetailComponent } from './acabamento-detail/acabamento-detail.component';
import { AcabamentosComponent } from './acabamentos/acabamentos.component';
import { MaterialComponent } from './materiais/material.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { ItemComponent } from './itens/itens.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    ProdutosComponent,
    ProdutoDetailComponent,
    AcabamentoDetailComponent,
    AcabamentosComponent,
    MaterialDetailComponent,
    MaterialComponent,
    ItemComponent,
    ItemDetailComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
