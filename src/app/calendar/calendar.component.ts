import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from '../meetings.service';
import { IMeeting } from '../models/IMeeting';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,FormsModule,HomeComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{
  selectedDate: string = this.formatDate(new Date());
  formattedSelectedDate:string = '';
  meetings!:IMeeting[];
  constructor(private meetingsService:MeetingsService){}

  ngOnInit() {
    this.formatDisplayDate(new Date());
    this.getMeetingsByDate();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  
    const day = ('0' + date.getDate()).slice(-2);  
    return `${year}-${month}-${day}`;
    
  }

  onDateChange() {
    const selectedDateObj = new Date(this.selectedDate);
    this.formatDisplayDate(new Date(selectedDateObj));
    this.getMeetingsByDate();
  }

  formatDisplayDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    console.log(date)
    this.formattedSelectedDate=  date.toLocaleDateString('en-GB', options); 
    
  }

  getMeetingsByDate(){
    this.meetingsService.getMeetingsByDate(this.selectedDate).subscribe({
      next:(data)=>{
        console.log(data)
        this.meetings = data;
      }
    })
  }
}
