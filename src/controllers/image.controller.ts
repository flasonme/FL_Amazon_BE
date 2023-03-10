import {BaseController} from "@controllers/base.controller";
import {Request, Response} from "express";
import multer from "multer";
import fs from "fs";
import {execFile} from 'child_process'
import sharp from 'sharp';
import probe from 'probe-image-size';
import {FILE_IMAGE_PATH, ImageType} from "@/common/constants";
import {AppException} from "@/common/exceptions";


export class ImageController extends BaseController {
    constructor() {
        super();
    }

    private IMAGE_URL = "http://localhost:1511/images/get/";

    public getExtension(filename: string): string {
        const parts = filename.split(".");
        return parts[parts.length - 1];
    }

    public isImage(filename: string): boolean {
        const extension: string = this.getExtension(filename);
        const imageTypeValues: string[] = Object.values(ImageType);
        return imageTypeValues.includes(extension);
    }

    public async uploadSingleImage(req: Request, res: Response) {
        const {path, mimetype} = req.file;
        let filename = req.file.filename
        if (!this.isImage(filename)) {
            fs.unlinkSync(path);
            throw new AppException(400, "File is not an image");
        }

        const fileUrl = this.IMAGE_URL
        const getTypeImage = mimetype.split("/")[1];
        filename = 'resized-' + filename;
        const imageSize = req.params.size ? parseInt(req.params.size) : null;

        if (getTypeImage == ImageType.GIF) {
            await this.resizeGIF(req.file.filename, path);
        } else {
            await this.resizedImage(req.file.filename, path, imageSize);
        }

        const url = fileUrl + filename;
        if (req.user) {

        }
    }

    public async uploadMultipleImages(req: Request, res: Response) {
  const files = Array.isArray(req.files) ? req.files : null;

  if (!files.length) {
    // Handle error for no files uploaded
    return res.status(400).send("No files were uploaded");
  }

  const { mimetype } = files[0];
  const fileType = mimetype.split("/")[0];

  if (fileType !== "image") {
    // Handle error for invalid file type
    return res.status(400).send("Uploaded file is not an image");
  }

  const fileUrl = this.IMAGE_URL;
  const imageSize = req.params.size ? parseInt(req.params.size) : null;
  const resizedFiles = [];

  for (const file of files) {
    const { path } = file;
    let { filename } = file;

    if (imageSize) {
      filename = `resized-${imageSize}-${filename}`;
    } else {
      filename = `resized-${filename}`;
    }

    if (mimetype === ImageType.GIF) {
      await this.resizeGIF(filename, path);
    } else {
      await this.resizedImage(filename, path, imageSize);
    }

    const url = `${fileUrl}${filename}`;
    resizedFiles.push(url);
  }

  if (req.user) {
    // Handle authenticated user logic
  }

  res.send(resizedFiles);
}



    public async resizeGIF(filename: string, originalFilePath: string): Promise<void> {
        const outputFilePath = `image/resized-${filename}`;
        const gifsicle = 'gifsicle'; // assuming it's already installed and available on the system

        await new Promise<void>((resolve, reject) => {
            execFile(
                gifsicle,
                ['--resize-fit-width', '300', '-o', outputFilePath, originalFilePath],
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                }
            );
        });
    }

    public async resizedImage(originalFilePath: string, newFilePath: string, maxSize: number): Promise<void> {
        const inputStream = fs.createReadStream(originalFilePath);
        const imageInfo = await probe(inputStream);

        let newWidth = maxSize;
        let newHeight = maxSize;
        if (imageInfo.width > imageInfo.height) {
            if (imageInfo.width < newWidth) {
                newWidth = imageInfo.width;
            }
            newHeight = Math.round((newWidth * imageInfo.height) / imageInfo.width);
        } else {
            if (imageInfo.height < newHeight) {
                newHeight = imageInfo.width;
            }
            newWidth = Math.round((newHeight * imageInfo.width) / imageInfo.height);
        }

        await sharp(originalFilePath)
            .resize(newWidth, newHeight)
            .toFile(newFilePath);

        inputStream.destroy();
    }
}
