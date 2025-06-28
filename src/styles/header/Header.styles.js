import styled from 'styled-components'

const Header = styled.header`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e2e8f0;
`

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`

export { Header, HeaderContent, HeaderTitle }
