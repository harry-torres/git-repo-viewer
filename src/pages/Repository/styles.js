import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 1;

  svg {
    color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    margin-top: 10px;
    font-size: 20 px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #665;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  /** only from second item and on */
  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #ddd;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
export const PageButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  button {
    border: none;
    font-size: 14px;
    color: #eee;
    background: #7159c1;
    border-radius: 4px;
    padding: 10px 10px;
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
    & + button {
      margin-left: 20px;
    }
  }
`;
