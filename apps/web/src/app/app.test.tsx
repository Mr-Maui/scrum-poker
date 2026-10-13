import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { expect, it } from 'vitest';

import { App } from './app';
import { AppProviders } from './providers';

function renderRoute(path = '/') {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </AppProviders>,
  );
}

it('prevents creating or joining a room while no service is connected', () => {
  renderRoute();
  expect(screen.getByRole('button', { name: /create a room/i })).toBeDisabled();
  expect(screen.getByRole('button', { name: /join a room/i })).toBeDisabled();
  expect(screen.getByLabelText('Room invitation')).toBeDisabled();
  expect(screen.getByRole('status')).toHaveTextContent(
    'The room service is not connected',
  );
});

it('navigates into an explicitly labeled preview with voting disabled', async () => {
  const user = userEvent.setup();
  renderRoute();
  await user.click(
    screen.getByRole('link', { name: /explore the room layout/i }),
  );
  expect(
    screen.getByRole('heading', { name: 'A space for your team.' }),
  ).toBeInTheDocument();
  expect(
    screen.getByText('Explore the layout. This preview is not a live room.'),
  ).toBeInTheDocument();
  for (const button of screen.getAllByRole('button'))
    expect(button).toBeDisabled();
  await user.click(screen.getByRole('link', { name: /back to home/i }));
  expect(
    screen.getByRole('button', { name: /create a room/i }),
  ).toBeInTheDocument();
});

it('does not claim an arbitrary room exists or show another participant’s data', () => {
  renderRoute('/rooms/unknown-room');
  expect(
    screen.getByRole('heading', { name: 'Room service unavailable' }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      'Participants and voting status will appear once connected.',
    ),
  ).toBeInTheDocument();
  expect(screen.queryByText('LAYOUT PREVIEW')).not.toBeInTheDocument();
});

it('offers a way home from an unknown route', async () => {
  const user = userEvent.setup();
  renderRoute('/unknown');
  expect(
    screen.getByRole('heading', { name: 'Page not found' }),
  ).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: /back to home/i }));
  expect(
    screen.getByRole('button', { name: /create a room/i }),
  ).toBeInTheDocument();
});
