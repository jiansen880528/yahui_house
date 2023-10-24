/**
 * 要启用测试，vue.config.js中的lintOnSave要设置为true,否则就是关闭检查。然后重新执行npm run server命令，就会
 * 给出相应的错误提示
 * 执行npm run lint //最主要是处理一些空格
 * 就会根据ESLint语法规则进行检查，并按语法规则自动修复项目中不合格的代码。
 */

//ESLint是一个语法规则和代码风格的检查工具，可以用来促进写出语法正确、风格统一的代码。
//如果开启了ESLint，要严格按照其设置的语法，包括空格不能少或者多，必须用单引号不能用双引号，语句不可以写分号等，
//这些规则都是可以设置的
module.exports = {
  root: true,//用来告诉ESLInt找到当前配置文件
  env: {//指定想启用的环境，下面的配置指定为Node环境。
    node: true
  },
  extends: ["plugin:vue/essential",//格式化代码插件
            "eslint:recommended", "@vue/prettier"],//启用推荐规则
  parserOptions: {
    parser: "babel-eslint"//用来制定ESLint解析器
  },
  rules: {//配置检查规则
    //是否在控制台输出（即是否启用console.log）
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    //是否是debug方式
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "semi":[1,'never'],//禁止用分号。对于always（默认）要求在语句末尾使用分号，
                       //对于never禁止在语句末尾使用分号
    "indent":[1,2]//缩进采用2个空格。强制使用一致的缩进风格。默认是4个空格。
  }
};
