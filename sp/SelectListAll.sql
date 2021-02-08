-- 전체 목록 조회
-- CALL to_do_list.SelectListAll();

DROP PROCEDURE IF EXISTS to_do_list.SelectListAll;

DELIMITER //
CREATE PROCEDURE to_do_list.SelectListAll()
BEGIN
	SELECT * FROM user_list;
END //
DELIMITER ;