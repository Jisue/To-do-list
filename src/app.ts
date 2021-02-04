import express from 'express'
import path from 'path'
import {listRoutes} from './routes/list';
import {editRoutes} from './routes/edit';
import dotenv from 'dotenv';


class App{
    public app : express.Application;

    constructor(){
        this.app = express();
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const listroute : listRoutes = new listRoutes();
listroute.routes(app);

const editroute : editRoutes = new editRoutes();
editroute.routes(app);


app.listen(app.get('port'),()=>{
  console.log(app.get('port'),"번 포트에서 대기중입니다.");
})