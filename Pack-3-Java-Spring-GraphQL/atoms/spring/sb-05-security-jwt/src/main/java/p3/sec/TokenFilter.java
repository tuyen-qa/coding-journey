package p3.sec; import jakarta.servlet.*; import jakarta.servlet.http.*; import org.springframework.security.authentication.*; import org.springframework.security.core.*; import org.springframework.security.core.authority.SimpleGrantedAuthority; import org.springframework.security.core.context.SecurityContextHolder; import java.io.IOException; import java.util.List;
public class TokenFilter implements Filter{
  @Override public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest r=(HttpServletRequest)req;
    String h = r.getHeader("Authorization");
    if(h!=null && h.equals("Bearer dev")){
      Authentication a = new UsernamePasswordAuthenticationToken("dev", "N/A", List.of(new SimpleGrantedAuthority("ROLE_USER")));
      SecurityContextHolder.getContext().setAuthentication(a);
    }
    chain.doFilter(req,res);
  }
}
