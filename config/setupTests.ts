/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';

// Ensure React is available for hooks in test environment
if (typeof globalThis !== 'undefined') {
  (globalThis as unknown as { React: typeof React }).React = React;
}
