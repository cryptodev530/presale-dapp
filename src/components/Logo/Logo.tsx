import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import chef from '../../assets/img/logo (2).png'

const Logo: React.FC = () => {
  const onGoHome = () => {
    window.location.assign('/')
  }
  return (
    <StyledLogo to='/#' >
      <img src={chef} onClick={onGoHome} width="250" alt='logo' style={{ marginTop: 0 }} />
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

export default Logo
