'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const Wrapper = styled.section`
  padding: 2em 4rem;
  background: papayawhip;
`;
export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

export const StyledLink = styled(Link)`
  color: #bf4f74;
  font-weight: bold;
`;

function Greeting({ children }) {
  return (
    <Wrapper>
      <Title>{children}</Title>
    </Wrapper>
  );
}
export default Greeting;
