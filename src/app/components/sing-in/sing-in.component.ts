import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';

//Services
import { UserService } from '../../services/user.service';
import { ErrorsService } from '../../services/errors.service';

//Modules
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sing-in',
  imports: [ SpinnerComponent, CommonModule, FormsModule, RouterModule ],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})

export class SingInComponent implements OnInit {
  name: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;

  loading: boolean = false;

  constructor(
    private toast: ToastrService,
    private _userService: UserService,
    private _errorService: ErrorsService,
    private router: Router
  ) { 
    this.name = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }
  ngOnInit(): void {
  }

  addUser() {
    if (this.name == "" || this.lastName == "" || this.email == "" || this.password == "" || this.repeatPassword == "") {
      this.toast.error("Please fill all the fields");
      return;
    } else {
      if (this.password != this.repeatPassword) {
        this.toast.error("Passwords do not match");
        return;
      }
    }

    const user: User = {
      name: this.name,
      lastname: this.lastName,
      email: this.email,
      password: this.password
    }

    console.log(user);

    this.loading = true;

    this._userService.singIn(user).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = false;
        this.toast.success(`User ${this.name} ${this.lastName} added successfully`);
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.messageError(e);
        this.router.navigate(['/login']);
      },
      complete: () => {
        console.log('Complete');
      }
    });

  }
}