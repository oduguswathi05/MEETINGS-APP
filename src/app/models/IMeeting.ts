interface IMeeting {
    name: string;            
    description: string;     
    date: string;            
    startTime:IStartTime;
    endTime: IEndtTime;
    attendees:IAttendee[];  
}

interface IAttendee {
    //userId: string;   
    email: string;    
}

interface IStartTime {
    hours: number;       
    minutes: number;     
};

interface IEndtTime {
    hours: number;       
    minutes: number;     
};

export type{IMeeting}
