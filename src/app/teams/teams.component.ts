import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { MeetingsService } from '../meetings.service';
import { ITeams } from '../models/ITems';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamsService } from './teams.service';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [HomeComponent,CommonModule,FormsModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent implements OnInit{
teams!:ITeams[];
selectedMemberId = '';
users!:IUser[];

  constructor(private teamsService:TeamsService) {}
   
  ngOnInit(): void {
    this.getTeams();
    this.getUsers();
  }

  getTeams(){
    this.teamsService.getTeams().subscribe({
      next:(data)=>{
        console.log(data)
        this.teams = data
      }
    })
  }

  excuse(teamId:string){
    this.teamsService.excuseYourself(teamId).subscribe({
     next:(data)=>{
       console.log(data)
       console.log("removed successfully")
       this.teams = this.teams.filter((team) => team._id !== data._id);
     }
    })
 }

 getUserEmailById(userId: string): string {
  
  const user = this.users.find(u => u._id === userId);
  return user ? user.email : '';
}

addMember(teamId: string, userId: string, userEmail: string){
  if (!userId) {
    console.error('User ID is not selected or is undefined');
    return; 
  }
    this.teamsService.addAttendee(teamId,userId,userEmail).subscribe({
    next:(team)=>{
      console.log(team)
      console.log("member added successfully")
      console.log(this.teams)
      
    }
  })
}

getUsers(){
  this.teamsService.getUsers().subscribe({
    next:(data)=>{
      console.log(data)
      this.users = data
    }
  })
}


}
