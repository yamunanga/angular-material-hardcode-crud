import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { YamunangaEmployee } from '../Models/MasterModels/yamunanga-employee.model';
import { YamunangaEmployeeService } from '../Services/MasterService/yamunanga-employee.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertService } from '../Services/Alert.service';
@Component({
  selector: 'app-yamunanga-employee',
  templateUrl: './yamunanga-employee.component.html',
  styleUrls: ['./yamunanga-employee.component.scss']
})
export class YamunangaEmployeeComponent implements OnInit {
  //dateString:string;
  date:Date;
  cityPosition:number;//to send city position to select option
  empList:YamunangaEmployee[]=[]
  selection = new SelectionModel<YamunangaEmployee>(true, []);
  lenList:number;//to get length of empList
  cols=1;//for div management
  displayedColumns: string[] = ['index','firstName','lastName','address','city','birthday','age','select'];
  dataSource;//for pagination
  data = Object.assign(this.empList);//for multi select
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
   //for example
   empForm: FormGroup;
   isOnEdit:boolean;
   //for the date picker
  today = new Date(); 
  constructor( private alertService: AlertService,public empService:YamunangaEmployeeService) {

   }
  
  ngOnInit() {
    this.date=new Date();
    this.isOnEdit=false;
    this.allEmp();
    this.empForm =new FormGroup({
      id: new FormControl(),
      dateOfBirth :new FormControl('', [Validators.required]),
      cityN:new FormControl('', [Validators.required]),
      firstName:new FormControl('', [Validators.required, Validators.maxLength(8)]),
      lastName:new FormControl('', [Validators.required, Validators.maxLength(8)]),
      address:new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
   
  }
  //to send form validation eror msg
  public myError = (controlName: string, errorName: string) =>{
    return this.empForm.controls[controlName].hasError(errorName);
  }


 //sample cities
  city: any[] = [
    {position: 1, name: 'galle'},
    {position: 2, name: 'colombo'},
    {position: 3, name: 'kandy'},
    {position: 4, name: 'hambantota'},
    {position: 5, name: 'jafna'},
    
  ];

//to get all employee
  allEmp(){
    this.addEmp('Amal', 'Amal', 'Admas Lane', 'Colombo','1997/10/8',0);
    this.addEmp('Kasun', 'Kasun', 'St. Peters Lane', 'Colombo','1997/10/8',0);
    this.addEmp('Dasun', 'Dasun', 'First Lane', 'Colombo','1997/10/8',0);
    this.addEmp('Amil', 'Amila', 'Fifth Lane', 'Colombo','1997/10/8',0);
    this.addEmp('Nuwan', 'Nuwan', 'Admas Lane', 'Colombo','1997/10/8',0);
    this.addEmp('Srimal', 'Srimal', 'Fifth Lane', 'Colombo','1997/10/8',0);
    this.addEmp('Tharindu', 'Tharindu', 'Moses Lane', 'Colombo','1997/10/8',0);
    this.addEmp('Sadun', 'Sadun', 'Main street', 'Colombo','1997/10/8',0);
    this.dataSource = new MatTableDataSource(this.empList);
    this.lenList=this.empList.length;
    this.dataSource.paginator = this.paginator;
    
    
  }
//to add employee
  addEmp(firstName: string,lastName:string, address: string,city:string,birthday:String,age:number) {

    var emp:YamunangaEmployee=new YamunangaEmployee();
    
    var lastEmployee =this.empList[this.empList.length-1];
    
    emp.id =(lastEmployee)? lastEmployee.id + 1: 1;
    emp.firstName=firstName.toLowerCase() ;
    emp.lastName=lastName.toLowerCase();
    emp.address=address.toLowerCase() ;
    emp.city=city.toLowerCase();
    emp.birthday=this.empService.getDate(birthday);
    emp.age=this.empService.getAge(birthday);
    //this.empService.allEmp.push(this.dataModel);
    this.empList.push(emp)
    this.dataSource = new MatTableDataSource(this.empList);
    this.dataSource.paginator = this.paginator;
    this.lenList=this.empList.length;
    console.log(this.empList)
  }

//to update paginator and data source
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //to apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //test method
  onRowClicked(row){
    //console.log(row);
  }

  //For delete multiple column same time
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
//To work selections
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  //To delete multiple fields
  removeSelectedRows() {
    if (confirm('Are you sure to delete this Employee ?') == true) {
    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      //console.log(this.data.findIndex(d => d === item));
      this.data.splice(index,1)
      this.dataSource = new MatTableDataSource<YamunangaEmployee>(this.data);
    });
    this.selection = new SelectionModel<YamunangaEmployee>(true, []);
    this.dataSource.paginator = this.paginator;
    this.alertService.showSuccess('Successfully Deleted !');
  }
}

  //To open div
  changeCols2(){
    this.cols=2;
  }
   //To close div
  chageCols1(){
    this.cols=1;
    this.isOnEdit=false;
  }

 
 //To submit form 
onSubmit(){
  if(this.isOnEdit != true){
    if(this.empForm.value.firstName !='' && this.empForm.value.firstName !=null && this.empForm.value.lastName !='' && this.empForm.value.lastName !=null && this.empForm.value.address !='' && this.empForm.value.address !=null && this.empForm.value.cityN !='' && this.empForm.value.cityN !=null && this.empForm.value.dateOfBirth !='' && this.empForm.value.dateOfBirth !=null){
    this.addEmp(this.empForm.value.firstName,this.empForm.value.lastName,this.empForm.value.address,this.empForm.value.cityN,this.empForm.value.dateOfBirth,0);
    this.clearForm();
    this.alertService.showSuccess('Successfully Aded !');
  }else{
    this.alertService.showError('Empty Fields Found !');
  }
}else{
    let index = this.empList.findIndex(emp => emp.id === this.empForm.value.id);
    this.empList[index].firstName = this.empForm.value.firstName.toLowerCase();
    this.empList[index].lastName = this.empForm.value.lastName.toLowerCase();
    this.empList[index].address = this.empForm.value.address.toLowerCase();
    this.empList[index].city = this.empForm.value.cityN.toLowerCase();
    this.empList[index].birthday = this.empService.getDate(this.empForm.value.dateOfBirth);
    this.empList[index].age=this.empService.getAge(this.empForm.value.dateOfBirth)
    this.alertService.showSuccess('Successfully uppdated');
    this.clearForm();
    this.chageCols1();
  }
}

//to edit data
forEdit(data){
  //console.log(data[0].firstName);
  this.empService.now();
  this.isOnEdit=true;
  this.changeCols2();
  //this.sendPosition(data[0].city);
  this.changeDate(data[0].birthday);
  this.empForm.patchValue({
    firstName:data[0].firstName,
    lastName:data[0].lastName,
    address:data[0].address,
    cityN:data[0].city,
    dateOfBirth:data[0].birthday
  })

}

//to send city position to select option
/*sendPosition(name){
  var len=this.city.length;
  for(let i = 0; i < this.city.length; i++){
    if(this.city[i].name== name){
      this.cityPosition=this.city[i].position
      break;
    }
  }
}*/

//Tue Jan 04 2022 00:00:00 GMT+0530 (India Standard Time)

 //to reset form
 clearForm(){
  this.empForm.reset();
  this.date=new Date();
 }
//change date

changeDate(cDate){
  this.date= new Date(cDate);
}

}
