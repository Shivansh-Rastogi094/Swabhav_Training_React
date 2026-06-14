import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TechNova directory title', () => {
  render(<App />);
  const headingElement = screen.getByText(/TechNova — Team Directory/i);
  expect(headingElement).toBeInTheDocument();
});
