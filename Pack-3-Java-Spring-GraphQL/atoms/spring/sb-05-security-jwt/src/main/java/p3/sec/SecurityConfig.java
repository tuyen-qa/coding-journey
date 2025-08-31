package p3.sec; import org.springframework.context.annotation.*; import org.springframework.security.config.annotation.web.builders.HttpSecurity; import org.springframework.security.web.*; import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter; 
@Configuration public class SecurityConfig{
  @Bean SecurityFilterChain chain(HttpSecurity http) throws Exception {
    http.csrf(csrf->csrf.disable());
    http.authorizeHttpRequests(auth-> auth.requestMatchers("/public").permitAll().anyRequest().authenticated());
    http.addFilterBefore(new TokenFilter(), AbstractPreAuthenticatedProcessingFilter.class);
    return http.build();
  }
}
