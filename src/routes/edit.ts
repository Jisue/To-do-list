import {Request, Response,Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import axios from 'axios';

const connection = new DB().connection;

const api = new Api().api;
export class editRoutes {   

    public routes(router:Router): void {          

        //목록 수정
        router.route('/edit').post((req: Request, res: Response) => {
            
            let edit_index:JSON = req.body.edit_index;
            console.log(edit_index);

            const editRequest = async () => {
                try {
                    const response = await axios.get(api('/todos/'+edit_index));
                    let time:String = response.data[0][0].list_dday;
                    res.render('edit', {
                        list: response.data[0],
                        time: time,
                    });
                } catch (err) {
                    // Handle Error Here
                    console.error(err);
                }
            };
            editRequest();
        })
    }
}