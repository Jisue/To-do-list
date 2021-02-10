import {Request, Response, Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class listRoutes {  

    public routes(router:Router): void {      

        router.route('/').get((reqs: Request, ress: Response) => {  
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);  

            request(api('/todos'), {json: true}, (error, res, body) => {
                for(let i:number = 0; i < body[0].length;i++){
                    // if(body[0][i].list_dday < time && body[0][i].list_status === 'Doing'){

                    //     let sql2 = `CALL UpdateStatusFailed(${body[0][i].list_index});`;
                    //     connection.query(sql2,function (err, result, fields) {
                    //         if (err) throw err;              
                    //     });
                    // }
                }

                console.log(body[0]);
                ress.render('list',{
                    list : body[0],
                    time : time,
                }); 
            });
        })
    }
}