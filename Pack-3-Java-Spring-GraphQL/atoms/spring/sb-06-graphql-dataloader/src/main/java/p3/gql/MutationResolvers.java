package p3.gql; import org.springframework.graphql.data.method.annotation.*; import org.springframework.stereotype.*;
@Controller public class MutationResolvers{
  private final UserRepo users; public MutationResolvers(UserRepo u){ this.users=u; }
  @MutationMapping public User createUser(@Argument String email){ return users.save(new User(email)); }
}
