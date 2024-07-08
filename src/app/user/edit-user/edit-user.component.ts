import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { iUser } from '../../models/iUser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
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
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) {
      console.error('Invalid user ID');
      return;
    }
    this.userId = +idParam;
    if (isNaN(this.userId)) {
      console.error('Invalid user ID');
      return;
    }
    this.loadUserData();
  }



  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe(
      (user: iUser) => {
        this.editUserForm.patchValue(user);
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      this.userService.updateUser(this.userId, this.editUserForm.value).subscribe(
        () => {
          console.log('User updated successfully');
          this.router.navigate(['/user']); // Naviga alla pagina del profilo utente
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    }
  }

}
