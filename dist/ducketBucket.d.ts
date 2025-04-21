import { DucketConfig, S3Bucket, UploadFileInput } from './types';
export declare class DucketBucket implements S3Bucket {
    protected readonly config: DucketConfig;
    private apiEndpoint;
    constructor(config: DucketConfig);
    listFiles(): Promise<string[] | void>;
    getFile({ name }: {
        name: string;
    }): Promise<string | void>;
    uploadFile({ file, name, type, project }: UploadFileInput): Promise<string | void>;
    deleteFile({ name }: {
        name: string;
    }): Promise<void>;
}
