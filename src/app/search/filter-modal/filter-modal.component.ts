import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {
  modalController: ModalController;




  filterForm:FormGroup;




  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
   
  }
  
  ZatvoriModal() {
    
    this.modalCtrl.dismiss(null,'cancel');
  }
  Pretrazi(form: NgForm){
    this.modalCtrl.dismiss(form.value,'confirm');
    console.log(form.value);
  }
}



