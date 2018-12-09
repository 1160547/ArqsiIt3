import { Component, OnInit } from '@angular/core';

import { Item } from '../model/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItemComponent implements OnInit {

  selectedItem: Item;

  itens: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItens();
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

  getItens(): void {
    this.itemService.getItems()
        .subscribe(itens => this.itens = itens);
  }
}
