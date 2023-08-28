/*const PaginaGenerica = ()=>{
    return (
        <div><label>Text</label></div>
    )
}

export default PaginaGenerica;*/

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
  Drawer, // Agregamos el componente Drawer de Material-UI para el menú lateral
  List,
  ListItem,
  ListItemText,
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



const SideMenu = () => {
  const iconStyle = {
    fill: 'gray',
    marginRight: '8px',
    width: '16px',
    height: '16px',
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Primer List en la parte superior */}
        <List style={{ flexGrow: 0, flexShrink: 0 }}>
          <ListItem button component={RouterLink} to="/recordeddata">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="Entries" />
          </ListItem>
          <ListItem button component={RouterLink} to="/recordeddata">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="NFTs" />
          </ListItem>
        </List>

        {/* Segundo List en la parte media */}
        <List style={{ flexGrow: 0, flexShrink: 0 }}>
          <ListItem button component={RouterLink} to="/recordeddata">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="Tokens" />
          </ListItem>
          <ListItem button component={RouterLink} to="/recordeddata">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>

        {/* Tercer List en la parte inferior */}
        <List>
          <ListItem button component={RouterLink} to="/recordeddata">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>
            <ListItemText primary="Profile" />
          </ListItem>
          {}
          <ListItem button component={RouterLink} to="/recordeddata">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="Support" />
          </ListItem>
        </List>

        {/* Logo en la parte inferior */}
        <List style={{ flexGrow: 1, flexShrink: 0, marginTop:'20vh' }}>
          <ListItem button component={RouterLink} to="/">
            <img src="https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda95c68e-65aa-496d-bc5d-605dafe241b9_4168x4168.jpeg" alt="Logo" style={{ width: '100px', height: '100px', marginRight: '8px' }} />
            <ListItemText primary="" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default function Front() {
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



  //handle functions
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
    setIsValidEmail(event.target.validity.valid);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleProtectedDataChange = (event: any) => {
    setProtectedData(event.target.value);
  };

  const handleAccessNumberChange = (event: any) => {
    setAccessNumber(event.target.value);
  };

  const authorizedUserChange = (event: any) => {
    setAuthorizedUser(event.target.value);
  };

 
  //wallet address shortening
  const shortAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  //handle Submit
  const protectedDataSubmit = async () => {
    setErrorProtect('');
    if (email) {
      const data: DataSchema = { email: email } as DataSchema;
      try {
        setLoadingProtect(true);
        const ProtectedDataAddress = await protectDataFunc(data, name);
        setProtectedData(ProtectedDataAddress);
        setErrorProtect('');
      } catch (error) {
        setErrorProtect(String(error));
      }
      setLoadingProtect(false);
    } else {
      setErrorProtect('Please enter a valid email address');
    }
  };

  const grantAccessSubmit = async () => {
    setErrorGrant('');
    try {
      setAuthorizedUser(authorizedUser);
      setLoadingGrant(true);
      const accessHash = await grantAccessFunc(
        protectedData,
        authorizedUser,
        WEB3MAIL_APP_ENS,
        accessNumber
      );
      setErrorGrant('');
      setGrantAccess(accessHash);
    } catch (error) {
      setErrorGrant(String(error));
      setGrantAccess(undefined);
    }
    setLoadingGrant(false);
  };

  const revokeAccessSubmit = async () => {
    setRevokeAccess('');
    try {
      setLoadingRevoke(true);
      const tx = await revokeAccessFunc(
        protectedData,
        authorizedUser,
        WEB3MAIL_APP_ENS
      );
      setRevokeAccess(tx);
    } catch (error) {
      setErrorRevoke(String(error));
      setRevokeAccess('');
    }
    setLoadingRevoke(false);
  };

  return (
    <Container disableGutters>
      {isConnected ? (
        <>
          {/* App bar for wallet connection */}
          <AppBar
            position="static"
            elevation={0}
            sx={{ backgroundColor: 'transparent', width: '100%' }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              {/* Side menu */}
              <SideMenu />
              <a href="https://web3mail.iex.ec/protectedData" target="_blank">
              <h3 id="colortitulo" style={{ textAlign: 'center' }}>Protocols </h3></a>
              
              <Typography
                sx={{
                  flexGrow: 1,
                  textAlign: 'right',
                  mr: 2,
                  fontStyle: 'italic',
                }}
              >
                {shortAddress(address as string)}
              </Typography>
              <Button id="btn-color-wallet" variant="contained" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </Toolbar>
          </AppBar>

          {/* Side menu */}
          <SideMenu />

         {/* Sección para datos */}

         <h2 id="colortitulo2" >Please select the category you are interested in </h2>
      {/* Nueva sección con 3 columnas */}
      <div id='newsletter' style={{  justifyContent: 'space-between', margin: '20px 70px',display: 'flow-root' }}>
        
          

        <div className="col">
      {/* Primera fila de botones */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', width: '88%', marginLeft:'6%' }}>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Development
        </Button>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Marketing
        </Button>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Human Talent
        </Button>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Infraestructure
        </Button>
      </div>
      {/* Segunda fila de botones */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', width: '76%', marginLeft:'11%' }}>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Freelance
        </Button>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Finance
        </Button>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Founder
        </Button>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Invest
        </Button>
        <Button variant="contained" id="btn-color" component={RouterLink} to="/formulario" style={{ backgroundColor: '#DBDBEF', borderRadius: '20px', color: '#DA077C' }}>
          Legal
        </Button>
      </div>
    </div>
      </div>
      {/* seccion entries */}
              
       
       <div>
 
</div>

<h2 id="colortitulo2" >Send web3 email </h2>
<div  id='entries' style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 70px' }}>
        <div style={{ flex: 1, marginRight: '20px',textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mt: 1 , fontSize: '1.6rem',fontWeight: '600', fontFamily: 'sans-serif', color: '#737373' }}>Send to:</Typography>
        <Typography variant="body1" sx={{ mt: 1 , fontSize: '1.6rem',fontWeight: '600', fontFamily: 'sans-serif', color: '#737373' }}>Subject</Typography>
        <Typography variant="body1" sx={{ mt: 1 , fontSize: '1.6rem',fontWeight: '600', fontFamily: 'sans-serif', color: '#737373' }}>Message (includes Call to Action)</Typography>
     
        </div>
       </div>           
       
       <div></div>


    </>
      ) : (
        <Connect />
      )}
    </Container>
  );
}

