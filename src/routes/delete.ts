import { Request, response, Response, Router } from 'express';
import { DB } from '../config/db';
import { Api } from '../api/api';
import axios from 'axios';


const connection = new DB().connection;

const api = new Api().api;


export class deleteRoutes {

    public routes(router: Router): void {

        router.route('/delete').post((req: Request, res: Response) => {

            let newDate: Date = new Date();
            let time: String = newDate.toJSON().slice(0, 10);

            let delete_index: JSON = req.body.delete_index;
            console.log(delete_index);

            const deleteRequest = async () => {
                try {
                    const response1 = await axios.delete(api('/todos/' + delete_index));
                    const response2 = await axios.get(api('/todos'));
                    //console.log(response2.data);
                    res.render('list', {
                        list: response2.data[0],
                        time: time,
                    });
                } catch (err) {
                    // Handle Error Here
                    console.error(err);
                }
            };
            deleteRequest();
            
        })
    }
}