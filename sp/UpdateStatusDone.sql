-- 완료 처리
-- CALL to_do_list.UpdateStatusDone(0);

DROP PROCEDURE IF EXISTS to_do_list.UpdateStatusDone;

DELIMITER //
CREATE PROCEDURE to_do_list.UpdateStatusDone(
	IN _list_index INT
)
BEGIN
	UPDATE user_list
    SET list_status = 'Done'
    WHERE list_index = _list_index;
END //
DELIMITER ;

