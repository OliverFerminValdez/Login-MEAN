import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    miForm: FormGroup = this.fb.group({
      name: ['Test4',Validators.required],
      email: ['test4@gmail.com',[Validators.required,Validators.email]],
      password: ['123456',[Validators.required, Validators.minLength(6)]]
    })

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService){}

    registrar(){
      const {name, email, password} = this.miForm.value;

      this.authService.registerUser(name,email,password)
        .subscribe(ok => {
          if(ok === true){
            this.router.navigateByUrl('/dashboard');
          }else{
            Swal.fire('Error',ok,'error');
          }
        })
    }
}
 