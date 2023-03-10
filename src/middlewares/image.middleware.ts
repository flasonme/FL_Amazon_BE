import multer from 'multer';
import {NextFunction, Request} from 'express';
import {FILE_IMAGE_PATH, ImageType} from "@/common/constants";

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, callback: any) {
        callback(null, FILE_IMAGE_PATH);
    },
    filename: function (req, file, callback) {
        const getTypeImage = file.mimetype.split("/")[1];
        if (getTypeImage === "gif") {
            callback(null, file.fieldname + "-" + Date.now() + ImageType.GIF);
        } else {
            callback(null, file.fieldname + "-" + Date.now() + ImageType.PNG);
        }
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: Function) => {
    console.log("file.mimetype", file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        callback(null, true);
    } else {
        callback(new Error('Only .png, .gif and .jpeg format allowed!'), false);
    }
};

const uploadSingleImage = multer({
    storage: storage,
    fileFilter: fileFilter,
}).single('image');

const uploadMultipleImage = multer({
    storage: storage,
    fileFilter: fileFilter,
}).array('images');

export {uploadSingleImage, uploadMultipleImage};
