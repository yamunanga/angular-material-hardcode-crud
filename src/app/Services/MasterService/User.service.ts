
import { CommonHTTPRequestsService } from "./../CommonHTTPRequests.service";
import { GlobalParametersService } from "./../GlobalParameters.service";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from "../../Models/MasterModels/UserModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Users[];

  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }

  InsertUsers(users: Users): Observable<any> {
    return this.HTTPRequests.RequestPOST(users, `${this.GlobalParameters.primaryAPI}end_point_here`)
  }

}
