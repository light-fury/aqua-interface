// External
import styled from 'styled-components'
import { space, SpaceProps, color, ColorProps } from 'styled-system'
import React, { useState } from 'react'
import numeral from 'numeral'

// Components
import { Flex } from 'src/components/Flex'

// Utility
import { isSaleOpen, isSaleClosed } from 'src/mesa/sale'
import { useWindowSize } from 'src/hooks/useWindowSize'

// Svg
import InfoSVG from 'src/assets/svg/Info-Icon.svg'
import MoreSVG from 'src/assets/svg/More-Icon.svg'
import WarningSVG from 'src/assets/svg/Warning-Icon.svg'

// Interfaces
import { Sale, SaleBid, FairBidPick } from 'src/interfaces/Sale'
import { formatBigInt } from 'src/utils/Defaults'

type ColumnLabelProps = SpaceProps

const ColumnLabel = styled.div<ColumnLabelProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '140%',
    color: '#7B7F93',
    marginLeft: '8px',
  }),
  space
)

const TokenPriceLabel = styled.div<ColorProps & SpaceProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    padding: '4px 8px',
    color: '#000629',
  }),
  color,
  space
)

const InfoImg = styled.img({
  width: '14px',
  height: '14px',
  marginLeft: '4px',
})

type ModalContainerProps = {
  itemIndex: number
}

const ModalContainer = styled.div<ModalContainerProps>(props => ({
  width: '147px',
  height: '90px',
  padding: '8px 16px',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  right: '24px',
  top: `${props.itemIndex * 50 + 58}px`,
  background: '#FFFFFF',
  boxShadow: '0px 4px 12px rgba(0, 6, 41, 0.1)',
  zIndex: 200,
}))

const ModalMenu = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
  color: '#7B7F93',
  padding: '8px 0',
  cursor: 'pointer',
  ':hover': {
    color: '#304FFE',
  },
})

type IconImgProps = SpaceProps & {
  isButton?: boolean
}

const IconImg = styled.img<IconImgProps>(
  props => ({
    width: '16px',
    height: '16px',
    cursor: props.isButton ? 'pointer' : 'auto',
  }),
  space
)

interface SelfBidListProps {
  sale: Sale
  bids: SaleBid[]
  clearingPrice?: FairBidPick
  status: string
  showGraph: boolean
  isFixed?: boolean
}

