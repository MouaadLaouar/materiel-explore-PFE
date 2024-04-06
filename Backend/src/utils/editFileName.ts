import { extname } from 'path';
import cuid = require('cuid');

export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const randomName = cuid();
    callback(null, `${randomName}${fileExtName}`);
  };
