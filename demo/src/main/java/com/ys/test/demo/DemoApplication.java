package com.ys.test.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
/**
 *
 * @author xiaoyang
 * @date 2023/10/25 12:10
  * @descption 启动类
 * 由于springboot项目在启动时候会自动扫描启动类所在的包及其子包中多有类，
 * 并将适合的类加载到spring容器进行管理，因此启动类要放在项目最外层的包下，
 * 即其他类只能存放于他的同包或者子包
 */
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
