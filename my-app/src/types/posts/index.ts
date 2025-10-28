export interface IPostCreate{
    title: string;
    body: string;
    image?: File | null;
    video?: File | null;
    video_url?: string;
    topic_id: number;
    user_id: number;
}

export interface IPostItem{
    id: number;
    title: string;
    body: string;
    image?: File | null;
    video?: File | null;
    video_url?: string;
    created_at: Date | null;
    topic_id: number;
    topic_name: string;
}