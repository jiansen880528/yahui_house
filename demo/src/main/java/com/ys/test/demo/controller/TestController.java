package com.ys.test.demo.controller;
/**
 *
 * @author xiaoyang
 * @date 2023/10/25 12:05
  * @descption 测试类
 */
@Controller
public class TestController {
    @RequestMapping("test")
    public  void  test(){
        System.out.println("Hello World");
    }
}
