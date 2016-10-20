define(['text'], function (text) {
	'use strict';

	var xvue = {};

	var Deps_reg = /import\s+(\w+)\s+from\s+(\'?|\"?)([\w,\.,\/]*)(\'?|\"?)/g,
		Script_reg = /<script>([\s\S]*)<\/script>/,
		Template_reg = /<template>([\s\S]*)<\/template>/,
		export_reg = /export\s+(default\s*)?{/,
		scriptStr, tempStr;

	// 获取依赖
	/**
	 * @Param scriptStr script字符串
	 */
	function getDeps() {
		var res = scriptStr.match(Deps_reg),
			temp,
			Deps_name_list = '(Vue, ',
			Deps_path_list = "['Vue', ";

		// import
		if (!!res) {
			res.forEach(function (item) {
				// 去除依赖内容
				scriptStr = scriptStr.replace(item, '');
				// 解析依赖内容
				temp = item.replace(/import|\s/g, '').replace('from', ',').split(',');
				Deps_path_list += "'xvue!" + temp[1].replace(/\'|\"/g, '') + ".xvue', ";
				Deps_name_list += temp[0] + ", ";
			});
			// 添加到依赖列表
			Deps_path_list = Deps_path_list.slice(0, -2) + ']';
			Deps_name_list = Deps_name_list.slice(0, -2) + ')';
		} else {
			Deps_path_list = Deps_path_list.slice(0, -2) + ']';
			Deps_name_list = Deps_name_list.slice(0, -2) + ')';
//			Deps_path_list += ']';
//			Deps_name_list += ')';
		}

		// export
		scriptStr = scriptStr.replace(export_reg, 'return Vue.extend({\r\ntemplate: "' + tempStr + '",');

		scriptStr = "define(" + Deps_path_list + ", function " + Deps_name_list + " {'use strict';\r" + scriptStr + ");\r\n});";
	}

	// 分离模板与脚本
	/**
	 * @Param xvueTmp xvue模板
	 */
	function divide(xvueTmp) {
		scriptStr = xvueTmp.match(Script_reg)[1];
		tempStr = xvueTmp.match(Template_reg)[1].replace(/\r\n/g, '');
	}

	xvue.load = function (name, req, onload, config) {
		req(['text!' + name], function (value) {
			divide(value);
			getDeps();
//			console.log(scriptStr);
			onload.fromText(scriptStr);
		});
	};

	return xvue;
});