import {Request, Response,Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;
export class editRoutes {   

    public routes(router:Router): void {          

        //목록 수정
        router.route('/edit').post((req: Request, res: Response) => {
            
            let edit_index:JSON = req.body.edit_index;
            console.log(edit_index);

            request(api('/todos/'+edit_index), {method: 'GET', json: true}, (error:Error, response, body) => {
                if (error) throw error;
                let time:String = body[0][0].list_dday;
                res.render('edit',{
                    list : body[0],
                    time : time
                }); 
            });
        })
    }
}