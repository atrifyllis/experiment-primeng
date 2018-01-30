package com.example.experimentprimeng;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.netflix.zuul.filters.post.LocationRewriteFilter;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableZuulProxy
public class ExperimentPrimengApplication {


	public static void main(String[] args) {
		SpringApplication.run(ExperimentPrimengApplication.class, args);
	}

	/**
	 * Needed to rewrite the redirect URL to client host so we can send the JESSIONID cookie
	 * @return
	 */
	@Bean
	public LocationRewriteFilter locationRewriteFilter() {
		return new LocationRewriteFilter();
	}
}



