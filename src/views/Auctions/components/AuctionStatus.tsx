// External
import React from 'react'
import dayjs from 'dayjs'

import { isAuctionClosed, isAuctionOpen, isAuctionUpcoming } from 'src/mesa/auction'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

// Utils
import { convertUtcTimestampToLocal } from 'src/utils/date'

interface AuctionStatusComponentProps {
  auction: Auction
}

export function AuctionStatus({ auction }: AuctionStatusComponentProps) {
  if (isAuctionOpen(auction)) {
    return <div>Ends {dayjs().to(dayjs.unix(convertUtcTimestampToLocal(auction.endBlock)))}</div>
  } else if (isAuctionUpcoming(auction)) {
    console.log(auction)
    return <div>Starts {dayjs().to(dayjs.unix(convertUtcTimestampToLocal(auction.startBlock)))}</div>
  } else if (isAuctionClosed(auction)) {
    return <div>Ended {dayjs().to(dayjs.unix(convertUtcTimestampToLocal(auction.endBlock)))}</div>
  }

  return <div>{dayjs().to(dayjs())}</div>
}
