import { useContext } from 'react';

import TranslatableContext from '../contexts/TranslatableContext';

export default function useTranslatableContext() {
  return useContext(TranslatableContext);
}
