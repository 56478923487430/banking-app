import Navigation from './navigation/Navigation';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => (
  <AppProvider>
    <Navigation />
  </AppProvider>
);

export default App;
