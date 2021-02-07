import {Request, Response} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class trashRoutes {   

    public routes(router:any): void {          
        router.route('/trash').get((req: Request, res: Response) => {
            
            connection.query("SELECT * FROM user_list WHERE list_on = 0", function (err, result) {
                if (err) throw err;
                res.render('trash',{
                    list : result
                });        
            });
        })
        router.route('/trash').post((req: Request, res: Response) => {

            let delete_index:JSON = req.body.delete_index;
            console.log(delete_index);

            if(delete_index !== undefined)
            {
                connection.query(`
                    DELETE FROM user_list
                    WHERE list_index = '${delete_index}';`
                , function (err, result, fields) {
                    if (err) throw err;              
                });
                console.log("영구삭제 되었습니다.");

            }

            let rollback_index:JSON = req.body.rollback_index;
            console.log(rollback_index);
            
            if(rollback_index !== undefined)
            {
                connection.query(`
                    UPDATE user_list
                    SET list_on = 1
                    WHERE list_index = '${rollback_index}';`
                , function (err, result, fields) {
                    if (err) throw err;              
                });
                console.log("복원 되었습니다.");

            }
            
            connection.query("SELECT * FROM user_list", function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('trash',{
                    list : result
                });        
            });
        })
    }
}