import { useContext } from 'react';

import TranslatableContext, {
  TranslatableContextType,
} from '../contexts/TranslatableContext';

export default function useTranslatableContext() {
  return useContext<TranslatableContextType>(TranslatableContext);
}
