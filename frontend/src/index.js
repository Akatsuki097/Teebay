import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import App from './App';
import ReactDOM from 'react-dom/client';  

const container = document.getElementById('root');
// Create a root.
const root = ReactDOM.createRoot(container);

// Then use root.render, NOT ReactDOM.render
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);