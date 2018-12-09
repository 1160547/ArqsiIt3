import { Component, OnInit,Input } from '@angular/core';
import { Material } from '../model/material';
@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {
  @Input() material: Material;
  constructor() { }

  ngOnInit() {
  }

}
