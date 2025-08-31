package p3.gql; import org.dataloader.*; import org.springframework.graphql.data.method.annotation.*; import org.springframework.stereotype.*; import java.util.*; import java.util.concurrent.CompletableFuture;
@Controller public class UserFieldResolvers{
  private final OrderRepo orders; public UserFieldResolvers(OrderRepo o){ this.orders=o; }
  @SchemaMapping(typeName="User", field="orders")
  public CompletableFuture<List<OrderE>> orders(User user, DataLoader<Long, List<OrderE>> loader){
    return loader.load(user.id);
  }
  @BatchMapping(typeName="User", field="orders")
  public Map<Long, List<OrderE>> loadOrders(List<User> users){
    List<Long> ids = users.stream().map(u->u.id).toList();
    Map<Long,List<OrderE>> map=new HashMap<>(); for(Long id: ids) map.put(id, new ArrayList<>());
    for(OrderE o: orders.findByUserIdIn(ids)){ map.computeIfAbsent(o.userId, k->new ArrayList<>()).add(o); }
    return map;
  }
}
