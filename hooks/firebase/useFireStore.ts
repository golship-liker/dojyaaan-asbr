import { initializeFirestore } from 'firebase/firestore';
import { useMemo } from 'react';
import { useFirebaseApp } from 'reactfire';

export function useFirestore() {
  const app = useFirebaseApp();
  return useMemo(() => initializeFirestore(app, {}), [app]);
}
