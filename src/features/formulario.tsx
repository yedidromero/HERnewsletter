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
          <ListItem button component={RouterLink} to="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="Entries" />
          </ListItem>
          <ListItem button component={RouterLink} to="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="NFTs" />
          </ListItem>
        </List>

        {/* Segundo List en la parte media */}
        <List style={{ flexGrow: 0, flexShrink: 0 }}>
          <ListItem button component={RouterLink} to="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="Tokens" />
          </ListItem>
          <ListItem button component={RouterLink} to="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>

        {/* Tercer List en la parte inferior */}
        <List>
          <ListItem button component={RouterLink} to="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={iconStyle}>
  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>
            <ListItemText primary="Profile" />
          </ListItem>
          {}
          <ListItem button component={RouterLink} to="">
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

  // Occupation, Categories, Searching for, Region, and Age state variables
  const [occupation, setOccupation] = useState('');
  const [category, setCategory] = useState('');
  const [searchingFor, setSearchingFor] = useState('');
  const [region, setRegion] = useState('');
  const [age, setAge] = useState('');

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

  const handleOccupationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOccupation(event.target.value as string);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const handleSearchingForChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchingFor(event.target.value as string);
  };

  const handleRegionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRegion(event.target.value as string);
  };

  const handleAgeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
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
              <h3 id="colortituloP" >Protocols </h3></a>

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
              <Button id="btn-color-wallet"  variant="contained" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </Toolbar>
          </AppBar>

          {/* Side menu */}
          <SideMenu />

          {/* First Box to create a Protected Data */}
          <h2 id="colortitulo2" >Protect your data </h2>
          <Box id="form-box">
            

            <div style={{ margin: '27px',}}>
      <table style={{ fontFamily: 'Arial', fontWeight: '600', color: 'gray' }}>
        <tbody>
          <tr>
            <td>Name</td>
            <td  className="second-column">
              <TextField
                fullWidth
                id="name"
                label=""
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                sx={{ mt: 3 }}
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <TextField
                required
                fullWidth
                id="email"
                label=""
                variant="outlined"
                sx={{ mt: 3 }}
                value={email}
                onChange={handleEmailChange}
                type="email"
                error={!isValidEmail}
                helperText={!isValidEmail && 'Please enter a valid email address'}
              />
            </td>
          </tr>
          <tr>
            <td>Occupation</td>
            <td>
              <Select
                fullWidth
                id="occupation"
                value={occupation}
                onChange={handleOccupationChange}
                label="Occupation"
                variant="outlined"
                sx={{ mt: 3 }}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Occupation
                </MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="I'm working full time">I'm working full time</MenuItem>
                <MenuItem value="I'm working part-time">I'm working part-time</MenuItem>
                <MenuItem value="Founder">Founder</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Categories</td>
            <td>
              <Select
                fullWidth
                id="category"
                value={category}
                onChange={handleCategoryChange}
                label="Categories"
                variant="outlined"
                sx={{ mt: 3 }}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Categories
                </MenuItem>
                <MenuItem value="Development">Development</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Human Talent">Human Talent</MenuItem>
                <MenuItem value="PMP">PMP</MenuItem>
                <MenuItem value="Founder">Founder</MenuItem>
                <MenuItem value="Invest">Invest</MenuItem>
                <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                <MenuItem value="Legal">Legal</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Searching for</td>
            <td>
              <Select
                fullWidth
                id="searchingFor"
                value={searchingFor}
                onChange={handleSearchingForChange}
                label="Searching for"
                variant="outlined"
                sx={{ mt: 3 }}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Searching for
                </MenuItem>
                <MenuItem value="Full time job">Full time job</MenuItem>
                <MenuItem value="Part time job">Part time job</MenuItem>
                <MenuItem value="Founder">Founder</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
                <MenuItem value="Not looking">Not looking</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Region</td>
            <td>
              <Select
                fullWidth
                id="region"
                value={region}
                onChange={handleRegionChange}
                label="Region"
                variant="outlined"
                sx={{ mt: 3 }}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Region
                </MenuItem>
                <MenuItem value="Latam">Latam</MenuItem>
                <MenuItem value="North America">North America</MenuItem>
                <MenuItem value="Europa">Europa</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="West-Africa">West-Africa</MenuItem>
                <MenuItem value="East-Africa">East-Africa</MenuItem>
              </Select>
            </td>
          </tr>
          <tr>
            <td>Age</td>
            <td>
              <Select
                fullWidth
                id="age"
                value={age}
                onChange={handleAgeChange}
                label="Age"
                variant="outlined"
                sx={{ mt: 3 }}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Age
                </MenuItem>
                <MenuItem value="&lt;18">&lt;18</MenuItem>
                <MenuItem value="18-25">18-25</MenuItem>
                <MenuItem value="26-35">26-35</MenuItem>
                <MenuItem value="36-45">36-45</MenuItem>
                <MenuItem value="46-53">46-53</MenuItem>
                <MenuItem value="&gt;53">&gt;53</MenuItem>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>



            {errorProtect && (
              <Alert sx={{ mt: 3, mb: 2 }} severity="error">
                <Typography variant="h6"> Creation failed </Typography>
                {errorProtect}
              </Alert>
            )}
            {!loadingProtect && (
              <Button id="btn-color-wallet2"
                onClick={protectedDataSubmit}
                variant="contained"
              >
                Create
              </Button>
            )}
            {protectedData && !errorProtect && (
              <Alert sx={{ mt: 3, mb: 2, background: '#B8B8DF' }} severity="success">
                <Typography id="head6">
                  Your data has been protected!
                </Typography>
                <Link
                  href={IEXEC_EXPLORER_URL + protectedData}
                  target="_blank"
                  sx={{ color: 'red', textDecorationColor: 'green' }}
                >
                  You can reach it here
                </Link>
                <p>Your protected data address: {protectedData}</p>
              </Alert>
            )}
            {loadingProtect && (
              <CircularProgress
                sx={{ display: 'block', margin: '20px auto',  color: 'black' }}
              ></CircularProgress>
            )}
          </Box>

          {/* Second Box to grant access to a Protected Data */}
          {protectedData && (
            <Box id="form-box">
              <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                Grant Access for your protected data
              </Typography>
              <TextField
                required
                fullWidth
                label="Data Address"
                variant="outlined"
                sx={{ mt: 3 }}
                value={protectedData}
                onChange={handleProtectedDataChange}
                type="text"
              />
              <TextField
                fullWidth
                type="number"
                id="age"
                label="Access Number"
                variant="outlined"
                value={accessNumber}
                InputProps={{ inputProps: { min: 1 } }}
                onChange={handleAccessNumberChange}
                sx={{ mt: 3 }}
              />
              <TextField
                fullWidth
                id="authorizedUser"
                label="User Address Restricted"
                variant="outlined"
                sx={{ mt: 3 }}
                value={authorizedUser}
                onChange={authorizedUserChange}
                type="text"
              />
              {!loadingGrant && (
                <Button id="btn-color-wallet2"
                  
                  onClick={grantAccessSubmit}
                  variant="contained"
                >
                  Grant Access
                </Button>
              )}
              {errorGrant && (
                <Alert sx={{ mt: 3, mb: 2 }} severity="error">
                  <Typography variant="h6"> Grant Access failed </Typography>
                  {errorGrant}
                </Alert>
              )}
              {grantAccess && !errorGrant && (
                <>
                  <Alert sx={{ mt: 3, mb: 2, background: '#B8B8DF' }} severity="success">
                    <Typography id="head6">
                      Your access has been granted !
                    </Typography>
                  </Alert>
                </>
              )}
              {loadingGrant && (
                <CircularProgress id="spacingStyle"></CircularProgress>
              )}
            </Box>
          )}

          {/* Third Box to revoke the access given to a Protected Data*/}
          {grantAccess && (
            <Box id="form-box">
              <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                Revoke Access For Your data
              </Typography>
              <TextField
                required
                fullWidth
                id="dataorderAddresssetAddress"
                label="Data Address"
                variant="outlined"
                sx={{ mt: 3 }}
                value={protectedData}
                onChange={handleProtectedDataChange}
                type="text"
              />
              {!loadingRevoke && (
                <Button
                id="btn-color-wallet2"
                  onClick={revokeAccessSubmit}
                  variant="contained"
                >
                  Revoke Access
                </Button>
              )}
              {loadingRevoke && (
                <CircularProgress id="spacingStyle"></CircularProgress>
              )}
              {revokeAccess && !errorRevoke && (
                <>
                  <Alert sx={{ mt: 3, mb: 2 }} severity="success">
                    <Typography variant="h6">
                      You have successfully revoked access!
                    </Typography>
                  </Alert>
                </>
              )}
              {errorRevoke && (
                <Alert sx={{ mt: 3, mb: 2 }} severity="error">
                  <Typography variant="h6"> Revoke Access failed </Typography>
                  {errorRevoke}
                </Alert>
              )}
            </Box>
          )}
        </>
      ) : (
        <Connect />
      )}
    </Container>
  );
}