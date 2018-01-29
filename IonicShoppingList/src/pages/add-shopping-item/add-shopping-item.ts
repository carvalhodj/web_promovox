import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Item } from '../../models/item/item.model';

import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { ToastService } from './../../services/toast/toast.service';

import moment from 'moment';

/**
 * Generated class for the AddShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html',
})
export class AddShoppingItemPage {
  public base64Image: string;
  public urldownload: string;
  public nameProduct: string;
  public priceProduct: number;
  public quantityProduct: number;

  item: Item = {
    name: '',
    quantity: 0,
    price: 0,
    image: "",
  }

  constructor(private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopping: ShoppingListService,
    private toast: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }

  addItem(item: Item) {
    this.shopping.addItem({
      name: this.nameProduct,
      quantity: this.quantityProduct,
      price: this.priceProduct,
      image: this.urldownload}).then(ref => {
      this.toast.show(`${this.nameProduct} added!`);
      this.navCtrl.setRoot('HomePage', { key: ref.key });
    })
  }

  async takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

  

      const result = await this.camera.getPicture(options);

      this.base64Image = `data:image/jpeg;base64,${result}`;
      const pictures = storage().ref('pictures/myPhoto');
      pictures.putString(this.base64Image, 'data_url');

      pictures.getDownloadURL().then((url) => {this.urldownload = url});




    }
    catch (e) {
      console.error(e);
    }
  }

  async grabPhoto() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref('pictures/myPhoto');
      pictures.putString(image, 'data_url');
    }
    catch (e) {
      console.error(e);
    }
  }
}
