// External

import React from 'react'

// Components

import { CardText } from 'src/components/CardText'
import { Flex } from 'src/components/Flex'

// Interfaces
import { EasyAuction, FixedPriceAuction } from 'src/interfaces/Auction'

// Mesa Utils
import { isAuctionUpcoming } from 'src/mesa/auction'

interface AuctionFinalPriceProps {
  auction: EasyAuction & FixedPriceAuction
}

const round = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

/**
 *
 * @todo check if fixedauction or easyauction type
 *
 */

export function AuctionFinalPrice({ auction }: AuctionFinalPriceProps) {
  if (isAuctionUpcoming(auction)) {
    // or some other minimum reserve price
    return (
      <Flex>
        <CardText>N/A</CardText>
        <CardText fontWeight="light">&nbsp;DAI/{auction.tokenOut.symbol}</CardText>
      </Flex>
    )
  }

  /**
   * @todo redo props/redux on VSP to share with other components
   */

  // const pricePerDAI: number = calculateClearingPrice(auction.bids).tokenInAmount.toNumber()

  // const pricePerToken: number = round(1 / pricePerDAI)

  return (
    <Flex>
      {/* <CardText data-testid="openprice">{pricePerToken}</CardText> */}
      <CardText data-testid="openprice">N/A</CardText>
      <CardText fontWeight="light">&nbsp;DAI/{auction.tokenOut.symbol}</CardText>
    </Flex>
  )
}
