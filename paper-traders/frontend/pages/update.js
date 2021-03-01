import UpdateOrder from "../components/UpdateOrder";

export default function UpdateOrderPage({ query }) {
  return (
    <div>
      <UpdateOrder id={query.id} />
    </div>
  );
}
