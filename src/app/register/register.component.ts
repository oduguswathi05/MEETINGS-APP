import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from '../meetings.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private meetingsService:MeetingsService,private router:Router){}

  regUser(registerDetails:NgForm){
    const newuser = registerDetails.value
    console.log(newuser)
    this.meetingsService.postNewUser(newuser).subscribe({
      next:()=>{
        console.log("registration successful")
        this.router.navigate(['/']);
      }
    })
  }

 


}
