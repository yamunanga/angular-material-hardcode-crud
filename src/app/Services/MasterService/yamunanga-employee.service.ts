import { Injectable } from '@angular/core';
import { YamunangaEmployee } from 'src/app/Models/MasterModels/yamunanga-employee.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class YamunangaEmployeeService {
  allEmp:YamunangaEmployee[];
  constructor() { }
  

//Helpers
//for convert date coming from db
getDate(date){
  var stillUtc = moment.utc(date).toDate();
  var currentTime= moment(stillUtc).local().format('MMMM Do YYYY');
  return currentTime;
}

//for the now time
now(){
let now = moment();
var stillUtc = moment.utc(now).toDate();
var currentTime= moment(stillUtc).local().format('MMMM Do YYYY');
//console.log(currentTime)
return currentTime;
}
//for get age
getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}








}
