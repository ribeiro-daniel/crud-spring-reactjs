package br.com.desafio.conquer.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class CorsConfiguration {
	@SuppressWarnings("deprecation")
	private final class WebMvcConfigurerAdapterExtension extends WebMvcConfigurerAdapter {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry
			.addMapping("/**")
			.allowedMethods("*")
			.allowedOrigins("*");
			
		}
	}

	public WebMvcConfigurer corsWebConfigurer() {
		return new WebMvcConfigurerAdapterExtension();
	}
}
