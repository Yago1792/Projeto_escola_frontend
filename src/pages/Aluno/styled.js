import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  border-radius: 50%;
  transition: all 300ms;
  cursor: pointer;

  span {
    color: rgba(255, 255, 255, 0);
  }
`;

export const FormImg = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 300px;
      height: 180px;
    }
  }

  input {
    display: none;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 30px;

  .picContainer {
    display: flex;
    justify-content: center;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.25s ease-out;

    &:hover div {
      background: rgba(0, 0, 0, 0.4);

      span {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  img {
    width: 300px;
    height: 180px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
