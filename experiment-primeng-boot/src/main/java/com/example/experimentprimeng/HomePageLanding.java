package com.example.experimentprimeng;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageLanding {

	@RequestMapping("/users")
	public String index() {
		return "forward:/index.html";
	}
}
