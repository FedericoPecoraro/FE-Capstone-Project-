// edit-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { iUser } from '../../models/iUser';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  currentUser: iUser | null = null;
  showSuccessBanner = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authSvc.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.editUserForm.patchValue(this.currentUser);
      }
    });
  }

  onSubmit(): void {
    if (this.editUserForm.valid && this.currentUser) {
      this.userService.updateUser(this.currentUser.id, this.editUserForm.value).subscribe(
        () => {
          console.log('User updated successfully');
          this.showSuccessBanner = true;
          setTimeout(() => {
            this.showSuccessBanner = false;
          }, 3000);
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    }
  }
}
