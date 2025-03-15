import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ErrorsService } from '../../services/errors.service';
import { Router, RouterModule } from '@angular/router';

//Modules
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ SpinnerComponent, CommonModule, FormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  loading: boolean = false;

  constructor(
    private toast: ToastrService,
        private _userService: UserService,
        private _errorService: ErrorsService,
        private router: Router
  ) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  logIn() {
    if (this.email == "" || this.password == "") {
      this.toast.error("Please fill all the fields");
      return;
    }

    const user: User = {
      email: this.email,
      password: this.password
    }

    this._userService.logIn(user).subscribe({
      next: (response: any) => {
        const token = response.token;
        console.log(token);
        this.loading = false;
        this.toast.success(`Login success`, 'Success');
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token', token);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.messageError(e);
      },
      complete: () => {
        console.log('Complete');
      }
    });

  }
}
