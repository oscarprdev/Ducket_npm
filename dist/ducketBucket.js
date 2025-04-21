import { Readable } from 'stream';
export class DucketBucket {
    constructor(config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
        Object.defineProperty(this, "apiEndpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'https://www.ducket.dev/api/ducket'
        });
    }
    async listFiles() {
        try {
            const response = await fetch(`${this.apiEndpoint}/files`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }
            const data = await response.json();
            return data.files;
        }
        catch (error) {
            console.error('Error in listFiles:', error);
        }
    }
    async getFile({ name }) {
        try {
            const response = await fetch(`${this.apiEndpoint}/file/${name}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${this.config.apiKey}` },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch file');
            }
            const data = await response.json();
            return data.fileUrl;
        }
        catch (error) {
            console.error('Error in getFile:', error);
        }
    }
    async uploadFile({ file, name, type, project }) {
        try {
            const formData = new FormData();
            if (typeof file === 'string') {
                formData.append('file', new Blob([file], { type }));
            }
            else if (file instanceof Uint8Array || file instanceof Buffer) {
                formData.append('file', new Blob([file], { type }));
            }
            else if (file instanceof Readable) {
                throw new Error('Streams are not directly supported in FormData. Convert to Buffer first.');
            }
            else {
                throw new Error('Unsupported file type');
            }
            formData.append('name', name);
            formData.append('type', type);
            if (project)
                formData.append('project', project);
            const response = await fetch(`${this.apiEndpoint}/file`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${this.config.apiKey}` },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to upload file');
            }
            const data = await response.json();
            return data.fileUrl;
        }
        catch (error) {
            console.error('Error in uploadFile:', error);
        }
    }
    async deleteFile({ name }) {
        try {
            const response = await fetch(`${this.apiEndpoint}/file/${name}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${this.config.apiKey}` },
            });
            if (!response.ok) {
                throw new Error('Failed to delete file');
            }
        }
        catch (error) {
            console.error('Error in deleteFile:', error);
        }
    }
}
