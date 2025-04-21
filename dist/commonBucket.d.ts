import { S3Manager } from './manager';
import { S3Config, UploadFileInput, S3Bucket } from './types';
export declare class CommonBucket extends S3Manager implements S3Bucket {
    protected readonly config: S3Config;
    constructor(config: S3Config);
    listFiles(): Promise<string[] | void>;
    getFile({ name, project }: {
        name: string;
        project?: string;
    }): Promise<string | void>;
    uploadFile({ file, name, type, project }: UploadFileInput): Promise<string | void>;
    deleteFile({ name, project }: {
        name: string;
        project?: string;
    }): Promise<void>;
}
