import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../model/interface';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  formData!: FormGroup;
  employeeObject: Employee = new Employee();
  employeeData!: any 
  // = new Employee();
  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.getEmployee()
    this.formData = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
  }

  postEmployee() {
    this.employeeObject.firstName = this.formData.value.firstName;
    this.employeeObject.lastName = this.formData.value.lastName;
    this.employeeObject.email = this.formData.value.email;
    this.employeeObject.mobile = this.formData.value.mobile;
    this.employeeObject.salary = this.formData.value.salary;

    this.api.postData(this.employeeObject).subscribe((res) => {
      console.log(res);
      alert('Employee added Successfully');
      let ref = document.getElementById('cancle');
      ref?.click()
      this.formData.reset();
    },( err) => {
      alert('Somthing Went Worng')
    });
  }
  getEmployee(){
    this.api.getData().subscribe((res:any)=>{
      this.employeeData = res;
      console.log(this.employeeData)
    })
  }
  deleteEmployee(row:any){
    console.log(row)
    this.api.deleteData(row.id).subscribe(res=>{
      console.log(res);
      this.getEmployee()
    })
  }
  editEmployee(row:any){
    this.formData.controls['firstName'].setValue(row.firstName);
    this.formData.controls['lastName'].setValue(row.lastName);
    this.formData.controls['email'].setValue(row.email);
    this.formData.controls['mobile'].setValue(row.mobile);
    this.formData.controls['salary'].setValue(row.salary);
  }
}
