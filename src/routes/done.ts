import {Request, Response,Router} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class doneRoutes {   

    public routes(router:Router): void {          
        //목록 완료
        router.route('/done').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            let done_index:JSON = req.body.done_index;
            console.log(done_index);

            let sql1 = `CALL UpdateStatusDone('${done_index}')`;

            connection.query(sql1,function (err, result, fields) {
                if (err) throw err;              
            });

            console.log("완료 처리됨");

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

        // router.route('/done').post((reqs: Request, ress: Response) => {  
            
        //     let newDate:Date = new Date();
        //     let time:String = newDate.toJSON().slice(0,10);  

        //     request(api('/todos'), {
        //         method: 'POST',
        //         json : true,
        //         qs: {
        //             list_name : reqs.body.list_name,
        //             list_date : reqs.body.list_date,
        //             list_memo : reqs.body.list_memo
        //         }}, (error, res, body) => {
        //         ress.render('list',{
        //             list : body[0],
        //             time : time,
        //         }); 
        //     });
        // })

    }
}