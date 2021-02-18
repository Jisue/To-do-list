import {Request, Response,Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import axios from 'axios';

const connection = new DB().connection;

const api = new Api().api;

export class completeRoutes {   

    public routes(router:Router): void {          

        router.route('/complete').post((req: Request, res: Response) => {     
            
            const editRequest = async () => {
                try {
                    const response = await axios({
                        method: 'put',
                        url: api('/todos/'+req.body.list_index),
                        params: {
                        status : 'Edit',
                        list_name : req.body.list_name,
                        list_date : req.body.list_date,
                        list_memo : req.body.list_memo,
                        list_color : req.body.list_color
                     },
                      })
                    //console.log(response.data);
                    res.render('complete');
                } catch (err) {
                    // Handle Error Here
                    console.error(err);
                }
            };
            editRequest();
        })

    }
}