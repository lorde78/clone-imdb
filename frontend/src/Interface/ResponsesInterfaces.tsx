export type StatusType = 'error' | 'success';

export interface LoginResponseInterface {
    status: StatusType,
    message?: string,
    token?: string,
    username?: string
}

export interface MoviePostResponseInterface {
    status: StatusType,
    message: string
}

export interface CommentPostResponseInterface {
    status: StatusType,
    message: string
}

export interface MovieInterface {
    id?: number,
    date: string,
    title: string,
    content: string,
    author: string
}

export interface CommentInterface {
    id?: number,
    content: string,
    author: string
}
