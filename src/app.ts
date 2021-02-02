/* app.ts */

import express, {Request, Response, NextFunction} from 'express'
import path from 'path'
import {Routes} from './routes/list';
import dotenv from 'dotenv';

class App{
    public app : express.Application;
    public route : Routes = new Routes();

    constructor(){
        this.app = express();
        this.route.routes(this.app);
    }
}

const app = new App().app;

//.env 환경변수 로드
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'),()=>{
  console.log(app.get('port'),"번 포트에서 대기중입니다.");
})