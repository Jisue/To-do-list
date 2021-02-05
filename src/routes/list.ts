import { UV_FS_O_FILEMAP } from 'constants';
import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class listRoutes {   

    public routes(router:any): void {          
        router.route('/').get((req: Request, res: Response) => {     
            
            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);
            //console.log(time);            


            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;

                for(let i:number = 0; i < result.length;i++){
                    if(result[i].list_dday < time){
                        connection.query(`
                            UPDATE user_list
                            SET list_status = 'Failed'
                            WHERE list_name = '${result[i].list_name}';`
                            , function (err, result, fields) {
                                if (err) throw err;              
                        });
                        result[i].list_status = 'Failed';
                    }
                }

                res.render('list',{
                    list : result,
                    time : time
                });             
            });    
        })

        //목록 추가
        router.route('/add').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            if(req.body.list_name === ''){
                console.log("이름을 입력하시오");
            }
            else
            {
                connection.query(`INSERT INTO user_list(list_name, list_dday, list_memo) 
                VALUES('${req.body.list_name}','${req.body.list_date}','${req.body.list_memo}')`
                , function (err, result, fields) {
                    if (err) throw err;              
                });
                console.log("목록 추가됨");
            }
                
            console.log(req.body);
            
            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result,
                    time : time
                });        
            });
        })

        router.route('/delete').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            let delete_name:JSON = req.body.delete_name;
            console.log(delete_name);
            
            connection.query(`
                UPDATE user_list
                SET list_on = 0
                WHERE list_name = '${delete_name}';`
            , function (err, result, fields) {
                if (err) throw err;              
            });
            console.log("목록 삭제됨");
            
            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result,
                    time : time
                });        
            });
        })


        //목록 완료
        router.route('/done').post((req: Request, res: Response) => {

            let newDate:Date = new Date();
            let time:String = newDate.toJSON().slice(0,10);

            let done_name:JSON = req.body.done_name;
            console.log(done_name);

            connection.query(`
            UPDATE user_list
            SET list_status = 'Done'
            WHERE list_name = '${done_name}';`
            , function (err, result, fields) {
                if (err) throw err;              
            });

            console.log("완료 처리됨");

            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result,
                    time : time
                });        
            });
        })

    }
}