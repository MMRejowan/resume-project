import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders 01OS bootloader landing screen', () => {
  render(<App />);
  const bootloaderTitle = screen.getByText(/01OS BOOTLOADER/i);
  expect(bootloaderTitle).toBeInTheDocument();
  const launchButton = screen.getByText(/BOOT 01OS/i);
  expect(launchButton).toBeInTheDocument();
});

test('launches 01OS and renders C Kernel Tracer and OS frame', () => {
  render(<App />);
  const launchButton = screen.getByText(/BOOT 01OS/i);
  fireEvent.click(launchButton);
  const tracerTitle = screen.getByText(/C KERNEL RUNTIME TRACER/i);
  expect(tracerTitle).toBeInTheDocument();
});
