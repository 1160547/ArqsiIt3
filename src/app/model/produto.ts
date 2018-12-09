export class Produto {
    id: number;
  nome: {nome:string} ;
  categoria: {
    nome: { nome: string };
  };
  produtoMateriais: [{ idMaterial: number; idProduto: number}];
  produtoFilhos: Produto;
  dimensao: {
    altura: { valorMin: number; valorMax: number };
    largura: { valorMin: number, valorMax: number };
    profundidade: { valorMin: number, valorMax: number };
  }
  restricao: { valorMin: number; valorMax: number; mesmoMaterialAcabamento: boolean }

  }
