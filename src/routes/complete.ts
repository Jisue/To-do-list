import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class completeRoutes {   

    public routes(router:any): void {          

        router.route('/complete').post((req: Request, res: Response) => {    
            
            let edit_name:JSON = req.body;
            console.log(edit_name);

            connection.query( ` 
                UPDATE user_list
                SET list_name = '${req.body.list_name}', list_dday = '${req.body.list_date}', list_memo = '${req.body.list_memo}'
                WHERE list_index = '${req.body.list_index}'`
            , function (err, result) {
                if (err) throw err;
                
            });
            console.log("목록 수정됨");
            res.render('complete');                
        })

    }
}