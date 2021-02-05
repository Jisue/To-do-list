import express from 'express'
import path from 'path'
import {listRoutes} from './routes/list';
import {editRoutes} from './routes/edit';
import {completeRoutes} from './routes/complete';
import {addRoutes} from './routes/add';
import {deleteRoutes} from './routes/delete';
import {doneRoutes} from './routes/done';
import dotenv from 'dotenv';


class App{

  public app : express.Application;
  private listroute : listRoutes = new listRoutes();
  private editroute : editRoutes = new editRoutes();
  private completeroutes : completeRoutes = new completeRoutes();
  private addroute : addRoutes = new addRoutes();
  private deleteroute : deleteRoutes = new deleteRoutes();
  private doneroutes : doneRoutes = new doneRoutes();


  constructor(){
    this.app = express();
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.listroute.routes(this.app); 
    this.editroute.routes(this.app); 
    this.completeroutes.routes(this.app); 
    this.addroute.routes(this.app); 
    this.deleteroute.routes(this.app); 
    this.doneroutes.routes(this.app); 
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

// const listroute : listRoutes = new listRoutes();
// listroute.routes(app);

app.listen(app.get('port'),()=>{
  console.log(app.get('port'),"번 포트에서 대기중입니다.");
})