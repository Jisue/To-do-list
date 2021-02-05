import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class addRoutes {   

    public routes(router:any): void {          

        //목록 추가
        router.route('/add').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            connection.query(`INSERT INTO user_list(list_name, list_dday, list_memo) 
            VALUES('${req.body.list_name}','${req.body.list_date}','${req.body.list_memo}')`
            , function (err, result, fields) {
                if (err) throw err;              
            });
            console.log("목록 추가됨");
                
            console.log(req.body);
            
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