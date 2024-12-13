import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { MeetingsService } from '../meetings.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(loginDetails: NgForm) {
    if (loginDetails.invalid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.authService.loginUser(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Invalid credentials. Please try again.');
      },
    });
  }
}
