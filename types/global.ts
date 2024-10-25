export interface UploadedFile {
    id: string;
    file: File;
    preview: string;
    progress: number;
    uploaded: boolean;
}

export interface ImagesUpload {
    order: number;
    image: string;
}
