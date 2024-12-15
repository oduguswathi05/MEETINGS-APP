import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IUser } from './models/IUser';

import { environment } from '../environments/environment.production';
import { IMeeting } from './models/IMeeting';
import { Observable } from 'rxjs';
import { ITeams } from './models/ITems';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  

  postNewUser(newUser:Omit<IUser,'_id'>){
     return this.http.post<{}>(`${this.apiUrl}/api/auth/register`,newUser,{
      headers:{
        'Content-Type':'application/json'
      }
     })
  }

  addMeeting(newMeetingDetails:IMeeting){
     return this.http.post<IMeeting>(`${this.apiUrl}/api/meetings`,newMeetingDetails,{
      headers:{
        'Content-Type':'application/json'
      }
     })
  }

  searchMeetings(searchParamOption:string,searchParamInput:string){
    return this.http.get<IMeeting[]>(`${this.apiUrl}/api/meetings?period=${searchParamOption}&search=${searchParamInput}`)
  }

  searchMeetings2(searchParamOption:string){
    return this.http.get<IMeeting[]>(`${this.apiUrl}/api/meetings?period=${searchParamOption}&search=`)
  }

  getUsers(){
    return this.http.get<IUser[]>(`${this.apiUrl}/api/users`)
  }
  

  excuseYourself(meetingId:string){
    return this.http.patch<IMeeting>(`${this.apiUrl}/api/meetings/${meetingId}?action=remove_attendee`,{},
    {
      headers:{
        'Content-Type':'application/json'
      }
    }
  )
  }

  addAttendee(meetingId:string,userId:string,userEmail:string){
    const params = new HttpParams()
      .set('action', 'add_attendee')
      .set('userId', userId)
      .set('email', userEmail);

    return this.http.patch<IMeeting>(`${this.apiUrl}/api/meetings/${meetingId}`, {}, {
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getMeetingsByDate(date:string){
    return this.http.get<IMeeting[]>(`${this.apiUrl}/api/calendar?date=${date}`)
  }

  
}

