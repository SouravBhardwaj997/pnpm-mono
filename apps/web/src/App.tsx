import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/trpc';
import AuthPage from './components/AuthPage';
import { Toaster } from "react-hot-toast"
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthPage />
      <Toaster
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App