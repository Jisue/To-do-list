import {Request, Response, Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import axios from 'axios';
import request from 'request';


const connection = new DB().connection;

const api = new Api().api;

export class trashRoutes {   

    public routes(router:Router): void {  
               
        router.route('/trash').get((req: Request, res: Response) => {

            const getTrashRequest = async () => {
                try {
                    const response = await axios.get(api('/trashs'));
                    res.render('trash', {
                        list: response.data[0]
                    });
                } catch (err) {
                    // Handle Error Here
                    console.error(err);
                }
            };
            getTrashRequest();
        })

        router.route('/trash').post((req: Request, res: Response) => {

            let restore_index:JSON = req.body.restore_index;

            if(restore_index !== undefined)
            {
                const restoreTrashRequest = async () => {
                    try {
                        const response1 = await axios.put(api('/trashs/'+restore_index));
                        const response2 = await axios.get(api('/trashs'));
                        res.render('trash', {
                            list: response2.data[0]
                        });
                    } catch (err) {
                        // Handle Error Here
                        console.error(err);
                    }
                };
                restoreTrashRequest();
                console.log(restore_index);
                console.log("복원 되었습니다.");
                return;
            }

            let delete_index:JSON = req.body.delete_index;

            if(delete_index !== undefined)
            {
                const deleteTrashRequest = async () => {
                    try {
                        const response1 = await axios.delete(api('/trashs/'+delete_index));
                        const response2 = await axios.get(api('/trashs'));
                        res.render('trash', {
                            list: response2.data[0]
                        });
                    } catch (err) {
                        // Handle Error Here
                        console.error(err);
                    }
                };
                deleteTrashRequest();
                console.log(delete_index);
                console.log("영구삭제 되었습니다.");
                return;
            }
        })
    }
}