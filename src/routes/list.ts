import {Request, Response, NextFunction} from 'express';
import {DB} from '../config/db';


const connection = new DB().connection;

export class listRoutes {       
    public routes(router:any): void {          
        router.route('/list').get((request: Request, response: Response,next: NextFunction) => {     
            
            connection.query("SELECT * FROM user_list", function (err, result, fields) {
                if (err) throw err;
                response.render('list',{
                    list : result
                });                
            });
        })
    }
}