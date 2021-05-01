import styled from "styled-components";

export const Category = styled.ul`
  list-style: none;
  margin-top: 30px;
  padding: 0;
`;

export const CategoryItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background: var(--background-secondary);
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: .9;
  }

  p{
    margin: 0;
    padding-right: 10px;
  }
`
export const AudioItem = styled.li`
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
  background: var(--background-secondary);
  cursor: pointer;

  &:hover {
    opacity: .9;
  }
`;
