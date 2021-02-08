-- 완료 실패
-- CALL to_do_list.UpdateStatusFailed();

DROP PROCEDURE IF EXISTS to_do_list.UpdateStatusFailed;

DELIMITER //
CREATE PROCEDURE to_do_list.UpdateStatusFailed(
	IN _list_index INT
)
BEGIN
	UPDATE user_list
    SET list_status = 'Failed'
    WHERE list_index = _list_index;
END //
DELIMITER ;

