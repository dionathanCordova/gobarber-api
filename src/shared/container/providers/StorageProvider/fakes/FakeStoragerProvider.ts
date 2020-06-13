import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    public async savefile(file: string): Promise<string> {
        this.storage.push(file);
        return file;
    }

    public async deleteFile(file: string): Promise<string> {
        const fileIndex = this.storage.findIndex(
            storagefile => storagefile === file,
        );

        this.storage.splice(fileIndex, 1);

        return file;
    }
}
