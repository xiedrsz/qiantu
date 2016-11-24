var a = '午餐13.05元';
var b = a.match(/[点零一二三四五六七八九0123456789.十百千万元块角毛]+/g);
// console.log(b);

function _convert(str) {
	var arr_be = ["点", "零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万"];
	var arr_af = [".,", "0,", "1,", "2,", "3,", "4,", "5,", "6,", "7,", "8,", "9,", "10,", "100,", "1000,", "10000,"];
	var result = str;

	for (var i = 0; i < arr_be.length; i++) {
		result = result.replace(new RegExp(arr_be[i], "g"), arr_af[i]);
	}
	result != str && (result = result.slice(0, -1));
	result = result.split(',');
	return result;
}

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

// 使用
var str = "十三点零二";
var result = _convert(str);
result = calc(result);
console.log(result);