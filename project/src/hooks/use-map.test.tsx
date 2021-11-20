import { renderHook } from '@testing-library/react-hooks';
import { MutableRefObject } from 'react';
import useMap from './use-map';
import { locations } from '../const';
import { Map } from 'leaflet';

describe('Hook: useMap', () => {
  const mockMapRef: MutableRefObject<HTMLElement | null> = {
    current: document.createElement('div'),
  };

  it('should return map', () => {
    const { result } = renderHook(() => useMap(mockMapRef, locations[0]));

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});
