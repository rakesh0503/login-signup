import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signUpForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fullName: [''],
      email: [''],
      password: [''],
      mobile: ['']
    })
  }
  signUp() {
    this.http.post<any>('http://localhost:3000/signupUsers', this.signUpForm.value).subscribe((res) => {
      alert("Singup Successfull");
      this.signUpForm.reset();
      this.router.navigate(['/login'])
    }, (err) => {
      alert("Something Went Wrong");
      console.log(err)
    })
    // .subscribe((res) => {
    //     // alert("Singup Successfull");
    //     // this.signUpForm.reset();
    //     // this.router.navigate(['/login'])
    //   },(err:any)=>{
    //     alert("Something Went Wrong");
    //     console.log(err)
    //   })
  }
}
