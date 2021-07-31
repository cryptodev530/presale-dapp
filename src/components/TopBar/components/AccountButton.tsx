
import React, { useCallback } from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import * as bsc from '@binance-chain/bsc-use-wallet'
import useModal from '../../../hooks/useModal'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import Button from '../../Button'
import Web3 from 'web3'

interface AccountButtonProps {
}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const [account, setAccount] = useState()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0] as any)
  }
  setInterval(() => {
    getAccount();
  }, 1000);
  return (
    <div>
      <StyledAccountButton>
        {!account ? 
          (<Button onClick={handleUnlockClick} size="md" text="🔓 Unlock Wallet" />)
          : 
          (<Button onClick={onPresentAccountModal} size="md" text="My Wallet" />)
        }
        </StyledAccountButton>
    </div>
  )
}

const StyledAccountButton = styled.div`
  back
`

export default AccountButton