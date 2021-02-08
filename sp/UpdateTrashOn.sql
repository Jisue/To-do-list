-- 휴지통으로 이동
-- CALL to_do_list.UpdateTrashOn();

DROP PROCEDURE IF EXISTS to_do_list.UpdateTrashOn;

DELIMITER //
CREATE PROCEDURE to_do_list.UpdateTrashOn(
	IN _list_index INT
)
BEGIN
	UPDATE user_list
    SET list_on = 1
    WHERE list_index = _list_index;
END //
DELIMITER ;

