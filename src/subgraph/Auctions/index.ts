// Externals
import { request, gql } from 'graphql-request'

//subgraph
import { ENDPOINT } from 'src/subgraph/index'

const auctionsQuery = gql`
  {
    fixedPriceAuctions {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startDate
      endDate
      sellAmount
      minbiddingAmount
      minBuyAmountPerOrder
      minFundingThreshold
      orderCancellationPeriod
      duration
      isAtomicClosureAllowed
    }
    easyAuctions {
      id
      name
      createdAt
      updatedAt
      deletedAt
      status
      startDate
      endDate
      tokenAmount
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
        id
        name
        symbol
        decimals
      }
    }
  }
`

export const auctionsRequest = request(ENDPOINT, auctionsQuery)
