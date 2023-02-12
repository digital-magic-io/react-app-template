import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

test('renders test page', () => {
  render(<App />)
  const element = screen.getAllByText('MUI and React Setup')
  //expect(element).toBeInTheDocument()
  const linkElement = screen.getByText(/Loading/i)
  console.log(element)
  console.log(linkElement)
  expect(linkElement).toBeInTheDocument()
})
