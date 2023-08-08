import { useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Link,
  Box,
  AppBar,
  Toolbar,
  Container,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid, // Importamos el componente Grid de Material-UI
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  protectDataFunc,
  grantAccessFunc,
  revokeAccessFunc,
} from './protectDataFunc';
import Connect from './Connect';
import { useAccount, useDisconnect } from 'wagmi';
import { IEXEC_EXPLORER_URL } from '../utils/config';
import { DataSchema, GrantedAccess } from '@iexec/dataprotector';

const Front = () => {
//web3mail dapp END
const WEB3MAIL_APP_ENS = 'web3mail.apps.iexec.eth';
//connection with wallet
const { address, isConnected } = useAccount();
const { disconnect } = useDisconnect();

//loading effect & error
const [loadingProtect, setLoadingProtect] = useState(false);
const [errorProtect, setErrorProtect] = useState('');
const [loadingGrant, setLoadingGrant] = useState(false);
const [errorGrant, setErrorGrant] = useState('');
const [loadingRevoke, setLoadingRevoke] = useState(false);
const [errorRevoke, setErrorRevoke] = useState('');

//global state
const [protectedData, setProtectedData] = useState('');
const [grantAccess, setGrantAccess] = useState<GrantedAccess>();
const [revokeAccess, setRevokeAccess] = useState('');

//set name
const [name, setName] = useState('');

//set email
const [email, setEmail] = useState('');
const [isValidEmail, setIsValidEmail] = useState(true);

//set access number
const [accessNumber, setAccessNumber] = useState<number>(1);

//set user restricted address
const [authorizedUser, setAuthorizedUser] = useState('');

// Occupation, Categories, Searching for, Region, and Age state variables
const [occupation, setOccupation] = useState('');
const [category, setCategory] = useState('');
const [searchingFor, setSearchingFor] = useState('');
const [region, setRegion] = useState('');
const [age, setAge] = useState('');

//handle functions
// ... (omitiendo la parte que ya has proporcionado)

const shortAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4);
};

const [showConnectPopup, setShowConnectPopup] = useState(false);

const handleConnect = async () => {
  try {
    // Verificar si ya está conectado antes de intentar conectar nuevamente.
    if (!isConnected) {
      // Aquí implementas la lógica para conectar con la billetera (por ejemplo, con Metamask).
      // Puedes usar el hook useAccount y otros métodos proporcionados por la biblioteca 'wagmi'
      // para realizar la conexión.
      // Ejemplo:
      await connectWithWallet(); // Función para conectar con la billetera
    }
  } catch (error) {
    console.error('Error al conectar con la billetera:', error);
  }
};

return (
  <Container disableGutters>
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent', width: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo en el lado izquierdo */}
        <img
          src="https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda95c68e-65aa-496d-bc5d-605dafe241b9_4168x4168.jpeg"
          alt="Logo"
          style={{ width: '100px', height: '100px', marginRight: '8px' }}
          className="mr-auto"
        />
          <h3 id="colortitulo" >Protocols </h3>

        {/* Contenido del menú en el lado derecho */}
        {isConnected ? (
          <>
            <Button id="btn-color-wallet"  variant="contained" onClick={() => disconnect()}>
              Disconnect wallet
            </Button>
            <Box mr={2}>
              <Button  id="btn-color-wallet" variant="contained">
                {shortAddress(address as string)}
              </Button>
            </Box>
          </>
        ) : (
          <Button  id="btn-color-wallet" variant="contained" onClick={() => setShowConnectPopup(true)}>
            Connect wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>

    <Box
      display="flex"
      flexDirection="column" // Alineamos el contenido verticalmente
      justifyContent="center" // Centramos el contenido horizontalmente
      alignItems="center" // Alineamos el contenido verticalmente
      height="80vh" // Ocupa el 100% del viewport verticalmente
      overflow="hidden" // Ocultamos el desbordamiento
    >

      {/* Texto en 3 columnas */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          {/* Título en color rosa */}
          <Typography variant="h2" id="titulo" sx={{ mt: 2 }}>
          HER news houses´s
          </Typography>
          <Typography variant="body1"  sx={{ mt: 2 , fontSize: '1.6rem',fontWeight: '500',color: '#737373' }}>
          The perfect intersection between trends, inspiration, and monetization opportunities from H.E.R. DAO Latam
          </Typography>
          {/* Botones */}
          <Box mt={2} display="flex" justifyContent="space-between" width="76%">
            <Button variant="contained" id="btn-color" component={RouterLink} to="Front" sx={{ bgcolor: '#DBDBEF', borderRadius: '20px',color: '#DA077C' }}>
              Get Started
            </Button>
            <Button variant="contained" id="btn-color" component={RouterLink} to="/pagina-generica" sx={{ bgcolor: '#DBDBEF', borderRadius: '20px',color: '#DA077C' }}>
              Learn Mores
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* Contenido en la segunda columna */}
          
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* Contenido en la tercera columna */}
           {/* imagen index */}
        <img
          src="https://desarrollo-de-sitios-web.com/img/index.jpg"
          alt="index"
          style={{ width: 'auto', height: '500px', marginRight: '8px' }}
          className="mr-auto"
        />
        </Grid>
      </Grid>

      {/* Ventana emergente para conectar con la billetera */}
      {showConnectPopup && (
        <Connect onClose={() => setShowConnectPopup(false)} />
      )}




      
    </Box>
  </Container>
);
};

export default Front;
