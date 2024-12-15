interface ITeams {
    _id:string;
    name: string;            
    shortName: string;     
    description: string;            
   
    members:IAttendee[];  
}

interface IAttendee {
    userId: string;   
    email: string;    
}

export type{ITeams}
