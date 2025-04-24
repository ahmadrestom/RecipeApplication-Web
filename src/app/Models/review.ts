interface ReviewUser{
    imageUrl:string;
    firstName:string;
    lastName:string;
    userId: string;
}

export interface Review{
    text:string;
    timeUploaded: string;
    user: ReviewUser;
}