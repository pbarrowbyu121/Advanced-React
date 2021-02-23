import UpdateOrder from "../components/UpdateOrder";

export default function UpdateOrderPage({ query }) {
  console.log("update query", query);
  return (
    <div>
      <UpdateOrder id={query.id} />
    </div>
  );
}
