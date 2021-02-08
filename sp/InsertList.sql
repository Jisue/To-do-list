-- 새로운 할일 추가
-- CALL to_do_list.InsertList('sp1','2021-02-16','sp로 추가됨');

DROP PROCEDURE IF EXISTS to_do_list.InsertList;

DELIMITER //
CREATE PROCEDURE to_do_list.InsertList(
	IN _list_name VARCHAR(45),
    IN _list_dday VARCHAR(45),
    IN _list_memo VARCHAR(450)
)
BEGIN
	INSERT INTO user_list(list_name, list_dday, list_memo) 
	VALUES(_list_name,_list_dday,_list_memo);
END //
DELIMITER ;