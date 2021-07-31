import React from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'
import bgImg from '../../assets/img/footerbg.svg'

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledImg>
      <StyledFooterInner>
        <Nav />
      </StyledFooterInner>
      <img src={bgImg} alt='logo' style={{width: '100%',height: '250px'}} />
    </StyledImg>
    
  </StyledFooter>
)

const StyledFooter = styled.footer`
  // align-items: start;
  // display: flex;
  background: white;
  justify-content: center;
`
const StyledFooterInner = styled.div`
  align-items: start;
  display: flex;
  justify-content: center;
  height: 30px;
  width: 100%;
`
const StyledImg = styled.div`
background-position: center bottom;
background-repeat: repeat-x;
background-size: 50%;
`

export default Footer