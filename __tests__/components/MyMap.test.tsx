import React from 'react';
import { cleanup, render } from '@testing-library/react'

import { MyMap } from '../../src/components/Map';
import { initialize, mockInstances, Map } from '@googlemaps/jest-mocks'

describe('MyMap', () => {

  beforeEach(() => {
    cleanup();
    initialize();
  });

  it('should renders a map', () => {
    const { container } = render(<MyMap />);
    expect(container.querySelector('div')).toBeTruthy();

    const map = mockInstances.get(Map)[0];
    expect(map).toBeTruthy();
  });

  it("should don't display search input", () => {
    const { container } = render(<MyMap />);
    expect(container.querySelector('input')).toBeFalsy();
  });

  it('should display input search', () => {
    const { container } = render(<MyMap onSearch={() => { }} />);
    expect(container.querySelector('input')).toBeTruthy();
  });
});