import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from './../Services/Alert.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../Services/MasterService/User.service';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../Models/MasterModels/UserModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import * as $ from "jquery";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'firstName', 'address1', 'address2'];
  dataSource: MatTableDataSource<Users>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarComponent, { static: false }) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: false }) directiveRef?: PerfectScrollbarDirective;

  userList: Users[] = []
  userObject: Users;
  selecteduserID = -1;

  editAndDelteBtndisble = true;
  moved = false;
  OperationBtnText = "Save";
  
  @ViewChild(FormGroupDirective, { static: false }) UserFormDirective: FormGroupDirective
  UserForm: FormGroup;

  constructor(
    private alertService: AlertService,
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.UserForm = new FormGroup({
      userID: new FormControl(),
      username: new FormControl(),
      firstName: new FormControl(),
      address1: new FormControl(),
      address2: new FormControl()
    });
    this.LoadExistingUsers();
  }

  // Form Configuration
  getForm(){
    if(!this.moved){
      this.moved=true;
      this.selecteduserID = -1; // for add, selected row should be un highlited 
      $('.rightForm').css({ 'transform': 'translate(-500px,0px)' });
    }
  }

  MoveOutForm(){
    $('.rightForm').css({ 'transform': 'translate(500px,0px)' });
  }
  
  highlight(row) {
    this.selecteduserID = row.userID;
    this.editAndDelteBtndisble = false;
    if(this.moved){
      this.moved=false;
      $('.rightForm').css({ 'transform': 'translate(500px,0px)' });
    }
  }

  clearSelection(){
    this.selecteduserID = -1;
    this.editAndDelteBtndisble = true;
  }

  clearForm(){
    //write to clear form
    this.selecteduserID = -1;
    this.editAndDelteBtndisble = true;
    this.OperationBtnText = "Save"
    this.UserForm.reset();
  }

  //Load Uaers
  LoadExistingUsers() {
    this.addUser('Amal123', 'Amal', 'Admas Lane', 'Colombo');
    this.addUser('Kasun94', 'Kasun', 'St. Peters Lane', 'Colombo');
    this.addUser('Dasun@123', 'Dasun', 'First Lane', 'Colombo');
    this.addUser('Amil_5', 'Amila', 'Fifth Lane', 'Colombo');
    this.addUser('Nuwan#12', 'Nuwan', 'Admas Lane', 'Colombo');
    this.addUser('Srimal5', 'Srimal', 'Fifth Lane', 'Colombo');
    this.addUser('Tharindu12', 'Tharindu', 'Moses Lane', 'Colombo');
    this.addUser('Sadun12', 'Sadun', 'Main street', 'Colombo');

    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(){
    console.log("save",this.UserForm.value);
    
    //write submit function in here
    if(this.OperationBtnText ==="Save"){
      this.addUser(
        this.UserForm.value.username, 
        this.UserForm.value.firstName, 
        this.UserForm.value.address1,  
        this.UserForm.value.address2,
        );
        this.clearForm();
        this.alertService.showSuccess('Successfully inserted');
        //After success remove the form
        setTimeout(() => { 
          this.moved =false       
          $('.rightForm').css({ 'transform': 'translate(500px,0px)' });
        }, 500);
    }else{
      let index = this.userList.findIndex(user => user.userID === this.UserForm.value.userID);
      this.userList[index].username = this.UserForm.value.username;
      this.userList[index].firstName = this.UserForm.value.firstName;
      this.userList[index].address1 = this.UserForm.value.address1;
      this.userList[index].address2 = this.UserForm.value.address2;
      this.alertService.showSuccess('Successfully uppdated');
      this.OperationBtnText = "Save"
      this.selecteduserID = -1;
      //After success remove the form
      setTimeout(() => { 
        this.clearForm();
        this.moved =false       
        $('.rightForm').css({ 'transform': 'translate(500px,0px)' });
      }, 500);
    }
  }
  
  getFormToEdit(){
    //fill form here to update
    let index = this.userList.findIndex(user => user.userID === this.selecteduserID);
    this.UserForm.patchValue({
      userID : this.selecteduserID,
      username : this.userList[index].username,
      firstName : this.userList[index].firstName,
      address1 : this.userList[index].address1,
      address2 : this.userList[index].address2
    })
    this.OperationBtnText = "Update"
    //get the form
    this.moved = true;
    $('.rightForm').css({ 'transform': 'translate(-500px,0px)' });
  }

  delete(){
    //write delete functions here
    let index = this.userList.findIndex(user => user.userID === this.selecteduserID);
    this.selecteduserID = -1;
    this.userList.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
    this.editAndDelteBtndisble = true;
    this.alertService.showSuccess('Successfully deleted');
  }

  addUser(username: string, firstname: string, address1: string, address2: string) {
    var user: Users = new Users();
    var index: number = 0;

    index = this.userList.length;

    user.userID = index;
    user.username = username;
    user.firstName = firstname;
    user.address1 = address1;
    user.address2 = address2;

    this.userList.push(user);
    

    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
  }
}
