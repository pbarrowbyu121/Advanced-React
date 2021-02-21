import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import RequestReset from "../components/RequestReset";
import { useUser } from "./User";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2 rem;
`;

export default function Authentication() {
  const user = useUser();
  if (user) {
    return <p>You're signed in!</p>;
  }
  return (
    <div>
      <GridStyles>
        <SignUp />
        <SignIn />
        <RequestReset />
      </GridStyles>
    </div>
  );
}
