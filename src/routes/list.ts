import {Request, Response, Router} from 'express';
import {DB} from '../config/db';

const connection = new DB().connection;

export class listRoutes {   

    public routes(router:Router): void {          
        router.route('/').get((req: Request, res: Response) => {     
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);
            //console.log(time);      
            
            let sql1 = `CALL SelectListAll()`;
            
            connection.query(sql1, function (err, result) {
                if (err) throw err;

                for(let i:number = 0; i < result[0].length;i++){
                    if(result[0][i].list_dday < time && result[0][i].list_status === 'Doing'){

                        let sql2 = `CALL UpdateStatusFailed(${result[0][i].list_index});`;
                        connection.query(sql2,function (err, result, fields) {
                            if (err) throw err;              
                        });
                    }
                }

                res.render('list',{
                    list : result[0],
                    time : time,
                });             

            });   
        })
    }
}