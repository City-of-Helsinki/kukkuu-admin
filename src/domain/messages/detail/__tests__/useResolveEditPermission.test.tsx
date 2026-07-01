import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import * as ReactAdmin from 'react-admin';

import { useResolveEditPermission } from '../MessageDetailsToolbar';
import projectService from '../../../projects/projectService';

const CURRENT_PROJECT_ID = 'project-1';

const buildMessage = (overrides: Record<string, any> = {}) => ({
  id: 'message-1',
  recipientSelection: 'ENROLLED',
  project: { id: CURRENT_PROJECT_ID },
  ...overrides,
});

const buildPermissions = ({
  canSendToAll = false,
}: { canSendToAll?: boolean } = {}) => ({
  canSendMessagesToAllRecipientsWithinProject: () => canSendToAll,
});

describe('useResolveEditPermission', () => {
  beforeEach(() => {
    projectService.projectId = CURRENT_PROJECT_ID;
  });

  afterEach(() => {
    projectService.clear();
    vi.restoreAllMocks();
  });

  it('returns hasEditPermission=false when there is no record', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(undefined);
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions(),
      isLoading: false,
    } as any);

    const { result } = renderHook(() => useResolveEditPermission());

    expect(result.current.hasEditPermission).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('returns hasEditPermission=false when the message belongs to a different project', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage({ project: { id: 'other-project' } }) as any
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions({ canSendToAll: true }),
      isLoading: false,
    } as any);

    const { result } = renderHook(() => useResolveEditPermission());

    expect(result.current.hasEditPermission).toBe(false);
  });

  it('returns hasEditPermission=false for an ALL-recipient message when the user lacks the ALL permission', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage({ recipientSelection: 'ALL' }) as any
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions({ canSendToAll: false }),
      isLoading: false,
    } as any);

    const { result } = renderHook(() => useResolveEditPermission());

    expect(result.current.hasEditPermission).toBe(false);
  });

  it('returns hasEditPermission=true for an ALL-recipient message when the user has the ALL permission', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage({ recipientSelection: 'ALL' }) as any
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions({ canSendToAll: true }),
      isLoading: false,
    } as any);

    const { result } = renderHook(() => useResolveEditPermission());

    expect(result.current.hasEditPermission).toBe(true);
  });

  it('returns hasEditPermission=true for a non-ALL recipient in the current project', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage({ recipientSelection: 'ENROLLED' }) as any
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions({ canSendToAll: false }),
      isLoading: false,
    } as any);

    const { result } = renderHook(() => useResolveEditPermission());

    expect(result.current.hasEditPermission).toBe(true);
  });

  it('passes through the isLoading flag from usePermissions', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage() as any
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: undefined,
      isLoading: true,
    } as any);

    const { result } = renderHook(() => useResolveEditPermission());

    expect(result.current.isLoading).toBe(true);
  });
});
