import { S3Manager } from './manager';
export class CommonBucket extends S3Manager {
    constructor(config) {
        super(config);
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
    }
    async listFiles() {
        try {
            const files = await this.listObjectsS3();
            return files?.map(({ Key }) => Key).filter(Boolean);
        }
        catch (error) {
            console.error('Error in listFiles:', error);
        }
    }
    async getFile({ name, project }) {
        try {
            const key = project ? `${project}/${name}` : name;
            await this.getS3Object(key);
            return key;
        }
        catch (error) {
            console.error('Error in getFile:', error);
        }
    }
    async uploadFile({ file, name, type, project }) {
        try {
            const key = project ? `${project}/${name}` : name;
            await this.uploadObjectS3(file, key, type);
            return key;
        }
        catch (error) {
            console.error('Error in uploadFile:', error);
        }
    }
    async deleteFile({ name, project }) {
        try {
            const key = project ? `${project}/${name}` : name;
            await this.deleteObjectS3(key);
        }
        catch (error) {
            console.error('Error in deleteFile:', error);
        }
    }
}
