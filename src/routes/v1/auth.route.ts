import {authController} from '@/controllers';
import {UserDto} from '@/common/dtos';
import {IRoute} from '@/interfaces';
import {authMiddleware} from '@/middlewares';
import {validationMiddleware} from '@/middlewares';
import {CRUDRouter} from "@routes/crud.route";

export class AuthRoute extends CRUDRouter<typeof authController> implements IRoute {
    public path = '/auth';

    constructor() {
        super(authController);
        this.baseRouting();
    }

    public baseRouting() {
        this.router.post(`${this.path}/signup`, validationMiddleware(UserDto, 'body', true), this.controller.signUp);
        this.router.post(`${this.path}/login`, validationMiddleware(UserDto, 'body', true), this.controller.logIn);
        this.router.post(`${this.path}/logout`, authMiddleware, this.controller.logOut);
    }
}
