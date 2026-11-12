declare module 'react-i18next' {
  import { ReactNode } from 'react';

  interface UseTranslationHandler {
    (options?: any): {
      t: (key: string, options?: any) => string;
      i18n: any;
    };
  }

  const useTranslation: UseTranslationHandler;
  
  export { useTranslation };
  export type { UseTranslationHandler };
}
