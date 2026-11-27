import { describe, expect, it } from 'vitest';

import reducer, { closeModal, openModal } from './ui';

describe('ui modal', () => {
  it('keeps the type on close so the content can animate out', () => {
    const opened = reducer(undefined, openModal('project-info'));
    const closed = reducer(opened, closeModal());

    expect(closed.modal).toEqual({ open: false, type: 'project-info' });
  });
});
