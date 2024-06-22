export interface UserTypeScore {
    name: string;
    score: number;
}

export type UserScore = UserTypeScore[];

export interface UserDataBase {
    _id: string;
    profile_image: string;
    username: string;
    first_name: string;
    last_name: string;
}

export interface UserData extends UserDataBase{
    isAuthenticated: boolean;
    banner_image: string;
    is_verified: boolean;
    created_at: string;
    bio: string;
    score: UserScore;
    chosen_category: string[];
    email: string | null;
}