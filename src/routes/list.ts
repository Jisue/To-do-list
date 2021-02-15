import {Request, Response, Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class listRoutes {  

    public routes(router:Router): void {      

        router.route('/').get((req: Request, res: Response) => {  
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);  

            request(api('/todos'), {method: 'GET', json: true}, (body) => {
                for(let i:number = 0; i < body[0].length;i++){
                    if(body[0][i].list_dday < time && body[0][i].list_status === 'Doing'){

                        request(api('/todos/'+body[0][i].list_index+'/failed'), {method: 'PUT', json: true}, (error, res, body) => {
                            if (error) throw error;
                        });
                    }
                }
                res.render('list',{
                    list : body[0],
                    time : time,
                }); 
            });
        })
    }
}