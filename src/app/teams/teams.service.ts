import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.production';
import { ITeams } from '../models/ITems';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private apiUrl = environment.apiUrl;
  

  constructor(private http:HttpClient) { }

  getTeams(){
    return this.http.get<ITeams[]>(`${this.apiUrl}/api/teams`)
  }

  excuseYourself(teamId:string){
    return this.http.patch<ITeams>(`${this.apiUrl}/api/teams/${teamId}?action=remove_member`,{},
    {
      headers:{
        'Content-Type':'application/json'
      }
    }
  )
  }

  addAttendee(meetingId:string,userId:string,userEmail:string){
    const params = new HttpParams()
      .set('action', 'add_member')
      .set('userId', userId)
      .set('email', userEmail);

    return this.http.patch<ITeams>(`${this.apiUrl}/api/teams/${meetingId}`, {}, {
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getUsers(){
    return this.http.get<IUser[]>(`${this.apiUrl}/api/users`)
  }
  
}
