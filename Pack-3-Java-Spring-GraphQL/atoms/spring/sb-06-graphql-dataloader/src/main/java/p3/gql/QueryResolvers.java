package p3.gql; import org.springframework.graphql.data.method.annotation.*; import org.springframework.stereotype.*; import java.util.*;
@Controller public class QueryResolvers{
  private final UserRepo users; public QueryResolvers(UserRepo u){ this.users=u; }
  @QueryMapping public List<User> users(){ return users.findAll(); }
}