export function SelfBidList({ sale, clearingPrice, bids, isFixed }: SelfBidListProps) {
  const [bidMenu, setBidMenu] = useState<number>(-1)

  const { isMobile } = useWindowSize()

  const toggleBidMenu = (index: number) => {
    if (bidMenu === index) {
      setBidMenu(-1)
      return
    }
    setBidMenu(index)
  }

  const vsp = clearingPrice
    ? formatBigInt(clearingPrice.tokenIn, sale.tokenIn.decimals) /
      formatBigInt(clearingPrice.tokenOut, sale.tokenOut.decimals)
    : 0

  if (isFixed) {
    return (
      <Flex flexDirection="column" style={{ position: 'relative' }}>
        <Flex flexDirection="row" alignItems="center" marginBottom="8px" padding={isMobile ? '0 8px' : '0 16px'}>
          <Flex flex={isMobile ? 2.5 : 3}>
            <ColumnLabel>Type</ColumnLabel>
          </Flex>
          <Flex flex={3}>
            <ColumnLabel>Amount</ColumnLabel>
          </Flex>
          <Flex flex={isSaleClosed(sale) ? 3 : 6} flexDirection="row" alignItems="center">
            <ColumnLabel>Value</ColumnLabel>
          </Flex>
          {isSaleClosed(sale) ? (
            <Flex flex={isMobile ? 1 : 3} flexDirection="row" alignItems="center" justifyContent="flex-end">
              <ColumnLabel>Status</ColumnLabel>
            </Flex>
          ) : null}
        </Flex>

        {bids.map((bid: SaleBid, index: number) => {
          const bidValue =
            formatBigInt(sale.tokenPrice, sale.tokenOut.decimals) * formatBigInt(bid.amount, sale.tokenOut.decimals)

          return (
            <Flex
              key={index}
              flexDirection="row"
              alignItems="center"
              height="50px"
              borderTop="1px dashed #DDDDE3"
              padding={isMobile ? '0 8px' : '0 16px'}
            >
              <Flex flex={3}>
                <TokenPriceLabel color={isSaleOpen(sale) ? '#4B9E98' : '#000629'}>
                  {isSaleOpen(sale) ? 'Buy Order' : 'Withdrawal'}
                </TokenPriceLabel>
              </Flex>

              <Flex flex={3}>
                <TokenPriceLabel>{`${numeral(formatBigInt(bid.amount, sale.tokenOut.decimals)).format('0')} ${
                  sale.tokenOut?.symbol
                }`}</TokenPriceLabel>
              </Flex>

              <Flex flex={6}>
                <TokenPriceLabel>{`${numeral(bidValue).format('0')} DAI`}</TokenPriceLabel>
                <Flex flex={1} />
                {isSaleClosed(sale) ? (
                  <>
                    <IconImg src={WarningSVG} margin={'4px 4px 0 8px'} />
                    {!isMobile && (
                      <TokenPriceLabel color="#000629" padding="4px 8px 4px 0">
                        Unclaimed
                      </TokenPriceLabel>
                    )}
                  </>
                ) : (
                  <IconImg src={MoreSVG} marginRight="8px" isButton={true} onClick={() => toggleBidMenu(index)} />
                )}
              </Flex>
            </Flex>
          )
        })}
        {bidMenu !== -1 && (
          <ModalContainer itemIndex={bidMenu}>
            <ModalMenu>Withdraw Bid</ModalMenu>
          </ModalContainer>
        )}
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" style={{ position: 'relative' }}>
      <Flex flexDirection="row" alignItems="center" marginBottom="8px" padding={isMobile ? '0 8px' : '0 16px'}>
        <Flex flex={3}>
          <ColumnLabel>{isFixed ? 'Type' : 'Token Price'}</ColumnLabel>
        </Flex>
        <Flex flex={3}>
          <ColumnLabel>Amount</ColumnLabel>
        </Flex>

        {isSaleOpen(sale) ? (
          <Flex flex={3} flexDirection="row" alignItems="center">
            <ColumnLabel>Est. Invested</ColumnLabel>
            <InfoImg src={InfoSVG} />
          </Flex>
        ) : (
          <Flex flex={isMobile ? 5 : 3} flexDirection="row" alignItems="center">
            <ColumnLabel>Total Tokens</ColumnLabel>
          </Flex>
        )}

        {isSaleOpen(sale) ? (
          <Flex flex={3} flexDirection="row" alignItems="center">
            <ColumnLabel>{sale.tokenOut?.symbol}</ColumnLabel>
          </Flex>
        ) : (
          <Flex flex={isMobile ? 1 : 3} flexDirection="row" alignItems="center" justifyContent="flex-end">
            {!isMobile && <ColumnLabel mr="8px">Status</ColumnLabel>}
          </Flex>
        )}
      </Flex>

      {bids.map((bid: SaleBid, index: number) => {
        const bidPrice =
          formatBigInt(bid.tokenIn, sale.tokenIn.decimals) / formatBigInt(bid.tokenOut, sale.tokenOut.decimals)
          const totalTokens =  formatBigInt(bid.tokenIn, sale.tokenIn.decimals) * formatBigInt(bid.tokenOut, sale.tokenOut.decimals)
        return (
          <Flex
            key={index}
            flexDirection="row"
            alignItems="center"
            height="50px"
            borderTop="1px dashed #DDDDE3"
            padding={isMobile ? '0 8px' : '0 16px'}
          >
            <Flex flex={3}>
              <TokenPriceLabel backgroundColor={vsp <= bidPrice ? '#4B9E985A' : '#E15F5F5A'}>
                {`${numeral(bidPrice).format('0.[00]')} DAI`}
              </TokenPriceLabel>
            </Flex>
            <Flex flex={3}>
              <TokenPriceLabel>{`${numeral(formatBigInt(bid.tokenOut, sale.tokenOut.decimals)).format('0')} ${
                sale.tokenOut?.symbol
              }`}</TokenPriceLabel>
            </Flex>
            {isSaleOpen(sale) && (
              <Flex flex={3}>
                <TokenPriceLabel>{`${numeral(formatBigInt(bid.tokenIn, sale.tokenIn.decimals)).format(
                  '0'
                )} DAI`}</TokenPriceLabel>
              </Flex>
            )}
            {isSaleOpen(sale) ? (
              vsp <= bidPrice ? (
                <Flex flex={3} flexDirection="row" alignItems="center">
                  <TokenPriceLabel>
                    {`${numeral(formatBigInt(bid.tokenOut, sale.tokenOut.decimals)).format('0.[00]')} ${
                      sale.tokenOut?.symbol
                    }`}
                  </TokenPriceLabel>
                  <Flex flex={1} />
                  <IconImg src={MoreSVG} marginRight="8px" isButton={true} onClick={() => toggleBidMenu(index)} />
                </Flex>
              ) : (
                <Flex flex={3} flexDirection="row" alignItems="center">
                  <IconImg src={WarningSVG} margin="0 4px 0 8px" />
                  <TokenPriceLabel color="#7B7F93" padding="4px 0">
                    Below Current Price
                  </TokenPriceLabel>
                  <Flex flex={1} />
                  <IconImg src={MoreSVG} marginRight="8px" isButton={true} onClick={() => toggleBidMenu(index)} />
                </Flex>
              )
            ) : (
              <Flex flex={6} flexDirection="row" alignItems="center">
                <TokenPriceLabel color="#000629" padding="4px 0 4px 8px">
                 {`${numeral(totalTokens).format('0.[00]')} ${sale.tokenOut.symbol}`}
                </TokenPriceLabel>
                <Flex flex={1} />
                <IconImg src={WarningSVG} margin={isMobile ? '0 8px' : '0 4px 0 8px'} />
                {!isMobile && (
                  <TokenPriceLabel color="#000629" padding="4px 8px 4px 0">
                    Unclaimed
                  </TokenPriceLabel>
                )}
              </Flex>
            )}
          </Flex>
        )
      })}
      {bidMenu !== -1 && (
        <ModalContainer itemIndex={bidMenu}>
          <ModalMenu>Withdraw Bid</ModalMenu>
        </ModalContainer>
      )}
    </Flex>
  )
}

SelfBidList.defaultProps = {
  status: 'active',
  showGraph: false,
  isFixed: false,
}
