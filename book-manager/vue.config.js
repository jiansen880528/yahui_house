//如果项目采用Vue CLI默认的一些配置，仍不能满足需求，还可以在项目根文件夹下创建vue.config.js文件。
//vue.config.js是一个可选配置文件，如果项目的根目录等（与package.json同级的）中存在这个文件。
//那么它会被@vue/cli-service自动加载。
//这个文件要到处一个包含选项的对象，首先写入如下代码
/**注意：vue.config.js更改后需要重新启动运行项目
*/
module.exports={
    //publicPath: '/ulane/', 此属性配置上，如果访问的路径为127.0.0.1:8080/ulane/,就会进入到前端项目加载前端信息,
    //如果没有配置默认为'/'
    publicPath:'/bookManager/',
    //选项
    devServer:{
        port:8080,//端口号，如果占用，会自动加1.
        open:true,
        https:false,
        host:"localhost",//主机名，也可以是127.0.0.1
        proxy:{//设置/dev-apis去代理访问
            '/api':{
                target:'https://www.fastmock.site/mock/75bc9d26d42bfc40312366b057fefe53/example',
                changeOrigin:true,//开启代理服务进行请求转发
                ws:true,//这里默认是ture
                secure:false,
                pathRewrite:{//访问的就是http://localhost:8081/dev-api/data.json,
                             //通过这个属性吧dev-apis替换为空，这样就能访问到了
                    '^/api':'/'
                }
            }
        }
    },
    lintOnSave:false,//关闭格式
    outputDir:"dist",//设置存放打包文件的目录，默认是dist。。测试前停止原来运行项目；然后执行npm run build命令重新构建打包。
                      //打包在dist2目录下
    assetsDir:"assets",//存放打包生成的静态资源（JS,CSS,IMG,FONTS）的（相对于outputDir）目录
    indexPath:"index.html",//指定生成的index.html的输出路径（相对于outputDir）.默认值是index.html,即在outputDir根目录下。
    productionSourceMap:false//打包时候，不生成.map文件，加快打包构建


}