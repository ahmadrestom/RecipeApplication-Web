export interface Chef{
    chefId: string;
    firstName: string;
    lastName: string;
    image_url: string;
    location: string;
    phone_number:string;
    bio: string;
    years_experience: number;
}

export interface UpgradeToChef{
    userId: string;
    location: string;
    bio: string;
    years_experience: number;
    phone_number: string;
}