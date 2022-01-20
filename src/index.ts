import express, {Application, Request, Response} from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { config as dotenv } from 'dotenv'

// Routes
import UserRoutes from './routers/UserRoutes'
import AuthRoutes from './routers/AuthRoutes'
import ReportRoutes from './routers/ReportRoutes'

class App {
    public app: Application;

    constructor(){
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route('/').get((req:Request, res:Response) => {
            res.send('Ini adalah route pertama saya menggunakan TS cuy')
        })
        this.app.use('/api/v1/users', UserRoutes)
        this.app.use('/api/v1/auth', AuthRoutes)
        this.app.use('/api/v1/reporting', ReportRoutes)
    }
}

const PORT: number = 8000
const app = new App().app
app.listen(PORT, () => {
    console.log(`Welcome to belajar API, anda berada di port ${PORT}`)

})