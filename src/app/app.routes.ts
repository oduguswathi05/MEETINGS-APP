import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { TeamsComponent } from './teams/teams.component';
import { AddMeetingComponent } from './meetings/add-meeting/add-meeting.component';
import { FilterComponent } from './meetings/filter/filter.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        title:'Login'

    },
    {
        path:'register',
        component:RegisterComponent,
        title:'Register'
    },
   

    {
        path:'home',
        component:HomeComponent,
        title:'Home'
    },

    {
        path:'calendar',
        component:CalendarComponent,
        title:'Calendar'
    },

    {
        path:'meetings',
        component:MeetingsComponent,
        title:'Meetings',

        children:[
            {
                path:'add',
                component:AddMeetingComponent,
                title:'Add Meetings'
            },
            {
                path:'filter',
                component:FilterComponent,
                title:'Filter Meetings'
            },
            

        ]
    },

    {
        path:'teams',
        component:TeamsComponent,
        title:'Teams'
    }

    

];
