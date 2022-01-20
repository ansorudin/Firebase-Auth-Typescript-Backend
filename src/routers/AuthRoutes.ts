import BaseRoutes from './BaseRouter';
// Controller
import AuthController from '../controllers/AuthController';

class AuthRoutes extends BaseRoutes {

    public routes():void {
        this.router.post('/register', AuthController.register);
        this.router.post('/login', AuthController.login);        
        this.router.post('/verifyToken', AuthController.verifyToken);        
        this.router.post('/createSession', AuthController.createSessionCookie);        
        this.router.post('/byUid', AuthController.getByUid);        
    }
}

export default new AuthRoutes().router 