import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const withRouter = (
  WrappedComponent: React.ElementType,
  routePath: string,
  initialEntries: string[] = []
) => {
  const WithRouterComponent = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          path={routePath}
          element={<WrappedComponent>{children}</WrappedComponent>}
        />
      </Routes>
    </MemoryRouter>
  );
  return WithRouterComponent;
};
