import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/trpc';
import AuthPage from './components/AuthPage';
 
 function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthPage/>
    </QueryClientProvider>
  );
}

export default App