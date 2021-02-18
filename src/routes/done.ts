import { Request, Response, Router } from 'express';
import { DB } from '../config/db';
import { Api } from '../api/api';
import axios from 'axios';

import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class doneRoutes {

    public routes(router: Router): void {

        //목록 완료
        router.route('/done').post((req: Request, res: Response) => {

            let newDate: Date = new Date();
            let time: String = newDate.toJSON().slice(0, 10);

            let done_index: JSON = req.body.done_index;

            const doneRequest = async () => {
                try {
                    const response1 = await axios({
                        method: 'put',
                        url: api('/todos/' + done_index),
                        params: {
                            status: 'Done',
                            list_index: req.body.done_index
                        },
                    })
                    const response2 = await axios.get(api('/todos'));
                    res.render('list', {
                        list: response2.data[0],
                        time: time,
                    });
                } catch (err) {
                    // Handle Error Here
                    console.error(err);
                }
            };
            doneRequest();
        })
    }
}