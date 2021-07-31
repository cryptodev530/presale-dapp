import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as bsc from '@binance-chain/bsc-use-wallet'
import metamaskLogo from '../../assets/img/metamask-fox.svg'
import bscLogo from '../../assets/img/bsc.png'
import trustLogo from '../../assets/img/trustwallet.png'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'
import WalletCard from './components/WalletCard'
import Button from '../Button'
import Web3 from 'web3'
import { useStore } from 'react-redux'

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

window.ethereum = window.ethereum || "";

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const [account, setAccount] = useState()
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  const getAccount = async (state : String) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0])
    if (accounts[0]) {
      onDismiss()
    }
    else{
      ethEnabled()
    }
  }
  const ethEnabled = async () => {
    if (window.ethereum as unknown) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      onDismiss()
      return true;
    }
  }
  return (
    <Modal>
        <ModalTitle text="Connect A Wallet" />

        <ModalContent>
          <StyledWalletsWrapper>
            <StyledWalletCard>
              <WalletCard
                icon={<img src={metamaskLogo} alt='Metamask' style={{ height: 32 }} />}
                onConnect={() => getAccount('injected')}
                title="Metamask"
              />
              <Spacer />
              {/* <WalletCard
                icon={<img src={bscLogo} alt='BSC' style={{ height: 32 }} />}
                onConnect={() => connect('bsc')}
                title="BSC wallet"
              /> */}
              {/* <Spacer /> */}
              <WalletCard
                icon={<img src={trustLogo} alt='BSC' style={{ height: 32 }} />}
                onConnect={() => getAccount('walletconnect')}
                title="Wallet connect"
              />
            </StyledWalletCard>
          </StyledWalletsWrapper>
        </ModalContent>

        <ModalActions>
          <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        </ModalActions>

    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: block;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  font-family: 'Print Char 21';
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.7);
  flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
`
export default WalletProviderModal
