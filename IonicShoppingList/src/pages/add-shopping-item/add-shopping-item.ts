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
  public pictures: firebase.storage.Reference;

  public categorias: any[];
  public tipos: any[];
  public marcas: any[];


  public selectedTipos: any[];
  public selectedMarcas: any[];

  public sCategoria: any;
  public sTipo: any;
  public sMarca: any;
  user: string;



  item: Item = {
    name: '',
    price: 0,
    image: "",
    user: "",
    categoria: {id: 0, name: ""},
    tipo: {id: 0, name: "", categoria_id: 0, categoria_name: ""},
    marca: {id: 0, name: "", categoria_id: 0, tipo_id: 0},

  }

  constructor(private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopping: ShoppingListService,
    private toast: ToastService,
   private alertCtrl: AlertController,
 public loading: LoadingController) {
   this.initializeCategoria();
   this.initializeTipo();
   this.initializeMarca();

   this.user = this.navParams.get('user');
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
          price: this.priceProduct,
          image: this.urldownload,
          categoria: this.sCategoria,
          tipo: this.sTipo,
          marca: this.sMarca,
          user: user
        }).then(ref => {
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
