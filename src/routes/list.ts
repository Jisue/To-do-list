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

            request(api('/todos'), {method: 'GET', json: true}, (error: Error, response, body) => {
                for(let i:number = 0; i < body[0].length;i++){
                    if(body[0][i].list_dday < time && body[0][i].list_status === 'Doing'){
                        request(api('/todos/'+body[0][i].list_index), {
                            method: 'PUT', 
                            json: true,
                            qs: {
                                list_index : body[0][i].list_index,
                                status : 'Failed'
                            }
                        }, (error, response, body) => {
                            if (error) throw error;
                        });
                    }
                }
                res.render('list',{
                    list : body[0],
                    time : time,
                    list_color1: '#f88787',
                    list_color2: '#9bbdfd',
                    list_color3: '#a8ffe2',
                }); 
            });
        })
    }
}