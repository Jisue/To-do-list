import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class deleteRoutes {   

    public routes(router:any): void {          
        router.route('/delete').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            let delete_name:JSON = req.body.delete_name;
            console.log(delete_name);
            
            connection.query(`
                UPDATE user_list
                SET list_on = 0
                WHERE list_name = '${delete_name}';`
            , function (err, result, fields) {
                if (err) throw err;              
            });
            console.log("목록 삭제됨");
            
            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result,
                    time : time
                });        
            });
        })
    }
}