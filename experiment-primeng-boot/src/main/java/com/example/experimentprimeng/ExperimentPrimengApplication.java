package com.example.experimentprimeng;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
public class ExperimentPrimengApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExperimentPrimengApplication.class, args);
	}
}
