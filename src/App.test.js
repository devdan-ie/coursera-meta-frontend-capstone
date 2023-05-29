import { render, screen } from '@testing-library/react';
import App from './App';

test('check if there is a reservation test somewhere', () => {
  render(<App />);
  const title = screen.getByText(/Reservation/);
  expect(title).toBeInTheDocument();
});
