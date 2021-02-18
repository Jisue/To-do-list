import {Request, Response, Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import axios from 'axios';


const connection = new DB().connection;

const api = new Api().api;

export class selectRoutes {  

    public routes(router:Router): void {      

        router.route('/select').get((req: Request, res: Response) => {  
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);  

            const indexRequest = async () => {
                try {
                    const response1 = await axios.get(api('/todos'));
                    res.render('select',{
                        list : response1.data[0],
                        time : time,
                    });
                } catch (err) {
                    // Handle Error Here
                    console.error(err);
                }
            };
            indexRequest();
        })
    }
}