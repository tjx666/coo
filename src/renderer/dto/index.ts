export interface CommonResponse<T> {
    code: number;
    msg: string;
    data: T;
}
