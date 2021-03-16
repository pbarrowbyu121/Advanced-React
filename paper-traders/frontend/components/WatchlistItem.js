import formatMoney from "../lib/formatMoney";

export default function WatchlistItem({ data }) {
  if (!data) return <p>watch list item here</p>;
  return (
    <div class="watchlistItem">
      <div class="page_margin"></div>
      <div class="righthand_side">
        <p class="symbol">{data.ticker}</p>
        <div class="last_price">
          <p>{formatMoney(data.results[data.results.length - 1].c)}</p>
        </div>
      </div>
    </div>
  );
}
