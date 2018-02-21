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
        {id: 1, name: 'Melaka'},
        {id: 2, name: 'Johor'},
        {id: 3, name: 'Selangor'}
    ];
    }

    initializeTipo(){
    this.tipos = [
        {id: 1, name: 'Alor Gajah', categoria_id: 1, categoria_name: 'Melaka'},
        {id: 2, name: 'Jasin', categoria_id: 1, categoria_name: 'Melaka'},
        {id: 3, name: 'Muar', categoria_id: 2, categoria_name: 'Johor'},
        {id: 4, name: 'Segamat', categoria_id: 2, categoria_name: 'Johor'},
        {id: 5, name: 'Shah Alam', categoria_id: 3, categoria_name: 'Selangor'},
        {id: 7, name: 'Klang', categoria_id: 3, categoria_name: 'Selangor'}
    ];
    }

    initializeMarca(){
    this.marcas = [
        {id: 1, name: 'City of Alor Gajah 1', categoria_id: 1, tipo_id: 1},
        {id: 2, name: 'City of Alor Gajah 2', categoria_id: 1, tipo_id: 1},
        {id: 3, name: 'City of Jasin 1', categoria_id: 1, tipo_id: 2},
        {id: 4, name: 'City of Muar 1', categoria_id: 2, tipo_id: 3},
        {id: 5, name: 'City of Muar 2', categoria_id: 2, tipo_id: 3},
        {id: 6, name: 'City of Segamat 1', categoria_id: 2, tipo_id: 4},
        {id: 7, name: 'City of Shah Alam 1', categoria_id: 3, tipo_id: 5},
        {id: 8, name: 'City of Klang 1', categoria_id: 3, tipo_id: 6},
        {id: 9, name: 'City of Klang 2', categoria_id: 3, tipo_id: 6}
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
