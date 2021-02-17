import {Request, Response,Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import axios from 'axios';

import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class completeRoutes {   

    public routes(router:Router): void {          

        router.route('/complete').post((req: Request, res: Response) => {    

            request(api('/todos/'+req.body.list_index), {
                method: 'PUT',
                json : true,
                qs: {
                    status : 'Edit',
                    list_name : req.body.list_name,
                    list_date : req.body.list_date,
                    list_memo : req.body.list_memo,
                    list_color : req.body.list_color
                }}, (error, response, body) => {
                    console.log("목록 수정됨");
                    res.render('complete');
            });            
        })

    }
}