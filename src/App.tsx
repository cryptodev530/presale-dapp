import React, { useCallback, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import ModalsProvider from './contexts/Modals'
import PresaleProvider from './contexts/PresaleProvider'
import {lightTheme} from './theme'
import Home from './views/Home'
import MainPage from './views/MainPage.jsx'

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props : any) => props.theme.backgroundColor};
    color: ${(props : any) => props.theme.bodycolor};
  }
`;
const App : React.FC= () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/swap" exact> 
            <Home />
          </Route>
        </Switch>
      </Router>
    </Providers>
  )
}

const Providers : React.FC = ({ children }) => {
  return (
    
    <ThemeProvider theme={lightTheme}>
    <GlobalStyle/>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' },
        }}
      >
        <PresaleProvider>
          <ModalsProvider>{children}</ModalsProvider>
        </PresaleProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

export default App
