import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './models/IUser';

import { environment } from '../environments/environment.production';
import { IMeeting } from './models/IMeeting';

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
}
