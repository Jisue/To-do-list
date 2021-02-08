-- 인덱스 1 조회
-- CALL to_do_list.SelectListAll(1);

DROP PROCEDURE IF EXISTS to_do_list.SelectList;

DELIMITER //
CREATE PROCEDURE to_do_list.SelectList(
    IN _list_index INT
)
BEGIN
	SELECT * FROM user_list
    WHERE list_index = _list_index;
END //
DELIMITER ;