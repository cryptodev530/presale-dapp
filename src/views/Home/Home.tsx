
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import { ethers } from 'ethers'
import { useMediaQuery } from 'react-responsive'
import PresaleABI from '../../constants/abi/Presale.json'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import RroxyUSDCABI from '../../constants/abi/ProxyUSDCABI.json'
import { useEffect } from 'react'
import TopBar from '../../components/TopBar'
import MobileMenu from '../../components/MobileMenu'

import "./styles.css";

const Home: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })

  const [usdc_amount, setUSDCAmountForBuy] = useState(0);
  const [allowance_amount, setAllowanceAmount] = useState(0);
  const [swapRate, setSwapRate] = useState(0)
  // const { account } = bsc.useWallet()


  const [account, setAccount] = useState();
  const [owner_adderss, setOwnerAddress] = useState('0x91aca371c6e291764f7c95b7505812df735596b7')

  useEffect(() => {
    
  }, [])

  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  

  const getAccount = async ()  =>{
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0] as any);
    getAllowance(accounts[0] as String, owner_adderss as String)
  }
  const onChangeInputUSDC = (event : any)=>{
    let depositValA = event.target.value * 250;
    setUSDCAmountForBuy(depositValA)
  }
  const getAllowance = async (owner_adderss: String, spende_address: String) =>{
    if (owner_adderss != null && spende_address != null){
      const usdcInst = new web3.eth.Contract((RroxyUSDCABI as unknown) as AbiItem, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
      const allowance_value = await usdcInst.methods.allowance(owner_adderss as unknown, spende_address as unknown).call();
      setAllowanceAmount(allowance_value as any)
    }
    else{
      setAllowanceAmount(0)
    }
  }
  const approveUSDC = async () => {
    if(account != null){
      const usdcInst = new web3.eth.Contract((RroxyUSDCABI as unknown) as AbiItem, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
      await usdcInst.methods.approve('0x91aca371c6e291764f7c95b7505812df735596b7', ethers.constants.MaxUint256).send({ from: account }).then(function () {
      });

      getAllowance(account as String, owner_adderss as String)
    }
    else{
      window.alert("please connect the wallet")
    }
   
  }
  const getSwapRate = async () => {
    const presaleContract = new web3.eth.Contract((PresaleABI as unknown) as AbiItem, '0x91aca371c6e291764f7c95b7505812df735596b7');
    const swapRate = await presaleContract.methods.getSwapRate().call();
    setSwapRate(swapRate)
  }
  setInterval(() => {
    getAccount();
    getSwapRate();
  }, 1000);

  const buyTTN = async(amount : any) =>{
    const presaleContract = new web3.eth.Contract((PresaleABI as unknown) as AbiItem, '0x91aca371c6e291764f7c95b7505812df735596b7');
    await presaleContract.methods.receiveFunds(amount * 10 ** 6).send({from: account}).then(function(){
    });

  }
  
  return (
    <div>
      <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
      <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
      <Page>
        <div style={{ display: isDesktopOrLaptop ? "grid" : "block", gridTemplateColumns: "repeat(1, 1fr)", gridGap: 2 }}>
          <div></div>
          <PageHeader
            icon={null}
            maintitle={null}
            title="TTN token PUBLIC SALE EVENT"
            subtitle={account}
          />
        </div>
        <div style={{ display: isDesktopOrLaptop ? 'flex' : 'block', width: 'auto', margin: isDesktopOrLaptop ? "40px auto 50px" : "40px auto" }}>
          <StyledContainer>
            <div style={{ display: 'grid', marginTop: '20px', color: 'white' }}>
              <span>SWAP RATE</span>
              <span style={{ fontWeight: 600 }}>1 USDC = 1/{swapRate} TTN</span>
            </div>
            <div className="input-f">
              <div className="col-b">
                <h4>AMOUNT TO BUY*</h4>
              </div>
              <div className="col-b">
                <div className="input-box" style={{lineHeight: '30px'}}>
                  <input type="number" min="0" name="price" onChange={onChangeInputUSDC}/><span className="text-b" style={{marginTop: '20px'}}>USDC</span>
                </div>
                </div>
              </div>
            <div className="btn-box">
              <button className={allowance_amount > 0 ? "disable_btn" : "btn"} disabled= {allowance_amount>0 ? true : false } onClick={approveUSDC}>Approve</button>
              <button className={allowance_amount == 0 ? "disable_btn" : "btn"} disabled={allowance_amount == 0 ? true : false} onClick={()=>buyTTN(usdc_amount)}>BUY</button>
              </div>
            </StyledContainer>  
        </div>
      </Page>
    </div>
      )
}

      const StyledContainer = styled.div`
        background: #74c5f3;
        color: white
        box-sizing: border-box;
        margin: 0px;
        max-width: 456px;
        width: 100%;
        padding: 20px;
        position: relative;
        // border: 1px solid #751113;
        border-radius: 20px;
        font-family: "Nunito";
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
        @media (max-width: 767px) {
          // width: auto;
          // padding: 0px;
          // left: 0;
        }
      `

      export default Home
