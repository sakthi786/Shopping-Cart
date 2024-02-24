import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msg: string;

  constructor(public userSer: UsersService, public router: Router) {

  }


  ngOnInit(): void {
    $('.toggle').click(()=>{
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
      }, "slow");
    });

    this.loginForm = new FormGroup({
      'Username': new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required)
    });
    
  }

  doLogin() {
    this.userSer.userLogin(this.loginForm.value).subscribe({
      next: (data: string) =>{

       if(data.length === 0) {
        this.msg = "Invalid Login";
       } else {
        localStorage.setItem('loggeduser', data);
        this.router.navigateByUrl('/');
       }

      }, error: (error: any) =>{

        console.log(error);

      }
    })
  }

  doRegister(form: NgForm) {
    this.userSer.userRegistration(form.value).subscribe({
      next: (data: string) => {

        this.msg = data;
        form.reset();

      }, error: (error: any) => {

        console.log(error);
        this.msg = "Something went wrong";
      }
    })
  }

}
