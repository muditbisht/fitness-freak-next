import { UserData } from "./user";

export interface VoteCount {
    up: number;
    down: number;
}

export interface QuestionData {
    _id: string;
    title: string;
    question: string;
    category: string[]
    tags: string[]
    user: UserData;
    answers_count: number;
    comments_count: number;
    posted_at: string;
    vote: VoteCount;
}

export interface AnswerData {
    _id: string;
    title: string;
    answer: string;
    marked: boolean;
    user: UserData;
    comments_count: number;
    posted_at: string;
    vote: VoteCount;
}

export interface CommentData {
    _id: string;
    comment: string
    user: UserData;
    posted_at: string;
    vote: VoteCount;
}