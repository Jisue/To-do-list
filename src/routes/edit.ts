import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class editRoutes {   

    public routes(router:any): void {          

        //목록 수정
        router.route('/edit').post((req: Request, res: Response) => {
            
            let edit_name = req.body.edit_name;
            console.log(edit_name);

            connection.query(`SELECT * FROM user_list WHERE list_name = '${req.body.edit_name}'`, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.render('edit',{
                    list : result
                });        
            });
        })

        router.route('/complete').post((req: Request, res: Response) => {    
            
            console.log("수정 포스트");
            let edit_name = req.body;
            console.log(edit_name);

            connection.query( ` 
                UPDATE user_list
                SET list_name = '${req.body.list_name}', list_dday = '${req.body.list_date}', list_memo = '${req.body.list_memo}'
                WHERE list_index = '${req.body.list_index}'`
            , function (err, result) {
                if (err) throw err;
     
            });
    
            res.render('complete');                
        })

    }
}