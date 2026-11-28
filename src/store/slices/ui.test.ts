import { describe, expect, it } from 'vitest';

import reducer, { closeLoader, closeModal, openLoader, openModal } from './ui';

describe('ui modal', () => {
  it('keeps the type on close so the content can animate out', () => {
    const opened = reducer(undefined, openModal('project-info'));
    const closed = reducer(opened, closeModal());

    expect(closed.modal).toEqual({ open: false, type: 'project-info' });
  });
});

describe('ui loader', () => {
  it('keeps the message on close so it fades out with the loader', () => {
    const opened = reducer(undefined, openLoader('Loading map...'));
    expect(reducer(opened, closeLoader()).loader).toEqual({
      open: false,
      message: 'Loading map...',
    });
  });
});
