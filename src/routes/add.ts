import {Request, Response, Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class addRoutes {   

    public routes(router:Router): void {          

        router.route('/add').post((req: Request, res: Response) => {  
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);  

            request(api('/todos'), {
                method: 'POST',
                json : true,
                qs: {
                    list_name : req.body.list_name,
                    list_date : req.body.list_date,
                    list_memo : req.body.list_memo
                }}, (error, response, body) => {
                    res.render('list',{
                    list : body[0],
                    time : time,
                }); 
            });
        })
    }
}