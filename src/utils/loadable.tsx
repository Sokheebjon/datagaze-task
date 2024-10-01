import React, { lazy, ReactNode, Suspense } from 'react';
import i18next from "i18next";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const loadable = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  { fallback = null }: { fallback: ReactNode | null } = { fallback: <p>{i18next.t("loading")}</p> },
) => {
  const LazyComponent = lazy(importFunc);

  return (props: any) => (
    <>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </>
  );
};

export default loadable;
