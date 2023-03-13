import {IRoute} from '@/interfaces';
import {BaseRouter} from "@routes/base.route";
import {uploadSingleImage, uploadMultipleImage} from "@/middlewares";
import {imageController} from "@/controllers";

export class ImageRoute extends BaseRouter<typeof imageController> implements IRoute {
    public path = '/image';

    constructor() {
        super(imageController);
        this.customRouting();
    }

    private customRouting() {
        this.router.get(`${this.path}/get/:filename`, this.controller.getImage)
        this.router.post(`${this.path}/single`, uploadSingleImage, this.controller.uploadSingleImage);
        this.router.post(`${this.path}/multiple`, uploadMultipleImage, this.controller.uploadMultipleImages);
    }
}
