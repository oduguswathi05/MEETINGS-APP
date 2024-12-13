import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from '../../meetings.service';
import { IMeeting } from '../../models/IMeeting';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  searchParamOption = 'today';
  searchParamInput = '';
  meetings!:IMeeting[];

  constructor(private meetingsService: MeetingsService) {}

  searchMeeting(){
    this.meetingsService.searchMeetings(this.searchParamOption,this.searchParamInput).subscribe({
      next:(meetings)=>{
        this.meetings = meetings;
      },
      error:(error)=>{
        alert("Unable to search meetings")
      }
    })

  }

}
