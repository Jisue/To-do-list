import {Request, Response} from 'express';
import {DB} from '../config/db';

const connection = new DB().connection;

export class listRoutes {   

    public routes(router:any): void {          
        router.route('/').get((req: Request, res: Response) => {     
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);
            //console.log(time);            


            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;

                for(let i:number = 0; i < result.length;i++){
                    if(result[i].list_dday < time){
                        connection.query(`
                            UPDATE user_list
                            SET list_status = 'Failed'
                            WHERE list_name = '${result[i].list_name}';`
                            , function (err, result, fields) {
                                if (err) throw err;              
                        });
                        result[i].list_status = 'Failed';
                    }
                }

                res.render('list',{
                    list : result,
                    time : time
                });             
            });    
        })
    }
}