import {Request, Response, Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class addRoutes {   

    public routes(router:Router): void {          

        //목록 추가
        // router.route('/add').post((req: Request, res: Response) => {

        //     let newDate:Date = new Date();
        //     let time:String = newDate.toJSON().slice(0,10);

        //     let sql1 = `CALL to_do_list.InsertList('${req.body.list_name}','${req.body.list_date}','${req.body.list_memo}')`;

        //     connection.query(sql1,function (err, result, fields) {
        //         if (err) throw err;              
        //     });
        //     console.log("목록 추가됨");
                
        //     console.log(req.body);

        //     let sql2 = `CALL SelectListAll()`;
            
        //     connection.query(sql2, function (err, result) {
        //         if (err) throw err;
        //         //console.log(result);
        //         res.render('list',{
        //             list : result[0],
        //             time : time
        //         });        
        //     });
        // })

        router.route('/add').post((reqs: Request, ress: Response) => {  
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);  

            request(api('/todos'), {
                method: 'POST',
                json : true,
                qs: {
                    list_name : reqs.body.list_name,
                    list_date : reqs.body.list_date,
                    list_memo : reqs.body.list_memo
                }
            }, (error, res, body) => {
                for(let i:number = 0; i < body[0].length;i++){
                    if(body[0][i].list_dday < time && body[0][i].list_status === 'Doing'){

                        request(api('/todos/'+body[0][i].list_index+'/failed'), {method: 'PUT', json: true}, (error, res, body) => {
                            if (error) throw error;
                        });
                    }
                }
                ress.render('list',{
                    list : body[0],
                    time : time,
                }); 
            });
        })
    }
}