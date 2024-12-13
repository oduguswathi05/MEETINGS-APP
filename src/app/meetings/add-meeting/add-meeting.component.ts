import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MeetingsService } from '../../meetings.service';
import { IMeeting } from '../../models/IMeeting';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-meeting',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-meeting.component.html',
  styleUrl: './add-meeting.component.scss',
})
export class AddMeetingComponent {
  message: string = '';
  constructor(private meetingsService: MeetingsService) {}

  newMeetings(newMeeting: NgForm) {
    
    const details = newMeeting.value;

    if (details.attendees) {
      details.attendees = details.attendees
        .split(',')
        .map((email: string) => email.trim());
    }  

    

    const startHr = details.st1;
    const startMin = details.st2;

    const endHr = details.et1;
    const endMin = details.et2;

    const formAdd: Omit<IMeeting,'_id'> = {
      name: details.name,
      startTime: { hours: startHr, minutes: startMin },
      endTime: { hours: endHr, minutes: endMin },
      date: details.date,
      description: details.description,
      attendees:details.attendees,
    };
    console.log(formAdd)
    this.meetingsService.addMeeting(formAdd).subscribe({
      next: (data: IMeeting) => {
        console.log(data);
        newMeeting.resetForm();
        this.message = 'Meeting added successfully!';
      },
      error: (err) => {
        console.log(err);
        alert('There was an error while adding the meeting. Please try again.');
      },
    });
  }
}
