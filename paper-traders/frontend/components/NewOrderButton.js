import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewOrderButtonStyles from "./styles/NewOrderButtonStyles";

const AddCircleIconStyle = {
  color: "var(--green)",
  cursor: "pointer",
};

export default function NewOrderButton({ handler, text }) {
  return (
    <div>
      <NewOrderButtonStyles>
        <AddCircleIcon onClick={handler} style={AddCircleIconStyle}>
          AddCircleIcon
        </AddCircleIcon>
        <a onClick={handler}>{text}</a>
      </NewOrderButtonStyles>
    </div>
  );
}
