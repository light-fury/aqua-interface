// External
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { BigNumber } from 'ethers'
import numeral from 'numeral'

// Hooks
import { useElementWidth } from 'src/hooks/useElementWidth'
import { useAuction } from 'src/hooks/useAuction'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'

// Components
import { PlaceBidForm } from '../Auction/components/PlaceBidForm'
import { BidList } from '../Auction/components/BidList'
import { Header } from '../Auction/components/Header'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { Graph } from '../Auction/components/Graph'
import { CardBody } from 'src/components/CardBody'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'
import { Timer } from 'src/views/Auction/components/Timer'

// Layout
import { Center } from 'src/layouts/Center'

// Mesa Utils
import { filterAuctionBidsByAddress, isAuctionOpen } from 'src/mesa/auction'
import { calculateClearingPrice } from 'src/mesa/price'

// Wallet Utils
import { getRandomWallet } from 'src/utils/wallets'

/**
 * Generates a random integer between two numbers (inclusive)
 * @param min
 * @param max
 */
const getRandomInteger = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // max & min both included
}

export function SimulationView() {
  // A random generated Ethereum address for simulation.
  // This will be replaced with Web3 EOA
  const [userAddress, setUserAddress] = useState<string>('')

  // Simulation data
  const ref = useRef<HTMLElement>()
  const containerWidth = useElementWidth(ref)
  const [clearingPrice, setClearingPrice] = useState<AuctionBid>()
  const [bids, setBids] = useState<AuctionBid[]>([])
  const [count, setCount] = useState(0)
  const [updateAuction, setUpdateAuction] = useState(false)

  const auction = useAuction('simulation')
  const [t] = useTranslation()
  const theme = useTheme()

  const addBid = useCallback(
    (newAuctionBid: AuctionBid) => {
      setBids([...bids, newAuctionBid])
    },
    [bids]
  )

  useEffect(() => {
    const interval = setInterval(() => setCount(PrevCount => PrevCount + 1), 1000)

    if (typeof auction !== 'undefined') {
      setUpdateAuction(isAuctionOpen(auction))
    }
    return () => {
      clearInterval(interval)
    }
  }, [count, auction])

  useEffect(() => {
    if (!userAddress) {
      setUserAddress(getRandomWallet().address)
    }

    //Calculate the virtual
    setClearingPrice(calculateClearingPrice(bids))

    if (typeof auction !== 'undefined') {
      if (isAuctionOpen(auction)) {
        //Add 1 random bids every second
        const addRandomBidsInterval = setInterval(
          () =>
            addBid({
              address: getRandomWallet().address,
              sellAmount: BigNumber.from(getRandomInteger(1, 30)), // DAI
              buyAmount: BigNumber.from(getRandomInteger(1, 300)), // SIM/ERC20
            }),
          2000
        )

        return () => {
          clearInterval(addRandomBidsInterval)
        }
      }
    }
  }, [addBid, auction, userAddress, bids, updateAuction])

  if (!auction) {
    return (
      <Center minHeight="100%">
        <Container>Loading</Container>
      </Center>
    )
  }

  return (
    <Center minHeight="100%">
      <Container>
        <Header title="Simulation" />
        <Card mb={theme.space[4]}>
          <CardBody>
            <Flex flexDirection="row" justifyContent="space-between">
              <strong>
                {numeral(clearingPrice?.sellAmount.toNumber()).format('0,0')} {auction.tokenSymbol} / DAI
              </strong>
              <Timer auction={auction} />
            </Flex>
          </CardBody>
          <CardBody
            ref={e => {
              if (e) {
                ref.current = e
              }
            }}
          >
            <Graph bids={bids} height={400} width={containerWidth} userAddress={userAddress} />
          </CardBody>
        </Card>
        <FlexGroupColumns>
          <Card mb={theme.space[4]}>
            <CardBody>
              <CardTitle>{t('texts.placeBid')}</CardTitle>
            </CardBody>
            <CardBody>
              <PlaceBidForm
                onSubmit={({ tokenAmount, tokenPrice }) =>
                  addBid({
                    buyAmount: BigNumber.from(tokenAmount),
                    sellAmount: BigNumber.from(tokenPrice),
                    address: userAddress,
                  })
                }
                auction={auction}
                CurrentSettlementPrice={clearingPrice?.sellAmount.toNumber()}
              />
            </CardBody>
          </Card>
          <Card mb={theme.space[4]}>
            <CardBody>
              <CardTitle>{t('texts.bids')}</CardTitle>
            </CardBody>
            <CardBody>
              <BidList
                baseTokenSymbol="DAI"
                quotetokenSmybol={auction.tokenSymbol}
                bids={bids}
                userAddress={userAddress}
              />
            </CardBody>
          </Card>
        </FlexGroupColumns>
        <Card mb={theme.space[4]}>
          <CardBody>
            <CardTitle>{t('texts.yourBids')}</CardTitle>
          </CardBody>
          <CardBody>
            <BidList
              baseTokenSymbol="DAI"
              quotetokenSmybol={auction.tokenSymbol}
              bids={filterAuctionBidsByAddress(bids, userAddress)}
            />
          </CardBody>
        </Card>
      </Container>
    </Center>
  )
}

const FlexGroupColumns = styled(Flex)(props => ({
  gap: props.theme.space[4],
  '& > *': {
    flex: 1,
  },
}))
