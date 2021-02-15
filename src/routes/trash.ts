import {Request, Response, Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class trashRoutes {   

    public routes(router:Router): void {  
               
        router.route('/trash').get((req: Request, res: Response) => {

            request(api('/trashs'), {method: 'GET', json: true}, (error, response, body) => {
                res.render('trash',{
                    list : body[0]
                }); 
            });
        })

        router.route('/trash').post((req: Request, res: Response) => {

            let restore_index:JSON = req.body.restore_index;
            
            if(restore_index !== undefined)
            {
                request(api('/trashs/'+restore_index), {method: 'PUT', json: true}, (error, response, body) => {});
                console.log(restore_index);
                console.log("복원 되었습니다.");

            }

            let delete_index:JSON = req.body.delete_index;

            if(delete_index !== undefined)
            {
                request(api('/trashs/'+delete_index), {method: 'DELETE', json: true}, (error, response, body) => {});
                console.log(delete_index);
                console.log("영구삭제 되었습니다.");
            }

            request(api('/trashs'), {method: 'GET', json: true}, (error, response, body) => {
                res.render('trash',{
                    list : body[0]
                }); 
            });

        })
    }
}