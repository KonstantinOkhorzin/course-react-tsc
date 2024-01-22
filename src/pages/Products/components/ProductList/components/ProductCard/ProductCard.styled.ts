import styled from '@emotion/styled';

export const WrapperCard = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ImgContainer = styled.div``;

export const Content = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  padding: 10px;
`;

export const Title = styled.h3`
  text-align: center;
  font-weight: 700;
  font-size: 18px;
`;

export const Description = styled.p``;

export const Price = styled.p`
  text-align: center;
`;

export const Buttons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
`;
