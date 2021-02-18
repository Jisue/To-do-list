import { Request, Response, Router } from 'express';
import { DB } from '../config/db';
import { Api } from '../api/api';
import axios from 'axios';


const connection = new DB().connection;

const api = new Api().api;

export class addRoutes {

    public routes(router: Router): void {

        router.route('/add').post((req: Request, res: Response) => {

            let newDate: Date = new Date();
            let time: String = newDate.toJSON().slice(0, 10);

            const addRequest = async () => {
                try {
                    const response1 = await axios({
                        method: 'post',
                        url: api('/todos'),
                        params: {
                            list_name: req.body.list_name,
                            list_date: req.body.list_date,
                            list_memo: req.body.list_memo,
                            list_color: req.body.list_color
                     },
                    })
                    const response2 = await axios.get(api('/todos'));
                    //console.log(response.data);
                    res.render('list', {
                        list: response2.data[0],
                        time: time,
                    });
                } catch (err) {
                    // Handle Error Here
                    console.error(err);
                }
            };
            addRequest();
        })
    }
}