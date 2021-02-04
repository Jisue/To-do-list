import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class listRoutes {   

    public routes(router:any): void {          
        router.route('/').get((req: Request, res: Response) => {     
            
            let newDate = new Date();
            let time = newDate.toJSON().slice(0,10);
            console.log(time);
            

            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                res.render('list',{
                    list : result,
                    time : time
                });                
            });
        })

        //목록 추가
        router.route('/add').post((req: Request, res: Response) => {

            // if(req.body.list_name === ''){
            //     console.log("이름을 입력하시오");
            // }
            // else
            // {
            //     connection.query(`INSERT INTO user_list(list_name, list_dday, list_memo) 
            //     VALUES('${req.body.list_name}','${req.body.list_date}','${req.body.list_memo}')`
            //     , function (err, result, fields) {
            //         if (err) throw err;              
            //     });
            //     console.log("목록 추가됨");
            // }
                
            console.log(req.body);
            
            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result
                });        
            });
        })

        router.route('/delete').post((req: Request, res: Response) => {

            let delete_name = req.body.delete_name;
            console.log(delete_name);
            
            // connection.query(`
            //     UPDATE user_list
            //     SET list_on = 0
            //     WHERE list_name = '${delete_name}';`
            // , function (err, result, fields) {
            //     if (err) throw err;              
            // });
            
            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result
                });        
            });
        })


        //목록 수정
        router.route('/edit').post((req: Request, res: Response) => {

            // connection.query(`INSERT INTO user_list(list_name, list_dday, list_memo) 
            // VALUES('${req.body.list_name}','${req.body.list_date}','${req.body.list_memo}')`
            // , function (err, result, fields) {
            //     if (err) throw err;              
            // });
            
            console.log(req.body);

            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('list',{
                    list : result
                });        
            });
        })

    }
}