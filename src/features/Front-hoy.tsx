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
} from '@mui/material';
import { RecordedData } from './RecordedData'; // Importando el componente RecordedData
import {
  protectDataFunc,
  grantAccessFunc,
  revokeAccessFunc,
} from './protectDataFunc';
import Connect from './Connect';
import { useAccount, useDisconnect } from 'wagmi';
import { IEXEC_EXPLORER_URL } from '../utils/config';
import { DataSchema, GrantedAccess } from '@iexec/dataprotector';

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
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent', width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Enlace a recordeddata.tsx */}
          <Link href="/recordeddata" sx={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary">
              Recorded Data
            </Button>
          </Link>

          <Typography sx={{ flexGrow: 1, textAlign: 'right', mr: 2, fontStyle: 'italic' }}>
            {shortAddress(address as string)}
          </Typography>

          <Button variant="contained" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </Toolbar>
      </AppBar>

      {isConnected ? (
        <>
          {/* First Box to create a Protected Data */}
          <Box id="form-box">
            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
              Protect your data
            </Typography>

            {/* Select para la ocupación */}
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
              <MenuItem value="I'm working full time">I'm working full time</MenuItem>
              <MenuItem value="I'm working part-time">I'm working part-time</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
            </Select>

            {/* Select para Categories */}
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

            {/* Select para Searching for */}
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
              <MenuItem value="Empleo a tiempo completo">Empleo a tiempo completo</MenuItem>
              <MenuItem value="Empleo part-time">Empleo part-time</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
              <MenuItem value="Founder">Founder</MenuItem>
              <MenuItem value="Not looking">Not looking</MenuItem>
            </Select>

            {/* Select para Region */}
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
              <MenuItem value="Norteamérica">Norteamérica</MenuItem>
              <MenuItem value="Europa">Europa</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="West-Africa">West-Africa</MenuItem>
              <MenuItem value="East-Africa">East-Africa</MenuItem>
            </Select>

            {/* Select para Age */}
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

            <TextField
              fullWidth
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              sx={{ mt: 3 }}
            />

            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              sx={{ mt: 3 }}
              value={email}
              onChange={handleEmailChange}
              type="email"
              error={!isValidEmail}
              helperText={!isValidEmail && 'Please enter a valid email address'}
            />

            {errorProtect && (
              <Alert sx={{ mt: 3, mb: 2 }} severity="error">
                <Typography variant="h6"> Creation failed </Typography>
                {errorProtect}
              </Alert>
            )}
            {!loadingProtect && (
              <Button
                sx={{ display: 'block', margin: '20px auto' }}
                onClick={protectedDataSubmit}
                variant="contained"
              >
                Create
              </Button>
            )}
            {protectedData && !errorProtect && (
              <Alert sx={{ mt: 3, mb: 2 }} severity="success">
                <Typography variant="h6">
                  Your data has been protected!
                </Typography>
                <Link
                  href={IEXEC_EXPLORER_URL + protectedData}
                  target="_blank"
                  sx={{ color: 'green', textDecorationColor: 'green' }}
                >
                  You can reach it here
                </Link>
                <p>Your protected data address: {protectedData}</p>
              </Alert>
            )}
            {loadingProtect && (
              <CircularProgress
                sx={{ display: 'block', margin: '20px auto' }}
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
                <Button
                  id="spacingStyle"
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
                  <Alert sx={{ mt: 3, mb: 2 }} severity="success">
                    <Typography variant="h6">
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
                  id="spacingStyle"
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
