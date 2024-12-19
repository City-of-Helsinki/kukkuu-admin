import { useContext } from 'react';

import type { TranslatableContextType } from '../contexts/TranslatableContext';
import TranslatableContext from '../contexts/TranslatableContext';

export default function useTranslatableContext() {
  return useContext<TranslatableContextType>(TranslatableContext);
}
