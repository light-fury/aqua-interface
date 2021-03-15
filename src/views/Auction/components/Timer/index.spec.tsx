// Externals

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Component
import { secondsTohms, timeFrame, Timer } from './index'

// default

import { getAuctionDefault, addHours, dateUTC } from 'src/utils/Defaults'

// theme

import { theme } from 'src/styles/theme'
import { ThemeProvider } from 'styled-components'

// interfaces
import { Auction } from 'src/interfaces/Auction'

//clean up

afterEach(cleanup)

//wrapper

const wrapper = (auction: Auction) => {
  return render(
    <ThemeProvider theme={theme}>
      <Timer auction={auction} />
    </ThemeProvider>
  )
}

// tests

describe('seconds to HMS function', () => {
  describe('convert seconds into different formats', () => {
    test('tests conversion of seconds to minutes', () => {
      expect(secondsTohms(60)).toBe('1m ')
    }),
      test('tests conversion of seconds into days, hours, minutes', () => {
        expect(secondsTohms(20000)).toBe('5h 33m 20s')
      }),
      test('tests negative input', () => {
        expect(() => {
          secondsTohms(-100)
        }).toThrow('seconds cannot be negative')
      })
  })
})

describe('converts unix seconds into local Date time format function', () => {
  test('convert seconds into local time', () => {
    expect(timeFrame(1614766339)).toBe('Mar 03,  10:12 GMT')
  }),
    test('test negative input', () => {
      expect(() => {
        timeFrame(-100)
      }).toThrow('seconds cannot be negative')
    })
})

describe('Timer', () => {
  test('when auction is open it should render the correct display', async () => {
    const auction = getAuctionDefault({
      startBlock: addHours(dateUTC, -0.01).unix(),
      endBlock: addHours(dateUTC, 0.05).unix(),
    })

    const { getByTestId } = wrapper(auction)

    expect(await getByTestId('open')).toHaveTextContent('3m')
  }),
    test('when auction is upcoming, it displays the correct return', () => {
      const auction = getAuctionDefault({
        startBlock: addHours(dateUTC, 14).unix(),
        endBlock: addHours(dateUTC, 114).unix(),
      })

      const { getByText } = wrapper(auction)
      expect(getByText('to')).toBeInTheDocument()
    }),
    test('when auction is closed, it should return the correct display', async () => {
      const auction = getAuctionDefault({
        startBlock: addHours(dateUTC, -140).unix(),
        endBlock: addHours(dateUTC, -14).unix(),
      })

      const { getByTestId } = wrapper(auction)
      expect(await getByTestId('closed')).toHaveTextContent('GMT')
    })
})
