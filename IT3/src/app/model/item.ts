export class Item {
    id:number;
    idProduto: number;
    idAcabamento: number;
    idMaterial: number;
    profundidade: number;
    largura: number;
    altura: number;
    filhos:Item[];
    itemPai: Item
  }
