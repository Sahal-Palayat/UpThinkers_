export interface Course {
 
    Name?:string;
    Status?:boolean;
    Description?:string;
    Image?:string;
    Price?:number;
    OfferPrice?:number;
    Duration?:string;
    Category?:string;
    lessons?:[];
    Tutor?:string;
    CreatedAt?:Date;
    UpdatedAt?:Date;
}