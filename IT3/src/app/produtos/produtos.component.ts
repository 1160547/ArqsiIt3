import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Produto } from '../model/produto';
import { Material } from '../model/material';
import { MaterialService } from '../material.service';
import { Acabamento } from '../model/acabamento';
import { AcabamentoService } from '../acabamento.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})

export class ProdutosComponent implements OnInit {
  selectedProduto: Produto;
  listaMateriaisProduto: Material[] = [];
  listaAcabamentosMaterial: Acabamento[] = [];
  produtos: Produto[];
  constructor(private produtoService: ProdutoService, private materialService: MaterialService, private acabamentoService: AcabamentoService) { }


  ngOnInit() {
    this.getProdutos();
  }

  
  onSelect(produto: Produto): void {
    this.selectedProduto = produto;
    this.getMateriaisProduto();
    this.getAcabamentosMaterial();
  }

  getAcabamentosMaterial() {
    this.materialService.getMateriais().subscribe(
      materiais => {
        let listaAcabamentos = [];
        materiais.forEach(materialAtual => {
          this.selectedProduto.produtoMateriais.forEach(materialProduto => {
            if (materialProduto.idMaterial == materialAtual.id) {
              materialAtual.materialAcabamentos.forEach(ma => {

                this.acabamentoService.getAcabamentoPorId(ma.acabamentoId).subscribe(acabamento =>
                  listaAcabamentos.push(acabamento)
                )
              });
            }
          })
        });
        this.listaAcabamentosMaterial = listaAcabamentos;
      }
    );
  }


  getMateriaisProduto() {
    this.materialService.getMateriais().subscribe(
      materiais => {
        let listaMateriais = [];
        materiais.forEach(materialAtual => {
          this.selectedProduto.produtoMateriais.forEach(materialProduto => {
            if (materialProduto.idMaterial == materialAtual.id) {
              listaMateriais.push(materialAtual);
            }
          })
        });

        this.listaMateriaisProduto = listaMateriais;
      }
    );
  }


  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }
/*
  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.produtoService.addProduto({ nome } as Produto)
      .subscribe(produto => {
        this.produtos.push(produto);
      });
  } */



 
  delete(produto: Produto): void {
    this.produtos = this.produtos.filter(p => p !== produto);
    this.produtoService.deleteproduto(produto).subscribe();
  }

}
