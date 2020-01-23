import React from 'react';
import { Admin } from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest';

const App: React.FC = () => <Admin dataProvider={fakeDataProvider({})} />;

export default App;
