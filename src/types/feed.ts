export interface FeedCategoryType { 
    name: string;
    checked: boolean;
    icon: string;
}

export interface NotificationType {
    id: string;
    url: string;
    text: string;
    sent: boolean;
}

export enum CONTENT_BLOCK_TYPE {
    QUESTION,
    ANSER,
    COMMENT
}

export enum QUESTION_TYPE {
    NEWEST,
    HOT,
    UNANSWERED,
    ANSWERASKED
}
