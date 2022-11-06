/* eslint-disable @typescript-eslint/no-shadow */
import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';

/* TESTING ONLY - TASKS! */
// export interface Task {
//   id?: number;
//   name: string;
//   date: string;
//   category: string;
//   priority: string;
// }

export interface DJ {
  id?: number;
  name: string;
  away: number;
  date: string;
}

@Injectable({
  providedIn: 'root',
}) /* DJ DJ DJ - DATESERVICE! */
export class DataService {
  constructor(private firestore: Firestore) {}
  __addData(dj: DJ) { /* Create new ENTRY! */
    const _ref = collection(this.firestore, 'dj-data');
    return addDoc(_ref, dj);
  } //>Create

  __getData(){ /* Return collection of data from 'dj-data' */
    const _ref = collection(this.firestore, 'dj-data');
    return collectionData(_ref, {idField: 'id'});
  } //>Read

  __updateData(dj: DJ) { /* Update existing DATA! */
    const _ref = doc(this.firestore, `dj-data/${dj.id}`);
    return updateDoc(_ref, {
      name: dj.name,
      away: dj.away,
      date: dj.date
    });
  } //>Update

  __deleteData(dj: DJ) { /* Delete document from 'dj-data' collection! */
    const _ref = doc(this.firestore, `dj-data/${dj.id}`);
    return deleteDoc(_ref);
  } //>Delete

  /* TESTING PURPOSES ONLY! */
  // __test_getTasks(){
  //   const _ref = collection(this.firestore, 'tasks');
  //   return collectionData(_ref, {idField: 'id'});
  // }
}
