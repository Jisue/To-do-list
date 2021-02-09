import {Request, Response, Router} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class completeRoutes {   

    public routes(router:Router): void {          

        router.route('/complete').post((req: Request, res: Response) => {    

            let sql1 = `CALL to_do_list.UpdateList('${req.body.list_index}','${req.body.list_name}','${req.body.list_date}','${req.body.list_memo}')`;

            connection.query(sql1,function (err, result, fields) {
                if (err) throw err;              
            });
            
            console.log("목록 수정됨");
            res.render('complete');                
        })

    }
}