declare module '*.png' {
    const imagePath: string;
    export default imagePath;
}

declare module '*.jpg' {
    const imagePath: string;
    export default imagePath;
}

interface Window {
    j: (path: string) => void | undefined;
}
