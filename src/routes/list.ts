import {Request, Response, NextFunction} from 'express';
import {DB} from '../config/db';

export class Routes {       
    public routes(router:any): void {          
        router.route('/').get((request: Request, response: Response,next: NextFunction) => {            
            // res.status(200).send({
            //     message: 'GET request successfulll!!!!'
            // })
            response.send('hello');
        })               
    }
}

const connection = new DB().connection;

connection.query("SELECT * FROM user_list", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});