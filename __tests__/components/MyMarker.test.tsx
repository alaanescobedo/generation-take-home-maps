import React, { useState } from 'react';
import { act, cleanup, render } from '@testing-library/react'
import { initialize, Marker, mockInstances, InfoWindow } from '@googlemaps/jest-mocks'
import { MyMarker } from '../../src/components/Map';

import { icons } from '../../src/constants'
import { IStore } from '../../src/types';
import { storeMock, storeMockArr } from '../mocks';

const favoriteIcon = icons.favorite;
const defaultIcon = icons.default;

const TestComponent = ({ actStore = storeMock, ...options }: { actStore?: IStore | null } & google.maps.MarkerOptions) => {
  const [activeStore, setActiveStore] = useState<IStore | null>(actStore)

  const addFavorite = () => setActiveStore({ ...activeStore!, isFavorite: true })
  const removeFavorite = () => setActiveStore({ ...activeStore!, isFavorite: false })

  return (
    <MyMarker
      icon={activeStore?.isFavorite ? favoriteIcon : defaultIcon}
      handleClick={() => activeStore?.isFavorite ? removeFavorite() : addFavorite()}
      {...options}
    />
  );
}

const TestComponentArr = () => {
  return (
    <>
      {storeMockArr.map((store, index) => (
        <TestComponent
          key={index}
          position={store.coords}
          icon={store.isFavorite ? favoriteIcon : defaultIcon}
          label={store.name}
        />
      ))}
    </>
  )
}

describe('MyMarker', () => {

  beforeEach(() => {
    cleanup();
    initialize()
    mockInstances.clearAll();
  });

  it('should create a marker', () => {
    render(<TestComponent />);
    const markerMocks = mockInstances.get(Marker)
    const infoWindowMocks = mockInstances.get(InfoWindow)
    expect(markerMocks.length).toBe(1)
    expect(infoWindowMocks.length).toBe(1)
  });

  it('should create 2 Marker instances', () => {
    render(<TestComponentArr />);

    const markerMocks = mockInstances.get(Marker)
    const infoWindowMocks = mockInstances.get(InfoWindow)
    expect(markerMocks.length).toBe(2)
    expect(infoWindowMocks.length).toBe(2)
  })

  it('should marker call to addListener 3 times', () => {
    render(<TestComponentArr />);

    const markerMocks = mockInstances.get(Marker)

    expect(markerMocks[0].addListener).toHaveBeenCalledTimes(3)
    expect(markerMocks[0].addListener).toHaveBeenCalledWith('click', expect.any(Function))
    expect(markerMocks[0].addListener).toHaveBeenCalledWith('mouseover', expect.any(Function))
    expect(markerMocks[0].addListener).toHaveBeenCalledWith('mouseout', expect.any(Function))
  })

  it("should marker call to setOptions 1 time", () => {
    render(<TestComponentArr />);

    const markerMocks = mockInstances.get(Marker)

    expect(markerMocks[0].setOptions).toHaveBeenCalledTimes(1)
    expect(markerMocks[0].setOptions).toHaveBeenCalledWith({
      position: storeMockArr[0].coords,
      label: storeMockArr[0].name
    })
  });

  it("should marker call to setIcon 1 time", () => {
    render(<TestComponentArr />);

    const markerMocks = mockInstances.get(Marker)
    expect(markerMocks[0].setIcon).toHaveBeenCalledTimes(1)
  });

  it('should infoWindow call to addListener 1 time', () => {
    render(<TestComponentArr />);

    const infoWindowMocks = mockInstances.get(InfoWindow)
    expect(infoWindowMocks[0].addListener).toHaveBeenCalledTimes(1)
    expect(infoWindowMocks[0].addListener).toHaveBeenCalledWith('closeclick', expect.any(Function))
  })

  it('should change icon when click', () => {
    const { rerender } = render(<TestComponent />);

    const marker = mockInstances.get(Marker)[0]

    expect(marker.setIcon).toHaveBeenCalledTimes(1)

    act(() => marker.addListener.mock.calls[0][1]())

    rerender(<TestComponent />)

    expect(marker.setOptions).toHaveBeenCalledTimes(1)
    expect(marker.setIcon).toHaveBeenCalledTimes(2)
  })

  it('should open infoWindow when mouseover', () => {
    const { rerender } = render(<TestComponent />);

    const marker = mockInstances.get(Marker)[0]
    const infoWindow = mockInstances.get(InfoWindow)[0]

    expect(infoWindow.open).toHaveBeenCalledTimes(0)

    act(() => marker.addListener.mock.calls[1][1]())

    rerender(<TestComponent />)

    expect(infoWindow.open).toHaveBeenCalledTimes(1)
    expect(infoWindow.open).toHaveBeenCalledWith(marker.getMap(), marker)
  })

  it('should close infoWindow when mouseout', () => {
    const { rerender } = render(<TestComponent />);

    const marker = mockInstances.get(Marker)[0]
    const infoWindow = mockInstances.get(InfoWindow)[0]

    expect(infoWindow.close).toHaveBeenCalledTimes(0)

    act(() => marker.addListener.mock.calls[2][1]())

    rerender(<TestComponent />)

    expect(infoWindow.close).toHaveBeenCalledTimes(1)
  })

  it('should close infoWindow when closeclick', () => {
    const { rerender } = render(<TestComponent />);

    const infoWindow = mockInstances.get(InfoWindow)[0]

    expect(infoWindow.close).toHaveBeenCalledTimes(0)

    act(() => infoWindow.addListener.mock.calls[0][1]())

    rerender(<TestComponent />)

    expect(infoWindow.close).toHaveBeenCalledTimes(1)
  })

});