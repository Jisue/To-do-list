import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class editRoutes {   

    public routes(router:any): void {          

        //목록 수정
        router.route('/edit').post((req: Request, res: Response) => {
            
            let edit_name:JSON = req.body.edit_name;
            console.log(edit_name);
            
            connection.query(`SELECT * FROM user_list WHERE list_name = '${req.body.edit_name}'`, function (err, result) {
                if (err) throw err;
                console.log(result);
                let time:String = result[0].list_dday;
                res.render('edit',{
                    list : result,
                    time : time
                });        
            });
        })
    }
}