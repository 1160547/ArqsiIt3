import { Component, OnInit } from '@angular/core';
import { AcabamentoService } from '../acabamento.service';
import { Acabamento } from '../model/acabamento';
@Component({
  selector: 'app-acabamentos',
  templateUrl: './acabamentos.component.html',
  styleUrls: ['./acabamentos.component.css']
})
export class AcabamentosComponent implements OnInit {

  selectedAcabamento: Acabamento;
  acabamentos: Acabamento[];
  acabamentoEscondidoCriar: boolean = false;
  acabamentoEscondidoEditar: boolean = false;
  nomeAcabamentoEditar: string;
  editarNomeAcabamento: string;
  descricaoAcabamentoEditar: string;
  editarDescricaoAcabamento: string;
  constructor(private acabamentoService: AcabamentoService) { }

  ngOnInit() {
    this.getAcabamentos();
  }

  onSelect(acabamento: Acabamento): void {
    this.selectedAcabamento = acabamento;
  }
  getAcabamentos(): void {
    this.acabamentoService.getAcabamentos()
      .subscribe(acabamentos => this.acabamentos = acabamentos);
  }

  estadoCriarAcabamento() {
    this.acabamentoEscondidoCriar = !this.acabamentoEscondidoCriar;
    this.acabamentoEscondidoEditar = false;
  }

  estadoEditarAcabamento() {
    this.acabamentoEscondidoCriar = false;
    this.acabamentoEscondidoEditar = !this.acabamentoEscondidoEditar;
  }

  adicionarAcabamento(nomeAcabamento: string, descricao: string) {
    this.acabamentoService.adicionarAcabamento({
      nome: {
        nome: nomeAcabamento
      },

      descricao: {
        descricao: descricao
      },

    } as Acabamento).subscribe(acabamento => { this.acabamentos.push(acabamento) });
  }


  atualizarDados() { 
    this.nomeAcabamentoEditar = this.selectedAcabamento.nome.nome;
    this.editarNomeAcabamento = this.selectedAcabamento.nome.nome;
    this.descricaoAcabamentoEditar = this.selectedAcabamento.descricao.descricao;
    this.editarDescricaoAcabamento = this.selectedAcabamento.descricao.descricao;
  }

  atualizarAcabamento() {

    this.acabamentoService.atualizarAcabamento({
      id: this.selectedAcabamento.id,
      nome: {
        nome: this.nomeAcabamentoEditar
      },
      descricao: {
        descricao: this.descricaoAcabamentoEditar
      },
    } as Acabamento).subscribe(_ => {   
      let novaLista: Acabamento[] = [];
      for (let i = 0; i < this.acabamentos.length; i++) {
        if (this.acabamentos[i].id == this.selectedAcabamento.id) {
          novaLista.push({
            id: this.selectedAcabamento.id,
            nome: {
              nome: this.nomeAcabamentoEditar
            },

            descricao: {
              descricao: this.descricaoAcabamentoEditar
            },
          } as Acabamento);
        } else {
          novaLista.push(this.acabamentos[i]);
        }
      }
      this.acabamentos = novaLista;
    });




  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }
}
