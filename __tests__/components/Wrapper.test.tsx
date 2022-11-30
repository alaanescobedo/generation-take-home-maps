import React from 'react';
import { Wrapper, Status } from '../../src/components/Map';
import { act, cleanup, render, waitFor, screen } from '@testing-library/react'

const TestComponent = ({ apiKey, render }: { apiKey: string, render: (status: Status) => React.ReactElement }) => {
  return (
    <Wrapper apiKey={apiKey} render={render} >
      <div>Test</div>
    </Wrapper>
  );
}

const testRender = (status: Status) => {
  return <div data-testid="render-status">{status}</div>
}
const TEST_API_KEY = 'test-api-key';

// readn spy script onload with jest.fn()
const scriptSpy = jest.fn();
const createScriptSpy = jest.spyOn(require('../../src/utils/create-scripts'), 'createScript').mockImplementation(() => ({ onload: scriptSpy }));

describe('Wrapper', () => {

  let component: ReturnType<typeof render>;

  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
    component = render(<TestComponent apiKey={TEST_API_KEY} render={testRender} />);
  });

  it('should render children', async () => {
    const { getByText, rerender } = component
    const script = createScriptSpy.mock.results[0].value;

    await waitFor(async () => {
      act(() => script.onload());
      rerender(<TestComponent apiKey={TEST_API_KEY} render={testRender} />);
      expect(getByText('Test')).toBeInTheDocument();
    });
  });

  it('should call createScript with apiKey', async () => {
    await waitFor(() => {
      expect(createScriptSpy).toHaveBeenCalledWith({ apiKey: TEST_API_KEY });
    });
  });

  it('should call createScript 1 time', async () => {
    await waitFor(() => {
      expect(createScriptSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should render loading status', () => {
    const { getByTestId } = component
    expect(getByTestId('render-status')).toHaveTextContent(Status.LOADING);
  });



});