import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miForm: FormGroup = this.fb.group({
      email: ['test4@gmail.com',[Validators.required,Validators.email]],
      password: ['abcdefg',[Validators.required, Validators.minLength(6)]]
  });

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService){}

    login(){
      console.log(this.miForm.value);
      const {email,password} = this.miForm.value;

      this.authService.loginUser(email,password)
      .subscribe( ok =>{

            console.log(ok);

            if(ok === true){
              this.router.navigateByUrl('/dashboard');
            }else{
              Swal.fire('Error',ok,'error'); 
            }
        })
    }
}
