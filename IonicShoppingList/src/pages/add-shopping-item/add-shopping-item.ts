import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Item } from '../../models/item/item.model';

import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { ToastService } from './../../services/toast/toast.service';

import moment from 'moment';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
  public pictures: firebase.storage.Reference;
  user: string;

  item: Item = {
    name: '',
    quantity: 0,
    price: 0,
    image: "",
    user: "",
  }

  constructor(private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopping: ShoppingListService,
    private toast: ToastService,
   private alertCtrl: AlertController,
 public loading: LoadingController) {
   this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }



  addItem(item: Item, user: string) {
    let loader = this.loading.create({
      content: 'Salvando Item...',
    });

    loader.present().then(() => {
      this.pictures.putString(this.base64Image, 'data_url').then((savedPicture) =>{
        this.pictures.getDownloadURL().then((url) => {this.urldownload = url;
        this.shopping.addItem({
          name: this.nameProduct,
          quantity: this.quantityProduct,
          price: this.priceProduct,
          image: this.urldownload,
        user: user}).then(ref => {
          loader.dismiss();
          this.toast.show(`${this.nameProduct} added!`);
          this.navCtrl.setRoot('HomePage', {'user': user});
        })})
      }
    )
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

      var name = 'pictures/myPhoto'+moment().toString()
      this.pictures = storage().ref(name);

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
