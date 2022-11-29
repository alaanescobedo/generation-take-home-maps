import React from 'react';
import { InputSearch } from '../../src/components/Form';
import { act, cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

const onChangeMock = jest.fn();
const onLoadingMock = jest.fn();

const TestComponent = () => {
  return (
    <InputSearch
      onChange={onChangeMock}
      onLoading={onLoadingMock}
    />
  );
};

describe('InputSearch', () => {

  let component: ReturnType<typeof render>;

  beforeEach(() => {
    cleanup();
    component = render(<TestComponent />);
  });

  it('should call onChange when input changes', async () => {
    const { getByRole } = component;
    const user = userEvent.setup()

    const wordToSearch = 'test';
    const delay = 300;

    await user.type(screen.getByRole('searchbox'), wordToSearch);
    expect(getByRole('searchbox')).toHaveValue(wordToSearch);

    expect(onLoadingMock).toBeCalledTimes(wordToSearch.length);
    expect(onLoadingMock).toBeCalledWith(true);

    expect(onChangeMock).toBeCalledTimes(0);

    await new Promise(resolve => setTimeout(resolve, delay));
    expect(onChangeMock).toBeCalledTimes(1);

    expect(onChangeMock).toBeCalledWith(wordToSearch);
    expect(onLoadingMock).toBeCalledTimes(wordToSearch.length + 1);
    expect(onLoadingMock).toBeCalledWith(false);
  });
});