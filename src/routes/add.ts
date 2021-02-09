import {Request, Response, Router} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class addRoutes {   

    public routes(router:Router): void {          

        //목록 추가
        router.route('/add').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            let sql1 = `CALL to_do_list.InsertList('${req.body.list_name}','${req.body.list_date}','${req.body.list_memo}')`;

            connection.query(sql1,function (err, result, fields) {
                if (err) throw err;              
            });
            console.log("목록 추가됨");
                
            console.log(req.body);

            let sql2 = `CALL SelectListAll()`;
            
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