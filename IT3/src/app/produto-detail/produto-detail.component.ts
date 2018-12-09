import { Component, OnInit,Input } from '@angular/core';
import { Produto } from '../model/produto';
import { Material } from '../model/material';
import { Acabamento } from '../model/acabamento';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.css']
})
export class ProdutoDetailComponent implements OnInit {
  @Input() produto: Produto;
  @Input() listaMateriais: Material[];
  @Input() listaAcabamentos: Acabamento[];
  

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProduto();
  }


  getProduto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.getProduto(id)
      .subscribe(produto => this.produto = produto);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.produtoService.updateProduct(this.produto)
      .subscribe(() => this.goBack());
  }

}
