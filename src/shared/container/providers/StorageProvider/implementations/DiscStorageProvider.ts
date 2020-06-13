import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
    public async savefile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, 'uploads', file),
        );
        return file;
    }

    public async deleteFile(file: string): Promise<string> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch (err) {
            return err;
        }

        await fs.promises.unlink(filePath);
        return filePath;
    }
}
