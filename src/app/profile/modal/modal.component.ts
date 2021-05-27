import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() name: string;
  @Input() type: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  _dismiss() {
        this.modalCtrl.dismiss({
          fromModal: 'Subscribed Channel'
        });
  }
}
