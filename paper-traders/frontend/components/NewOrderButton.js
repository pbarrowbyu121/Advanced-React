import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewOrderButtonStyles from "./styles/NewOrderButtonStyles";

const AddCircleIconStyle = {
  color: "var(--green)",
};

export default function NewOrderButton() {
  return (
    <div>
      <AddCircleIcon style={AddCircleIconStyle}>AddCircleIcon</AddCircleIcon>
      <a>New Order</a>
    </div>
  );
}
