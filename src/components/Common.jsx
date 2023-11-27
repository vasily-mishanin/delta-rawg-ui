'use client';

import styled from 'styled-components';
import Link from 'next/link';

function Greeting({ children }) {
  return (
    <Wrapper>
      <Title>{children}</Title>
    </Wrapper>
  );
}
export default Greeting;

export const Wrapper = styled.section`
  padding: 2em 4rem;
  background: #192655;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #fff6f6;
`;

export const StyledLink = styled(Link)`
  color: #bf4f74;
  font-weight: bold;
`;
