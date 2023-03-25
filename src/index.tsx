import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './auth0-provider-with-navigate';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider theme={theme} resetCSS>
        <BrowserRouter>
          <Auth0ProviderWithNavigate>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </Auth0ProviderWithNavigate>
        </BrowserRouter>
      </ChakraProvider>
    </DndProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
