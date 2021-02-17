import {Request, Response,Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class doneRoutes {   

    public routes(router:Router): void {          

        //목록 완료
        router.route('/done').post((req: Request, res: Response) => {  
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);  

            let done_index:JSON = req.body.done_index;

            request(api('/todos/'+done_index), {method: 'PUT', json: true,
            qs: {
                list_index : req.body.done_index,
                status : 'Done'
            }}, (error, response, body) => {
                if (error) throw error;
                request(api('/todos'), {method: 'GET', json: true}, (error:Error, response, body) => {
                    if (error) throw error;
                    res.render('list',{
                        list : body[0],
                        time : time,
                    }); 
                });
            });
        })
    }
}