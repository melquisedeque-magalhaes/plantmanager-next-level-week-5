declare module '*.png' {
    const content: any
    export default content
}

declare module '*.jpg' {
    const fileName: any;
    export default fileName;
}

declare module '*.jpeg' {
    const imageName: any;
    export default imageName;
}