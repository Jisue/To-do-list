import {Request, Response,Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;


export class deleteRoutes {   

    public routes(router:Router): void {   
        
        router.route('/delete').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            let delete_index:JSON = req.body.delete_index;
            console.log(delete_index);

            request(api('/todos/'+delete_index), {method: 'DELETE', json: true}, (error, response, body) => {
                if (error) throw error;
                console.log("휴지통으로 이동됨");
            });
            request(api('/todos'), {method: 'GET', json: true}, (error, response, body) => {
                if (error) throw error;
                res.render('list',{
                    list : body[0],
                    time : time,
                }); 
            });
        })
    }
}