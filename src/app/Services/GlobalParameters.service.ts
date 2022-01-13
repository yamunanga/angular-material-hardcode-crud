import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalParametersService {

  primaryAPI: String;

  constructor() {
    this.primaryAPI = 'http://localhost:55011/'


  }
}


