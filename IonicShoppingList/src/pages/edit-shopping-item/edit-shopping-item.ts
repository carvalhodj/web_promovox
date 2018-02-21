import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from './../../models/item/item.model';
import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { ToastService } from './../../services/toast/toast.service';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  item: Item;
  user: string;

  public categorias: any[];
  public tipos: any[];
  public marcas: any[];


  public selectedTipos: any[];
  public selectedMarcas: any[];

  public sCategoria: any;
  public sTipo: any;
  public sMarca: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopping: ShoppingListService,
    private toast: ToastService) {
      this.initializeCategoria();
      this.initializeTipo();
      this.initializeMarca();
  }


    initializeCategoria(){
      this.categorias = [
          {id: 1, name: 'Alimentos'},
          {id: 2, name: 'Eletrônicos'},
          {id: 3, name: 'Produtos de limpeza'}
      ];
      }

      initializeTipo(){
      this.tipos = [
          {id: 1, name: 'Feijão', categoria_id: 1, categoria_name: 'Alimentos'},
          {id: 2, name: 'Arroz', categoria_id: 1, categoria_name: 'Alimentos'},
          {id: 3, name: 'Creme dental', categoria_id: 3, categoria_name: 'Produtos de limpeza'},
          {id: 4, name: 'Sabonete', categoria_id: 3, categoria_name: 'Produtos de limpeza'},
          {id: 5, name: 'Mouse', categoria_id: 2, categoria_name: 'Eletrônicos'},
          {id: 7, name: 'Monitor', categoria_id: 2, categoria_name: 'Eletrônicos'}
      ];
      }

      initializeMarca(){
      this.marcas = [
          {id: 1, name: 'Tio João', categoria_id: 1, tipo_id: 1},
          {id: 2, name: 'Carioca', categoria_id: 1, tipo_id: 2},
          {id: 3, name: 'Turquesa', categoria_id: 1, tipo_id: 1},
          {id: 4, name: 'Multilaser', categoria_id: 2, tipo_id: 5},
          {id: 5, name: 'Logitech', categoria_id: 2, tipo_id: 5},
          {id: 6, name: 'LG', categoria_id: 2, tipo_id: 7},
          {id: 7, name: 'Sorriso', categoria_id: 3, tipo_id: 3},
          {id: 8, name: 'Sensodyne', categoria_id: 3, tipo_id: 3},
          {id: 9, name: 'Protex', categoria_id: 3, tipo_id: 4}
      ];
      }

    setTiposValues(sCategoria) {
        this.selectedTipos = this.tipos.filter(tipo => tipo.categoria_id == sCategoria.id)
    }

    setMarcaValues(sTipo) {
        this.selectedMarcas = this.marcas.filter(marca => marca.tipo_id == sTipo.id);
    }

  ionViewWillLoad() {
    this.item = this.navParams.get('item');
    this.user = this.navParams.get('user');
  }

  saveItem(item: Item, user: string) {
    item.user = user;
    this.shopping.editItem(item)
      .then( () => {
        this.toast.show(`${item.name} saved!`);
        this.navCtrl.setRoot('HomePage', {'user': user});
      });
  }

  removeItem(item: Item) {
    this.shopping.removeItem(item)
      .then( () => {
        this.toast.show(`${item.name} deleted!`);
        this.navCtrl.setRoot('HomePage');
      })
  }

}
