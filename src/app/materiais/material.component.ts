import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';
import { Material } from '../model/material';
import { Acabamento } from '../model/acabamento';

@Component({
  selector: 'app-materiais',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})

export class MaterialComponent implements OnInit {
  selectedMaterial: Material;
  materialEscondidoCriar: boolean = false;
  materialEscondidoEditar: boolean = false;
  materiais: Material[];
  nomeMaterialEditar: string;
  editarNomeMaterial: string;
  acabamentosSelecionados: Acabamento[] = [];
  acabamentosSelecionadosEditar: Acabamento[] = [];
  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.getMateriais();
  }

  estadoCriarMaterial() {
    this.materialEscondidoCriar = !this.materialEscondidoCriar;
    this.materialEscondidoEditar = false;
  }

  estadoEditarMaterial() {
    this.materialEscondidoCriar = false;
    this.materialEscondidoEditar = !this.materialEscondidoEditar;
  }

  onSelect(material: Material): void {
    this.selectedMaterial = material;
  }
  getMateriais(): void {
    this.materialService.getMateriais()
      .subscribe(materiais => { this.materiais = materiais;  });
  }

  adicionarMaterial(nomeMaterial: string) {
    this.materialService.adicionarMaterial({
      nome: {
        nome: nomeMaterial
      },

    } as Material).subscribe(material => { this.materiais.push(material) });
  }

  atualizarDados() {
    this.nomeMaterialEditar = this.selectedMaterial.nome.nome;
    this.editarNomeMaterial = this.selectedMaterial.nome.nome;
  }

  atualizarMaterial() {

    this.materialService.atualizarMaterial({
      id: this.selectedMaterial.id,
      nome: {
        nome: this.nomeMaterialEditar
      },
    } as Material).subscribe(_ => {
      let novaLista: Material[] = [];
      for (let i = 0; i < this.materiais.length; i++) {
        if (this.materiais[i].id == this.selectedMaterial.id) {
          novaLista.push({
            id: this.selectedMaterial.id,
            nome: {
              nome: this.nomeMaterialEditar
            },
          } as Material);
        } else {
          novaLista.push(this.materiais[i]);
        }
      }
      this.materiais = novaLista;
    });




  }
 
}
