export interface IChildTopic{
    id: number;
    name: string;
    url_slug: string;
    priority: number;
}
export interface IParentTopic{
    id: number;
    name: string;
    url_slug: string;
    priority: number;
    image?: string;
    description: string;
    children: IChildTopic[];
}