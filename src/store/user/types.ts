export interface IinitialState {
    loading: boolean,
    data: string[],
    error: string
}

export interface IUserListApiParams {
    skip: any, 
    limit: any, 
    key?: string, 
    value?: string
}