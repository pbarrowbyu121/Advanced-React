import Page from "../components/Page";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import RequestReset from "../components/RequestReset";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2 rem;
`;

const SignInPage = (props) => (
  <div>
    <GridStyles>
      <SignIn />
      <SignUp />
      <RequestReset />
    </GridStyles>
  </div>
);

export default SignInPage;
