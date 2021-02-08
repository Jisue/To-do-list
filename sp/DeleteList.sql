-- 영구 삭제
-- CALL to_do_list.DeleteList(0);

DROP PROCEDURE IF EXISTS to_do_list.DeleteList;

DELIMITER //
CREATE PROCEDURE to_do_list.DeleteList(
	IN _list_index INT
)
BEGIN
    DELETE FROM user_list
    WHERE list_index = _list_index;
END //
DELIMITER ;