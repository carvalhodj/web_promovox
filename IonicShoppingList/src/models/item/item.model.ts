export interface Item {
  key?: string;
  name: string;
  price: number;
  image: string;
  user: string;
  categoria: {id: number, name: string};
  tipo: {id: number, name: string, categoria_id: number, categoria_name: string};
  marca: {id: number, name: string, categoria_id: number, tipo_id: number};
}
