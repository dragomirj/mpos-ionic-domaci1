import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth, private router: Router) { }

  async __register({email, password}){
    try {
      const _user = await createUserWithEmailAndPassword(this.auth, email, password);
      return _user;
    } catch (error) {
      return null;
    }
  }

  async __login({email,password}){
    try {
      const _user = await signInWithEmailAndPassword(this.auth, email, password);
      return _user;
    } catch (error) {
      return null;
    }
  }

  async __logout(){
    await signOut(this.auth);
    return this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
  }
}
