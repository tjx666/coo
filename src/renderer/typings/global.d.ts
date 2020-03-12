declare module '*.png' {
    const imagePath: string;
    export default imagePath;
}

declare module '*.jpg' {
    const imagePath: string;
    export default imagePath;
}

interface Theme {
    primaryColor: string;
}

interface Window {
    j: (path: string) => void | undefined;
    theme: Theme;
}
