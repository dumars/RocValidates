"use strict";
var RocValidator  = RocValidator || {};

(function() {
    var locate = "ABCDEFGHJKLMNPQRSTUVXYWZIO";

    /**
     * 驗證身份證字號
     * @param 身份證字號
     * @returns {boolean}
     */
    function validatePersonId(personId) {
        personId = personId.replace(/\s+/g, "").toUpperCase();

        if (/^[A-Z][1-2][0-9]{8}$/.test(personId)) {
            var word = (locate.indexOf(personId.charAt(0)) + 10).toString() + personId.substr(1, 9);
            return (getCheckSum(word) % 10 === 0);
        }
        return false;
    }

    /**
     * 驗證居留證號
     * @param 居留證號
     * @returns {boolean}
     */
    function validateResidenceId(residenceId) {
        residenceId = residenceId.replace(/\s+/g, "").toUpperCase();

        if (/^[A-Z]{2}[0-9]{8}$/.test(residenceId)) {
            var word = (locate.indexOf(residenceId.charAt(0)) + 10).toString() + (locate.indexOf(residenceId.charAt(1)) + 10).toString().charAt(1) + residenceId.substr(2, 8);
            return (getCheckSum(word) % 10 === 0);
        }
        return false;
    }

    /**
     * 計算驗證數值
     * @param 完成英文字母對應後的數字字串
     * @returns {Number}
     */
    function getCheckSum(word) {
        var checksum = parseInt(word.charAt(0));
        for (var i = 1; i < 10; i++) {
            checksum += parseInt(word.charAt(i) * (10 - i));
        }
        checksum += parseInt(word.charAt(10));

        return checksum;
    }

    RocValidator.validatePersonId = validatePersonId;
    RocValidator.validateResidenceId = validateResidenceId;
})();
