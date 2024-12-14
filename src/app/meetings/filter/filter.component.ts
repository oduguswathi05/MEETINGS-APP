import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from '../../meetings.service';
import { IMeeting } from '../../models/IMeeting';
import { IUser } from '../../models/IUser';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  searchParamOption = 'present';
  searchParamInput = '';
  meetings!:IMeeting[];
  users!:IUser[];
  selectedMemberId = '';

  constructor(private meetingsService: MeetingsService) {}

  ngOnInit(): void {
    this.getUsers();
  
  }

  searchMeeting(){
    if(this.searchParamInput == ''){
      this.meetingsService.searchMeetings2(this.searchParamOption).subscribe({
        next:(data)=>{
          console.log(data)
          this.meetings = data;
        },
        error:(error)=>{
          alert("Unable to search meetings")
        }
      })
    }
    this.meetingsService.searchMeetings(this.searchParamOption,this.searchParamInput).subscribe({
      next:(data)=>{
        console.log(data)
        this.meetings = data;
      },
      error:(error)=>{                                                                                                                          
        alert("Unable to search meetings")
      }
    })
  }

  getUsers(){
    this.meetingsService.getUsers().subscribe({
      next:(data)=>{
        console.log(data)
        this.users = data
      }
    })
  }

  excuse(meetingId:string){
     this.meetingsService.excuseYourself(meetingId).subscribe({
      next:(meeting)=>{
        console.log(meeting)
        console.log("removed successfully")
      }
     })
  }

  addMember(meetingId: string, userId: string, userEmail: string){
    if (!userId) {
      console.error('User ID is not selected or is undefined');
      return; 
    }
      this.meetingsService.addAttendee(meetingId,userId,userEmail).subscribe({
      next:(meeting)=>{
        console.log(meeting)
        console.log("member added successfully")
      }
    })
  }

  getUserEmailById(userId: string): string {
    const user = this.users.find(u => u._id === userId);
    return user ? user.email : '';
  }

}
