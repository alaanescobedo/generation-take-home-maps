import { cleanup, act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '../../src/hooks/useLocalStorage';

import { storeMock, storeMock2 } from '../mocks'

const defaultValues = storeMock

const getItemSpy = jest.spyOn(Storage.prototype, 'getItem')
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

const jsonParseSpy = jest.spyOn(JSON, 'parse')
const jsonStringifySpy = jest.spyOn(JSON, 'stringify')

describe('useLocalStorage', () => {

  beforeEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should return the default value', () => {
    const { result } = renderHook(() => useLocalStorage('key', defaultValues));
    const value = result.current[0];

    expect(value).toEqual(defaultValues);
    expect(jsonParseSpy).toBeCalledTimes(0);
    expect(getItemSpy).toBeCalledWith('key');
    expect(getItemSpy).toBeCalledTimes(1);
  });

  it('should set the value to localStorage and get the value again', () => {

    const { result } = renderHook(() => useLocalStorage('key', defaultValues));
    const setValue = result.current[1];

    act(() => setValue(storeMock2));

    const { result: result2 } = renderHook(() => useLocalStorage('key', defaultValues));

    const value = result2.current[0];
    expect(value).toEqual(storeMock2);

    expect(getItemSpy).toBeCalledTimes(2);
    expect(setItemSpy).toBeCalledTimes(1);
    expect(jsonParseSpy).toBeCalledTimes(1);
    expect(jsonStringifySpy).toBeCalledTimes(1);
  });

});