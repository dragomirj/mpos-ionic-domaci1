import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  async _register(){
    const loading = await this.loadingController.create();
		await loading.present(); //Loading 

		const _user = await this.authService.__register(this.credentials.value);
		await loading.dismiss(); //Remove loading when done!

		if (_user) {
			this.router.navigateByUrl('/tabs/tab2', { replaceUrl: true });
		} else {
			this.showAlert('Neuspela registracija', 'Molimo Vas pokusajte ponovo!');
		}
  }

  async _login(){
    const loading = await this.loadingController.create();
		await loading.present();  //Loading 

		const _user = await this.authService.__login(this.credentials.value);
		await loading.dismiss(); //Remove loading when done!

		if (_user) {
			this.router.navigateByUrl('/tabs/tab2', { replaceUrl: true });
		} else {
			this.showAlert('Neuspesna prijava', 'Molimo Vas pokusajte ponovo!');
		}
  }

  async showAlert(header, message){
    const _alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await _alert.present();
  }
}
