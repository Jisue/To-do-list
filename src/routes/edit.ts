import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class editRoutes {   

    public routes(router:any): void {          

        //목록 수정
        router.route('/edit').post((req: Request, res: Response) => {
            
            let edit_index:JSON = req.body.edit_index;
            console.log(edit_index);

            let sql1 = `CALL SelectList('${edit_index}')`;

            connection.query(sql1,function (err, result) {
                if (err) throw err;   
                console.log(result);
                let time:String = result[0][0].list_dday;
                res.render('edit',{
                    list : result[0],
                    time : time
                });  
            });
        })
    }
}