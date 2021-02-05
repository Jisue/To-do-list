import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class doneRoutes {   

    public routes(router:any): void {          
        //목록 완료
        router.route('/done').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            let done_name:JSON = req.body.done_name;
            console.log(done_name);

            connection.query(`
            UPDATE user_list
            SET list_status = 'Done'
            WHERE list_name = '${done_name}';`
            , function (err, result, fields) {
                if (err) throw err;              
            });

            console.log("완료 처리됨");

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