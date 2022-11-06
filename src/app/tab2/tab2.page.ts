import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
}) /* DJ DJ DJ - TAB2 */
export class Tab2Page implements OnInit, OnDestroy {
  sub: Subscription;
  dj: any;
  constructor(public modalCtrl: ModalController, private dataService: DataService, private authService: UserService) {}
  ngOnInit() {
    this.__getData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async __getData(){ /* Get FIREBASE/FIRESTORE data! */
    this.sub = await this.dataService.__getData().subscribe((__res) => {
      this.dj = __res; //console.log(this.dj);
    })
  }

  async __goToAddPage() {
    const _modal = await this.modalCtrl.create({
      component: AddNewItemPage,
    });
    return await _modal.present();
  }

  async __goToUpdatePage(dj) {
    const modal = await this.modalCtrl.create({
      component: UpdateItemPage,
      componentProps: { dj },
    });
    return await modal.present();
  }

  __logout(){
    return this.authService.__logout();
  }
  //DELETE IS IN UPDATE-ITEM!
}
