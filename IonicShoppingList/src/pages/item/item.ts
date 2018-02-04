import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from './../../models/item/item.model';
import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { ToastService } from './../../services/toast/toast.service';

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  item: Item;
  user: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopping: ShoppingListService,
    private toast: ToastService) {
  }

  removeItem(item: Item, user: string) {
    this.shopping.removeItem(item)
      .then( () => {
        this.toast.show(`${item.name} deleted!`);
        this.navCtrl.setRoot('HomePage', {'user': user});
      })
  }

  ionViewWillLoad() {
    this.item = this.navParams.get('item');
    this.user = this.navParams.get('user');
  }


}
