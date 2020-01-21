interface Window {
    j: (path: string) => void | undefined;
}

interface CommonResponse<T> {
    code: number;
    msg: string;
    data: T;
}
