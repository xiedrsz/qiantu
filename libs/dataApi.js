;
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        window.dataApi = factory();
    }
})(function () {
    // 今天
    var today = new Date();

    /**
     * format 格式化日期
     * @Param formatStr String 格式 [YYYY,MM,DD,hh,mm,ss]
     * @Param date Date 日期 [可选，默认今天]
     */
    function format(formatStr, date) {
        var date = date || today,
            YYYY = date.getFullYear(),
            MM = date.getMonth() + 1,
            DD = date.getDate(),
            hh = date.getHours(),
            mm = date.getMinutes(),
            ss = date.getSeconds(),
            result = formatStr;

        result = result.replace("YYYY", YYYY)
            .replace("MM", MM)
            .replace("DD", DD)
            .replace("hh", hh)
            .replace("mm", mm)
            .replace("ss", ss);

        return result;
    }

    return {
        format: format,
    }

});