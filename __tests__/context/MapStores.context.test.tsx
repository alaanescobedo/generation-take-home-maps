import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import { MapStoresProvider, useMap, useStores } from '../../src/store'
import { storeMock } from '../mocks'

const TestComponent = () => {
  const { activeStore, allStores, favoriteStores, addFavorite, removeFavorite, setActiveStore, setAllStores, setFavoriteStores } = useStores();
  const { center, zoom, setCenter, setZoom } = useMap();

  return (
    <div>
      {activeStore && (
        <div>
          <p data-testid='address'>Address: {activeStore?.address}</p>
          <p data-testid='coords'>lat: {activeStore?.coords.lat} - lng: {activeStore?.coords.lng}</p>
          <p data-testid='id'>id: {activeStore?.id}</p>
          <p data-testid='name'>name: {activeStore?.name}</p>
          <p data-testid='isFavorite'>isFavorite: {activeStore?.isFavorite ? 'true' : 'false'}</p>
        </div>
      )}
      <div>
        <p data-testid='allStores'>All Stores Length: {allStores.length}</p>
        <p data-testid='favoriteStores'>Favorite Stores Length: {favoriteStores.length}</p>
      </div>
      <div>
        <p data-testid='center'>center: {center.lat} - {center.lng}</p>
        <p data-testid='zoom'>zoom: {zoom}</p>
      </div>
      <div>
        <button data-testid="addFavorite" onClick={() => addFavorite(storeMock)}>Add Favorite</button>
        <button data-testid="removeFavorite" onClick={() => removeFavorite(storeMock)}>Remove Favorite</button>
        <button data-testid="setActiveStore" onClick={() => setActiveStore(storeMock)}>Set Active Store</button>
        <button data-testid="setAllStores" onClick={() => setAllStores([storeMock])}>Set All Stores</button>
        <button data-testid="setFavoriteStores" onClick={() => setFavoriteStores([storeMock])}>Set Favorite Stores</button>
        <button data-testid="setCenter" onClick={() => setCenter({ lat: 1, lng: 1 })}>Set Center</button>
        <button data-testid="setZoom" onClick={() => setZoom(1)}>Set Zoom</button>
      </div>
    </div >
  );
}

describe("MapStoresProvider", () => {

  let component = render(<TestComponent />, { wrapper: MapStoresProvider });

  beforeEach(async () => {
    cleanup()
    component = render(<TestComponent />, { wrapper: MapStoresProvider });
  })

  it("should provides expected MapStoresContext to child elements", () => {
    const { getByTestId, queryByTestId } = component

    expect(queryByTestId('address')).not.toBeInTheDocument()
    expect(getByTestId("allStores")).toHaveTextContent("All Stores Length: 0");
    expect(getByTestId("favoriteStores")).toHaveTextContent("Favorite Stores Length: 0");
    expect(getByTestId("center")).toHaveTextContent(`center: 0 - 0`);
    expect(getByTestId("zoom")).toHaveTextContent("zoom: 12");
  })

  it('should add favorite store', () => {
    const { getByTestId, rerender } = component

    expect(getByTestId("favoriteStores")).toHaveTextContent("Favorite Stores Length: 0");

    act(() => getByTestId("addFavorite").click())
    rerender(<TestComponent />)

    expect(getByTestId("favoriteStores")).toHaveTextContent("Favorite Stores Length: 1");
  })

  it("should remove favorite store", () => {
    const { getByTestId, rerender } = component

    act(() => getByTestId("addFavorite").click())
    rerender(<TestComponent />)

    expect(getByTestId("favoriteStores")).toHaveTextContent("Favorite Stores Length: 1");

    act(() => getByTestId("removeFavorite").click())
    rerender(<TestComponent />)

    expect(getByTestId("favoriteStores")).toHaveTextContent("Favorite Stores Length: 0");
  })

  it("should set an activeStore after click", () => {
    const { getByTestId, rerender } = component
    act(() => getByTestId("setActiveStore").click())

    rerender(<TestComponent />)

    expect(screen.getByTestId("address")).toHaveTextContent(`Address: ${storeMock.address}`);
    expect(screen.getByTestId("coords")).toHaveTextContent(`lat: ${storeMock.coords.lat} - lng: ${storeMock.coords.lng}`);
    expect(screen.getByTestId("id")).toHaveTextContent(`id: ${storeMock.id}`);
    expect(screen.getByTestId("name")).toHaveTextContent(`name: ${storeMock.name}`);
    expect(screen.getByTestId("isFavorite")).toHaveTextContent(`isFavorite: ${storeMock.isFavorite ? 'true' : 'false'}`);
  });

  it("should set allStores after click", () => {
    const { getByTestId, rerender } = component
    act(() => getByTestId("setAllStores").click())

    rerender(<TestComponent />)

    expect(getByTestId("allStores")).toHaveTextContent("All Stores Length: 1");
  })

  it("should set favoriteStores after click", () => {
    const { getByTestId, rerender } = component
    act(() => getByTestId("setFavoriteStores").click())

    rerender(<TestComponent />)

    expect(getByTestId("favoriteStores")).toHaveTextContent("Favorite Stores Length: 1");
  })

  it("should set center after click", () => {
    const { getByTestId, rerender } = component
    act(() => getByTestId("setCenter").click())

    rerender(<TestComponent />)

    expect(getByTestId("center")).toHaveTextContent(`center: 1 - 1`);
  })

  it("should set zoom after click", () => {
    const { getByTestId, rerender } = component
    act(() => getByTestId("setZoom").click())

    rerender(<TestComponent />)

    expect(getByTestId("zoom")).toHaveTextContent("zoom: 1");
  })

})