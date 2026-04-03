import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/trpc';
import Test from './components/Test';
 
 function App() {
  return (
    <QueryClientProvider client={queryClient}>
     
      <Test/>
    </QueryClientProvider>
  );
}

export default App