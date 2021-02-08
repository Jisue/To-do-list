-- 목록 수정
-- CALL to_do_list.UpdateList();

DROP PROCEDURE IF EXISTS to_do_list.UpdateList;

DELIMITER //
CREATE PROCEDURE to_do_list.UpdateList(
	IN _list_index INT,
	IN _list_name VARCHAR(45),
    IN _list_dday VARCHAR(45),
    IN _list_memo VARCHAR(450)
)
BEGIN
	UPDATE user_list
    SET list_name = _list_name, list_dday =_list_dday, list_memo = _list_memo
	WHERE list_index = _list_index;
END //
DELIMITER ;