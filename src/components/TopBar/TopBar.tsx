import React from 'react'
import styled from 'styled-components'
import Container from '../Container'
import Logo from '../Logo'
import AccountButton from './components/AccountButton'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  return (
      <StyleHeader>
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
        </StyledTopBarInner>
    </StyleHeader>
  )
}
const StyleHeader = styled.div`
    background: white;
    width: 100%;
    top: 0;
    left: 0;
    height: 90px;
    z-index: 10;
`
const StyledLogoWrapper = styled.div`
  margin: auto auto auto 0;
  @media (max-width: 400px) {
    width: auto;
  }
`

const StyledTopBarInner = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  // height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  justify-content: flex-end;
  margin: auto;
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: auto;
  padding: auto 10px;
  @media (max-width: 767px) {
    justify-content: center;
    width: auto;
  }
`

export default TopBar
