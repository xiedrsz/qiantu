define([], function () {
    'use strict';
    var analyzer = {};

    // ------------------------------------------------- 获取金额 开始--------------------------------
    /**
     * 查找金额字符串
     * @Param anyStr String 任意字符串 eg: "早餐三十块零五毛"
     * return Array 金额字符串数组 eg：["三十块", "零五毛"]
     */
    function searchMoney(anyStr) {
        return anyStr.match(/[点零一二三四五六七八九0123456789.十百千万]+([元块]|[毛角])?/g);
    }

    /**
     * 将数字字符串转成阿拉伯数字字符串数组
     * @Param str String 汉语数字 eg: 三千零二 3002
     * return Array 阿拉伯数字字符串数组 eg: ["3", "1000", "0", "2"] ["3002"]
     */
    function _convert(str) {
        var arr_be = ["点", "零", "一", "二", "两", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万"];
        var arr_af = [".,", "0,", "1,", "2,", "2", "3,", "4,", "5,", "6,", "7,", "8,", "9,", "10,", "100,", "1000,", "10000,"];
        var result = str;

        for (var i = 0; i < arr_be.length; i++) {
            result = result.replace(new RegExp(arr_be[i], "g"), arr_af[i]);
        }
        result != str && (result = result.slice(0, -1));
        result = result.split(',');
        return result;
    }

    /**
     * 与函数 _convert 配合使用，将阿拉伯数字字符串数组转成数字
     * @Param arr 阿拉伯数字字符串数组 eg: ["3", "1000", "0", "2"] ["3002"]
     * return Number 数字 eg: 3002
     */
    function calc(arr) {
        var len = arr.length,
            i,
            result = 0,
            cheng = 0,
            he = 0,
            menu = 10;

        // 整数部分
        for (i = 0; i < len; i++) {
            if (arr[i] == '.') {
                break;
            }

            if (arr[i] > 9) {
                !!he && (cheng = he, he = 0);
                cheng == '0' && (cheng = 1);
                menu = arr[i - 1] < 9 || !arr[i - 1] ? arr[i] : menu * arr[i];
            } else {
                he = arr[i];
            }

            arr[i] == '0' && (menu = 10);

            if (arr[i + 1] < 9 || arr[i + 1] == undefined) {
                result += cheng * menu;
                cheng = 0;
            }
        }
        result += he * menu / 10;

        // 小数部分
        for (; i < len; i++) {
            result += arr[i];
        }

        return Number(result);
    }

    /**
     * 找出任意字符串中的金额
     * @Param anyStr String 任意字符串
     * return Number 关于金额的数字
     */
    analyzer.getMoney = function (anyStr) {
        var searchArr = searchMoney(anyStr),
            i = 0,
            len = !!searchArr ? searchArr.length : 0,
            sum = 0,
            k_flag = false,
            moneyStr, cvArr;

        for (; i < len; i++) {
            moneyStr = searchArr[i];

            if (/[元块]/.test(moneyStr)) {
                moneyStr = moneyStr.slice(0, -1);

                cvArr = _convert(moneyStr);
                sum += calc(cvArr);

                k_flag = true;
                cvArr = null;
            } else if (/[角毛]/.test(moneyStr)) {
                // 去掉 毛、角
                moneyStr = moneyStr.slice(0, -1);

                cvArr = _convert(moneyStr);
                cvArr = ["0", "."].concat(cvArr);

                sum += calc(cvArr);

                cvArr = null;
            } else if (!k_flag) {
                cvArr = _convert(moneyStr);
                sum += calc(cvArr);

                cvArr = null;
            } else if (k_flag) {
                cvArr = _convert(moneyStr);
                cvArr = ["0", "."].concat(cvArr);

                sum += calc(cvArr);

                cvArr = null;
            }
        }

        return sum;
    };
    // ------------------------------------------------- 获取金额 结束--------------------------------

    // ------------------------------------------------- 获取账单类型 开始-----------------------------
    var keyWords = [{
        keyWord: /(早餐)|(午餐)|(晚餐)/g,
        type: "餐饮食品",
        img: "food.png"
    }, {
        keyWord: /(地铁卡)/g,
        type: "行车交通",
        img: "traffic.png"
    }];

    /**
     * 获取账单类型
     * @Param billStr String 账单内容字符串
     * return Object/Bool[false] 账单类型
     */
    analyzer.getBillKey = function (billStr) {
        var i = 0,
            len = keyWords.length,
            result = {},
            flag;

        for (; i < len; i++) {
            flag = billStr.match(keyWords[i].keyWord) || [false];
            if (!!flag[0]) {
                result.keyWord = flag[0];
                result.type = keyWords[i].type;
                result.img = keyWords[i].img;

                return result;
            }
        }

        return {
            keyWord: "",
            type: "其他支出",
            img: "other.png"
        };
    };
    // ------------------------------------------------- 获取账单类型 结束-----------------------------

    // ------------------------------------------------- 分析账单时间 开始-----------------------------

    var dateReg = /([今昨前]天)|(星期[一二三四五六日天])|((\d+年)?(\d+月)?\d+[日号])/g,
        today = new Date(),
        vagueDate = {};

    // 初始化模糊日期
    (function () {
        var weeks = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            yesterday = new Date(today),
            beforeday = new Date(yesterday),
            i = 0,
            dateTmp, dayTmp;

        // 今天 昨天 前天
        yesterday.setDate(today.getDate() - 1);
        beforeday.setDate(yesterday.getDate() - 1);

        vagueDate["今天"] = date2str(today);
        vagueDate["昨天"] = date2str(yesterday);
        vagueDate["前天"] = date2str(beforeday);

        // 星期
        for (; i < 7; i++) {
            dateTmp = new Date(today);
            dateTmp.setDate(today.getDate() - i);

            dayTmp = dateTmp.getDay();
            dayTmp = weeks[dayTmp];

            vagueDate[dayTmp] = date2str(dateTmp);
        }
    }());

    /**
     * 日 转 年月日
     * @Param dayStr 日期字符串 eg: 20号
     * retuen String 日期字符串 eg: 2016年11月28日
     */
    function day2date(dayStr) {
        var dayReg = /\d+[日号]/g,
            monthReg = /\d+月/g,
            yearReg = /\d+年/g,
            t_year = today.getFullYear() + "年",
            t_month = today.getMonth() + 1 + "月",
            year = dayStr.match(yearReg) || [t_year],
            month = dayStr.match(monthReg) || [t_month],
            day = dayStr.match(dayReg),
            result = year[0] + month[0] + day[0];
        result = result.slice(0, -1) + "日";

        return result;
    }

    /**
     * 日期对象 转 日期字符串
     * @Param date 日期对象
     * retuen String 日期字符串 eg: 2016年11月28日
     */
    function date2str(date) {
        if (typeof date !== "object") {
            return;
        }

        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            result = year + "年" + month + "月" + day + "日";

        return result;
    }

    /**
     * 获取账单时间
     * @Param billStr String 账单内容字符串
     * return Object {input, date}
     */
    analyzer.getDate = function (billStr) {

        var result = billStr.match(dateReg) || [false],
            input = result[0];

        if (!input) {
            return {
                input: '',
                date: date2str(today)
            };
        }

        // 模糊日期
        result = {};
        result.input = input;
        result.date = vagueDate[input];

        // 某一天
        if (!result.date) {
            result.date = day2date(input);
        }

        return result;
    };

    /**
     * 分析账单
     * @Param billStr String 账单内容字符串
     * return Object {date, keyWord, type, img, money}
     */
    analyzer.analyze = function (billStr) {
        var billStr = billStr,
            result = {
                mess: billStr
            },
            temp;

        // 时间
        temp = this.getDate(billStr);
        result.date = temp.date;
        temp = null;

        billStr = billStr.replace(result.input, "");

        // 金额
        result.money = this.getMoney(billStr);

        // 账单信息
        temp = this.getBillKey(billStr);

        console.log(temp);
        result.keyWord = temp.keyWord;
        result.type = temp.type;
        result.img = temp.img;

        return result;
    };

    return analyzer;
});