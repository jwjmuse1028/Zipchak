package com.example.bitfinalteam2;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"data.*"})
@MapperScan({"data.*"})
public class BitFinalTeam2Application {

    public static void main(String[] args) {
        SpringApplication.run(BitFinalTeam2Application.class, args);
    }

}
