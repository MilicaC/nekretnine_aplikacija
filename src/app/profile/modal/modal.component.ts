import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import {LoadingController, ModalController} from '@ionic/angular';
import { Nekretnina } from 'src/app/add-new-ad/add-new-ad.model';
import { AddNewAdService } from 'src/app/add-new-ad/add-new-ad.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
   balanceInput = new FormControl('', Validators.required);
  @Input() adresa: string;
  @Input() cena: number;
  @Input() godinagradnje: number;
  @Input() brojtelefona: string;
  @Input() email:string;
  @Input() sifra:string;
  //@Input() nekret: Nekretnina;
  @ViewChild('forma', { static: true }) form: NgForm;

  constructor(private adService: AddNewAdService,private loadingCtrl: LoadingController,private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal(){

    this.modalCtrl.dismiss();
  }


// metoda kad se klikne na izmeni ----- njena od add quote
  onDeposit(nek:Nekretnina){
    if (this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        // mozda c,e,b treba malo,....
        nekretninaData: {
          Cena: this.form.value.cena,
          Email: this.form.value.email,
          Brojtelefona: this.form.value.brojtelefona,
        }
      },
      'confirm'
    );
  }
                


  }

  

  



