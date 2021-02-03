import {Request, Response} from 'express';
import {DB} from '../config/db';


const connection = new DB().connection;

export class listRoutes {   

    public routes(router:any): void {          
        router.route('/').get((req: Request, res: Response) => {     
            
            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                res.render('list',{
                    list : result
                });                
            });
        })

        router.route('/').post((req: Request, res: Response) => {

            connection.query(`INSERT INTO user_list(list_name, list_dday, list_memo) 
            VALUES('${req.body.list_name}','${req.body.list_date}','${req.body.list_memo}')`
            , function (err, result, fields) {
                if (err) throw err;              
            });
            
            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result
                });        
            });
        })
    }
}