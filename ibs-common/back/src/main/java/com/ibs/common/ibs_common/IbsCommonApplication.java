package com.ibs.common.ibs_common;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

// import com.ibs.common.ibs_common.task.NofiticationTask;

@SpringBootApplication
@EnableScheduling
public class IbsCommonApplication {

	public static void main(String[] args) {
		SpringApplication.run(IbsCommonApplication.class, args);

	}

}
