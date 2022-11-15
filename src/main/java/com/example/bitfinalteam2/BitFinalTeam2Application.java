package com.example.bitfinalteam2;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@ComponentScan({"data.*"})
@MapperScan({"data.*"})
@Configuration
//@EnableAutoConfiguration
public class BitFinalTeam2Application {

    public static void main(String[] args) {
        SpringApplication.run(BitFinalTeam2Application.class, args);
    }

}
