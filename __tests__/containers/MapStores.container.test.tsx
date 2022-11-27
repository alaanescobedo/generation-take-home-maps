import React from 'react';
import { render } from '@testing-library/react'
import { MapStores } from '../../src/containers'

describe('MapStores', () => {
  it('should render', () => {
    const { container } = render(<MapStores />)

    expect(container).toBeInTheDocument()
  })

})