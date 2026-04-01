const multer = require('multer');
const path   = require('path');

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

/**
 * Factory: creates a multer instance scoped to a sub-folder
 * @param {string} subfolder  e.g. 'participants' | 'exhibitors'
 * @param {number} maxMB      file size limit in MB
 */
const createUploader = (subfolder, maxMB = 5) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) =>
        cb(null, path.join(__dirname, '../../uploads', subfolder)),
      filename: (req, file, cb) =>
        cb(null, `${Date.now()}-${file.fieldname}-${file.originalname.replace(/\s+/g, '_')}`),
    }),
    limits: { fileSize: maxMB * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!ALLOWED_TYPES.includes(file.mimetype))
        return cb(new Error(`Invalid file type: ${file.mimetype}`));
      cb(null, true);
    },
  });

module.exports = { createUploader };
