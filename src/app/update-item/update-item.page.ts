import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService, DJ } from '../service/data.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
  @Input() dj: DJ;
  constructor(public modalCtrl: ModalController,private dataService: DataService) {}
  ngOnInit() {
    //console.warn(dj);
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async __updateData(){
    await this.dataService.__updateData(this.dj);
    this.dismiss();
  }

  async __deleteData() {
    await this.dataService.__deleteData(this.dj);
    this.dismiss();
  }
}
