import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the HTML colors tool', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', { name: /HTML colors/i });
  expect(linkElement).toBeInTheDocument();
});
