import { Component, OnInit, ViewChild } from '@angular/core';
import {IonList, IonRouterOutlet, ModalController} from '@ionic/angular';
import {ModalComponent} from './modal/modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('lista') lista: IonList;


  // Simple Variables
  imageURL='assets/stan_plaza.jpg';
  estateName='Atraktivan stan kod Plaze';
  estatePrice='87';
  // Object literar
  advertisement1= {
    imageURL:'assets/stan_plaza.jpg',
    estateName:'Atraktivan stan kod Plaze',
    estatePrice:87
  };
  //array
  loopCounter = [1,2,3,4,5];

  //Array of objects
  advertisementsList = [
    {imageURL:'assets/stan_plaza.jpg',
      estateName:'Novogradnja na Vracaru',
      estatePrice:'87,000 €', id: 1

    },
    {imageURL:'assets/stan_2.jpg',
      estateName:'Atraktivan stan kod Plaze',
      estatePrice:'94,000 €', id: 2},
    {imageURL:'assets/stan_3.jpg',
      estateName:'Stan na Cvetkovoj pijaci',
      estatePrice:'67,000 €',id: 3}
  ];
  fromModal: any;

  constructor(private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
  }

   async openModal() {
      // @ts-ignore
     const modal = await this.modalCtrl.create({
        component: ModalComponent,
        componentProps:{
          name: 'TechAssembler',
          type: 'Subscribe'
        },
        cssClass:'my-modal-component-css',
        swipeToClose:true,
      //  presentingElement:this.routerOutlet
       presentingElement: await this.modalCtrl.getTop()
      });
      modal.onDidDismiss().then((data: any)=>{
        this.fromModal=data;
     });

    return await modal.present();
  }

  delete(advertisement){
    console.log(advertisement);
    this.lista.closeSlidingItems();
  }

  update(advertisement){
    console.log(advertisement);
    this.lista.closeSlidingItems();
  }

}
