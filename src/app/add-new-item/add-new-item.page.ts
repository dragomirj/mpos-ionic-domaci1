import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../service/data.service';

const _day = new Date().getDate();
const _mon = new Date().getMonth() + 1;
function toIsoString(date) { //WORKS!
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function(num) {
      return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    dif + pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' + pad(Math.abs(tzo) % 60);
} //https://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript

var __dt = new Date();
const _datetime = toIsoString(__dt);

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.page.html',
  styleUrls: ['./add-new-item.page.scss'],
})
export class AddNewItemPage implements OnInit {
  _today: string = _datetime;
  _day: number = _day;
  _mon: number = _mon;

  dataName: string;
  dataAway: number;
  dataDate= _datetime;
  constructor(public modalCtrl: ModalController,private dataService: DataService) {}
  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async addData() {
    await this.dataService.__addData({
      name: this.dataName,
      away: this.dataAway,
      date: this.dataDate
    });
    this.dismiss();
  }
}
