import React from 'react';
import { InputSearch } from '../../src/components/Form';
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

const onChangeMock = jest.fn();

const TestComponent = () => {
  return (
    <InputSearch onChange={onChangeMock} />
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

    await user.type(screen.getByRole('searchbox'), wordToSearch);
    expect(getByRole('searchbox')).toHaveValue(wordToSearch);

    expect(onChangeMock).toBeCalledTimes(4);
    expect(onChangeMock).toBeCalledWith(wordToSearch);
  });
});