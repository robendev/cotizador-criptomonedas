import styled from "@emotion/styled";

const Texto = styled.div`
  background-color: #b7322c;
  color: #fff;
  padding: 14px 0;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 22px;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  text-align: center;
  display: block;
  width: min(90%, 400px);
  margin: 0 auto;
  margin-bottom: 20px;
`;

function Error({ children }) {
  return <Texto>{children}</Texto>;
}

export default Error;
