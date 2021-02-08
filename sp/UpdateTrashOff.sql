-- 리스트 복원
-- CALL to_do_list.UpdateTrashOff(0);

DROP PROCEDURE IF EXISTS to_do_list.UpdateTrashOff;

DELIMITER //
CREATE PROCEDURE to_do_list.UpdateTrashOff(
	IN _list_index INT
)
BEGIN
	UPDATE user_list
    SET list_on = 0
    WHERE list_index = _list_index;
END //
DELIMITER ;

