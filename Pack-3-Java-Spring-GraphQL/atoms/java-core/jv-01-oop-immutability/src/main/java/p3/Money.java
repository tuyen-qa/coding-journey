package p3;
import java.util.Objects;
public final class Money {
  private final String currency;
  private final long cents;
  public Money(String currency, long cents){
    if(currency==null || currency.isBlank()) throw new IllegalArgumentException("currency");
    if(cents<0) throw new IllegalArgumentException("negative");
    this.currency=currency.toUpperCase(); this.cents=cents;
  }
  public String currency(){ return currency; }
  public long cents(){ return cents; }
  public Money add(Money other){
    ensureSame(other); return new Money(currency, this.cents + other.cents);
  }
  public Money subtract(Money other){
    ensureSame(other); if(this.cents < other.cents) throw new IllegalArgumentException("insufficient");
    return new Money(currency, this.cents - other.cents);
  }
  private void ensureSame(Money o){ if(!this.currency.equals(o.currency)) throw new IllegalArgumentException("currency_mismatch"); }
  @Override public boolean equals(Object o){ if(this==o) return true; if(!(o instanceof Money m)) return false; return cents==m.cents && currency.equals(m.currency); }
  @Override public int hashCode(){ return Objects.hash(currency, cents); }
  @Override public String toString(){ return currency+":"+cents; }
}
