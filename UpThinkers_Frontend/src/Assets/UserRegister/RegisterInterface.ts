export interface RegisterForm {
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Mobile: number | null;
    Profile?: string ;
    type?:string;
}

export interface RegisterValidate {
    status:boolean;
    ErrorForm:ErrorForm;
}


export interface ErrorForm {
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Mobile: string;
    Main: string;
}