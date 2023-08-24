import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from '@web3modal/ethereum';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { bellecour } from './utils/walletConnection';
import './main.css';
import Front from './features/inicio';
import SubFront from './features/Front';
import Formulario from './features/formulario';
import Index from './features/Index';
import PaginaGenerica from './features/pagina-generica';
import NotFound from './features/Notfound';
import Newsletter from './features/newsletter';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

// material ui theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FCD15A',
      contrastText: '#1D1D24',
    },
  },
});

// Wagmi Client
if (!import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID) {
  throw new Error(
    'You need to provide a WALLET_CONNECT_PROJECT_ID env variable'
  );
}
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID!;
const chains = [bellecour];
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

// Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
          <Routes>
            <Route path='/' element={<Front />} />
            <Route path='/Front' element={<SubFront/>} />
            <Route path='/pagina-generica' element={<PaginaGenerica/>} />
            <Route path='/formulario' element={<Formulario/>} />
            <Route path='/newsletter' element={<Newsletter/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
