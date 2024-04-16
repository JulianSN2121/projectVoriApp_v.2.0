import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DiscoverScreen from '../screens/DiscoverScreen';

// Mock für die navigation-Prop
const navigationMock = {
  navigate: jest.fn(),
};

describe('DiscoverScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<DiscoverScreen navigation={navigationMock} />);
    expect(getByText('Entdecke Vorarlberg')).toBeTruthy();
  });
});