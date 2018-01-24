import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams} from 'ionic-angular';
import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs/Observable';
import { User } from "./../../models/user/user";
import { Item } from './../../models/item/item.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;
  user = {} as User;


  constructor(public navParams: NavParams ,navCtrl: NavController, private shopping: ShoppingListService) {
    this.user = this.navParams.get('user');
    this.shoppingList$ = this.shopping.getShoppingList() // DB List
                                      .snapshotChanges() // Key and value pairs
                                      .map(
                                        changes => {
                                          return changes.map(c => ({
                                            key: c.payload.key,
                                            ...c.payload.val()
                                          }));
                                        });

  }

  getItems(ev) {
   // Reset items back to all of the items
   this.shoppingList$ = this.shopping.getShoppingList() // DB List
                                     .snapshotChanges() // Key and value pairs
                                     .map(
                                       changes => {
                                         return changes.map(c => ({
                                           key: c.payload.key,
                                           ...c.payload.val()
                                         }));
                                       });


   // set val to the value of the ev target
   var val = ev.target.value;

   // if the value is an empty string don't filter the items
   if (val && val.trim() != '') {
     this.shoppingList$ = this.shoppingList$.map( items => items.filter((item) => {
       return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
     }))

   }
 }


}
