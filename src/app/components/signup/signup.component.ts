import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm && this.signupForm.valid) {
      this.http.get<any[]>('assets/data.json').subscribe((users) => {
        const username = this.signupForm.get('username')?.value;
        const password = this.signupForm.get('password')?.value;

        if (!username || !password) {
          return;
        }

        const userExists = users.some((user) => {
          return user.username === username && user.password === password;
        });

        if (userExists) {
          this.router.navigate(['/welcome']);
        } else {
          this.openErrorDialog();
        }
      });
    }
  }

  openErrorDialog() {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        message: "Credentials didn't match."
      }
    });
  }
}
