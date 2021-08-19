/**
 * Custom hook that simulates componentWillMount lifecycle on
 * functional components
 */

import { useRef } from 'react';

export const useWillMount = (func: () => void) => {
  const willMount = useRef(true);

  if (willMount.current) {
    func();
  }

  willMount.current = false;
};
