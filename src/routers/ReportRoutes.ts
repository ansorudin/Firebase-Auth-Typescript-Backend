import BaseRoutes from './BaseRouter';
// Controller
import ReportController from '../controllers/ReportController';

class ReportRoutes extends BaseRoutes {

    public routes():void {
        this.router.get('/get-data', ReportController.getData);
    }
}

export default new ReportRoutes().router 