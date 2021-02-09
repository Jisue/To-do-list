import {Request, Response, Router} from 'express';
import {DB} from '../config/db';



const connection = new DB().connection;

export class trashRoutes {   

    public routes(router:Router): void {  
               
        router.route('/trash').get((req: Request, res: Response) => {
            
            let sql1 = `CALL SelectTrash()`;
            connection.query(sql1, function (err, result) {
                if (err) throw err;
                res.render('trash',{
                    list : result[0]
                });        
            });
        })

        router.route('/trash').post((req: Request, res: Response) => {

            let delete_index:JSON = req.body.delete_index;
            console.log(delete_index);

            if(delete_index !== undefined)
            {
                let sql2 = `CALL DeleteList('${delete_index}')`;
                connection.query(sql2, function (err, result) {
                    if (err) throw err; 
                });
                console.log("영구삭제 되었습니다.");
            }

            let restore_index:JSON = req.body.restore_index;
            console.log(restore_index);
            
            if(restore_index !== undefined)
            {
                let sql3 = `CALL UpdateTrashOn('${restore_index}')`;
                connection.query(sql3, function (err, result) {
                    if (err) throw err; 
                });
                console.log("복원 되었습니다.");

            }
            
            let sql4 = `CALL to_do_list.SelectListAll()`;
            
            connection.query(sql4, function (err, result) {
                if (err) throw err;
                //console.log(result);
                res.render('trash',{
                    list : result[0]
                });        
            });
        })
    }
}