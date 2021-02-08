-- 휴지통 목록 조회
-- CALL to_do_list.SelectTrash();

DROP PROCEDURE IF EXISTS to_do_list.SelectTrash;

DELIMITER //
CREATE PROCEDURE to_do_list.SelectTrash()
BEGIN
	SELECT * FROM user_list
    WHERE list_on = 0;
END //
DELIMITER ;