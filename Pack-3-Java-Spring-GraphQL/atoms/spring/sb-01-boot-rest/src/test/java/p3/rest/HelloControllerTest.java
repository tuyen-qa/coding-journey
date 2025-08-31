package p3.rest; import org.junit.jupiter.api.Test; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest; import org.springframework.test.web.servlet.MockMvc; import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get; import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status; import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
@WebMvcTest(HelloController.class) class HelloControllerTest{
  @Autowired MockMvc mvc;
  @Test void hello() throws Exception { mvc.perform(get("/hello").param("name","dev")).andExpect(status().isOk()).andExpect(content().string("Hello dev")); }
}
