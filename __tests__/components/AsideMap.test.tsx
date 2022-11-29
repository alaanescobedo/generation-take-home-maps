import React, { useState } from 'react';
import { act, cleanup, render } from '@testing-library/react'
import { AsideMap } from '../../src/components/Map';
import { storeMock } from '../mocks'
import { IStore } from '../../src/types';

const TestComponent = ({ initialStore = storeMock }: { initialStore?: IStore | null }) => {
  const [activeStore, setActiveStore] = useState<IStore | null>(initialStore)

  const addFavorite = () => setActiveStore({ ...activeStore!, isFavorite: true })
  const removeFavorite = () => setActiveStore({ ...activeStore!, isFavorite: false })

  return (
    <AsideMap
      store={activeStore}
      handleFavorite={() => activeStore?.isFavorite ? removeFavorite() : addFavorite()}
      onClose={() => setActiveStore(null)}
    />
  )
}

describe('AsideMap', () => {

  let component = render(<TestComponent />);

  beforeEach(() => {
    cleanup();
    component = render(<TestComponent />);
  })

  it("should avoid adding a store to favorites if it is not selected first", () => {
    cleanup();
    const { queryByText, queryByTestId } = render(<TestComponent initialStore={null} />);

    expect(queryByText("Add to favorites")).not.toBeInTheDocument();
    expect(queryByTestId('store-info')).not.toBeInTheDocument();
  });

  it('should render the store info', () => {
    const { queryByText } = component;

    expect(queryByText(storeMock.name)).toBeInTheDocument();
    expect(queryByText(storeMock.address)).toBeInTheDocument();
    expect(queryByText(`Lat:${storeMock.coords.lat}`)).toBeInTheDocument();
    expect(queryByText(`Lng:${storeMock.coords.lng}`)).toBeInTheDocument();
  })

  it("should switch favorite status store", () => {
    const { queryByText, rerender } = component;

    expect(queryByText("Add to favorites")).toBeInTheDocument();
    expect(queryByText("Remove from favorites")).not.toBeInTheDocument();
    act(() => queryByText("Add to favorites")?.click())

    rerender(<TestComponent />);

    expect(queryByText("Remove from favorites")).toBeInTheDocument();
    expect(queryByText("Add to favorites")).not.toBeInTheDocument();
    act(() => queryByText("Remove from favorites")?.click())

    rerender(<TestComponent />);

    expect(queryByText("Add to favorites")).toBeInTheDocument();
    expect(queryByText("Remove from favorites")).not.toBeInTheDocument();
  })

  it("should render link to google maps", () => {
    const { queryByText } = component;

    expect(queryByText("View in Google Maps")).toBeInTheDocument();
    expect(queryByText("View in Google Maps")?.getAttribute('href')).toBe(`//maps.google.com?q=${storeMock.address}, ${storeMock.name}`);
  })

  it("should render a star only if the store is favorite", () => {
    const { queryByTestId, getByText, rerender } = component;

    expect(queryByTestId('store-star')).not.toBeInTheDocument();

    act(() => getByText("Add to favorites")?.click())

    rerender(<TestComponent />);

    expect(queryByTestId('store-star')).toBeInTheDocument();
  })

  it("should close the aside", () => {
    const { queryByText, getByText, rerender } = component;

    expect(queryByText("X")).toBeInTheDocument();
    act(() => getByText("X")?.click())

    rerender(<TestComponent />);

    expect(queryByText("Add to favorites")).not.toBeInTheDocument();
  })
})