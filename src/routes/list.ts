import {Request, Response, Router} from 'express';
import {DB} from '../config/db';
import {Api} from '../api/api';
import axios from 'axios';


const connection = new DB().connection;

const api = new Api().api;

export class listRoutes {  

    public routes(router:Router): void {      

        router.route('/').get((req: Request, res: Response) => {  
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);  

            const indexRequest = async () => {
                try {
                    const response1 = await axios.get(api('/todos'));
                    for(let i:number = 0; i < response1.data[0].length;i++){
                        if(response1.data[0][i].list_dday < time && response1.data[0][i].list_status === 'Doing'){
                            const response2 = await axios({
                                method: 'put',
                                url: api('/todos/'+response1.data[0][i].list_index),
                                params: {
                                    list_index : response1.data[0][i].list_index,
                                    status : 'Failed'
                                }
                            })
                        }
                    }
                    const response3 = await axios.get(api('/todos'));
                    res.render('list',{
                        list : response3.data[0],
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