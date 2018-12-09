import { Component, OnInit,Input } from '@angular/core';
import { Acabamento } from '../model/acabamento';

@Component({
  selector: 'app-acabamento-detail',
  templateUrl: './acabamento-detail.component.html',
  styleUrls: ['./acabamento-detail.component.css']
})
export class AcabamentoDetailComponent implements OnInit {
  @Input() acabamento: Acabamento;
  constructor() { }

  ngOnInit() {
  }

}
