import {Request, Response, NextFunction} from 'express';

export class indexRoutes {       
    public routes(router:any): void {          
        router.route('/').get((request: Request, response: Response,next: NextFunction) => {            
            response.render('index', { title: 'To-Do-List' });
        })

    }
}