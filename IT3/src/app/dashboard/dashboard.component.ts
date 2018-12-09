import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  itens: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItens();
  }

  getItens(): void {
    this.itemService.getItems()
      .subscribe(itens => this.itens = itens.slice(1, 5));
  }
}
