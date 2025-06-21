import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import App from './App';
import ReactDOM from 'react-dom/client';  
import './index.css';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);