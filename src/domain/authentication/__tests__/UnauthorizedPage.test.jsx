import { render, screen, waitFor } from '@testing-library/react';
import { AdminContext, useLogout } from 'react-admin';

import i18nProvider from '../../../common/translation/i18nProvider';
import UnauthorizedPage from '../UnauthorizedPage';
import authorizationService from '../authorizationService';

// Mock the dependencies
vi.mock('react-admin', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLogout: vi.fn(),
  };
});

// Mock InfoPageTemplate
vi.mock('./InfoPageTemplate', () => ({
  __esModule: true,
  default: ({ title, content }) => (
    <div data-testid="info-page-template">
      <div data-testid="info-page-title">{title}</div>
      <div data-testid="info-page-content">{content}</div>
    </div>
  ),
}));

describe('UnauthorizedPage', () => {
  const renderUnauthorizedPage = () =>
    render(
      <AdminContext i18nProvider={i18nProvider}>
        <UnauthorizedPage />
      </AdminContext>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the UnauthorizedPage with correct content', () => {
    useLogout.mockReturnValue(vi.fn());

    renderUnauthorizedPage();

    expect(screen.getByText('Ei käyttöoikeutta')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Käyttäjätunnuksellasi ei ole käyttöoikeutta Kulttuurin kummilapset -palvelun ylläpitoon\./
      )
    ).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      'mailto:kulttuurin.kummilapset@hel.fi'
    );
    expect(link).toHaveTextContent('kulttuurin.kummilapset@hel.fi');

    expect(
      screen.getByRole('button', { name: 'Kirjaudu ulos' })
    ).toBeInTheDocument();
  });

  it('calls logout when the logout button is clicked', async () => {
    const mockLogout = vi.fn().mockResolvedValue(undefined);
    useLogout.mockReturnValue(mockLogout);

    renderUnauthorizedPage();

    const logoutButton = screen.getByRole('button', { name: 'Kirjaudu ulos' });
    logoutButton.click();

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  it('renders specific title and content when unauthorizedReason is no_organisation', () => {
    vi.spyOn(authorizationService, 'getUnauthorizedReason').mockReturnValue(
      'no_organisation'
    );
    useLogout.mockReturnValue(vi.fn());

    renderUnauthorizedPage();

    expect(screen.getByText('Ei organisaatiota')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Käyttäjätunnuksellesi ei ole määritetty organisaatiota\./
      )
    ).toBeInTheDocument();
  });
});
