/* app.ts */

import express, {Request, Response, NextFunction} from 'express'
import path from 'path'
import {indexRoutes} from './routes/index';
import {listRoutes} from './routes/list';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


class App{
    public app : express.Application;
    //public indexroute : indexRoutes = new indexRoutes();
    public listroute : listRoutes = new listRoutes();

    constructor(){
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded( {extended : false } ));
        // this.app.use(bodyParser.text());
        this.listroute.routes(this.app);
    }
}

const app = new App().app;

//.env 환경변수 로드
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', app.route);
//app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const listroute : listRoutes = new listRoutes();

// listroute.routes(app);

app.listen(app.get('port'),()=>{
  console.log(app.get('port'),"번 포트에서 대기중입니다.");
})