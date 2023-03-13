export * from '@/services/crud.service'
import {AuthService} from "@services/auth.service";
import {UserService} from "@services/CRUD/users.service";

const authService = new AuthService();
const userService = new UserService();

export {
    authService,
    userService
}
