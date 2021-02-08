import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class deleteRoutes {   

    public routes(router:any): void {          
        router.route('/delete').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            let delete_index:JSON = req.body.delete_index;
            console.log(delete_index);

            let sql1 = `CALL to_do_list.UpdateTrashOff('${delete_index}')`;

            connection.query(sql1,function (err, result, fields) {
                if (err) throw err;              
            });
            
            console.log("휴지통으로 이동됨");
            
            let sql2 = `CALL to_do_list.SelectListAll()`;
            
            connection.query(sql2, function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result[0],
                    time : time
                });        
            });
        })
    }
}