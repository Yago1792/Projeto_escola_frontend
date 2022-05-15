import styled from 'styled-components';
import * as colors from '../../config/colors';
// import * as colors from '../../config/colors';

export const Button = styled.button`
  margin-top: 20px;
  width: 100%;
`;

export const Atencao = styled.small`
  display: block;
  color: ${colors.primaryColor};
  margin-top: 10px;
  text-align: justify;
  font-weight: 800;
`;
export const Paragrafo = styled.small`
  display: block;
  text-align: justify;
  border-bottom: 1px solid ${colors.primaryColor};
  padding-bottom: 20px;
`;

export const Div = styled.div`
  margin-top: 10px;
`;

export const Form = styled.form`
  margin-top: 20px;

  div {
    display: flex;
  }

  p {
    font-size: 15px;
    margin-top: 5px;
  }

  button {
    border-radius: 0 4px 4px 0;
  }

  input {
    width: 100%;
    height: 35px;
    border: 1px solid #aaa;
    padding: 0 10px;
    border-radius: 4px 0 0 4px;
    font-size: 20px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
