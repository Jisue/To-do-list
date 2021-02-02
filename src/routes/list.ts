import {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';

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

//.env 환경변수 로드
dotenv.config();