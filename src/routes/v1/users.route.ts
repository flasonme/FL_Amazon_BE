import {usersController} from '@/controllers';
import {UserDto} from '@/common/dtos';
import {validationMiddleware} from '@/middlewares';
import {CRUDRouter} from '@routes/crud.route';
import {IRoute} from "@/interfaces";

export class UsersRoute extends CRUDRouter<typeof usersController> implements IRoute {
    public path = '/users';

    constructor() {
        super(usersController);
        this.baseRouting();
    }

    public baseRouting() {
        this.router.get(`${this.path}`, this.controller.findMany);
        this.router.get(`${this.path}/:id`, this.controller.findOne);
        this.router.post(`${this.path}`, validationMiddleware(UserDto, 'body', true), this.controller.create);
        this.router.put(`${this.path}/:id`, validationMiddleware(UserDto, 'body', true), this.controller.update);
        this.router.delete(`${this.path}/:id`, this.controller.delete);
    }
}
