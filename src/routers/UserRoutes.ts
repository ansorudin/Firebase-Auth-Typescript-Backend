import BaseRoutes from './BaseRouter';
import {auth} from '../middlewares/AuthMiddleware'
// Controller
import UserController from '../controllers/UserController';

class UserRoutes extends BaseRoutes {

    public routes():void {
       
    }
}

export default new UserRoutes().router