'use client';

import styled from 'styled-components';

function NotFoundPage({ text }) {
  return (
    <_Wrapper>
      <_Title>{text}</_Title>
    </_Wrapper>
  );
}
export default NotFoundPage;

const _Wrapper = styled.div`
  width: 100%;
  padding: 4rem;
`;

const _Title = styled.h1`
  text-align: center;
  color: #192655;
`;
