import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { MsalProvider } from '@azure/msal-react'
import { IPublicClientApplication } from '@azure/msal-browser';

import ProvideAppContext from './AppContext';
import ErrorMessage from './ErrorMessage';
import NavBar from './NavBar';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.css';
import Calendar from './Calendar';
type AppProps= {
  pca: IPublicClientApplication
};


export default function App({ pca }: AppProps) {
  return(
    <MsalProvider instance={ pca }>
      <ProvideAppContext>
        <Router>
          <div>
            <NavBar />
            <Container>
              <ErrorMessage />
              <Routes>
            <Route path="/"  element={<Welcome/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
          </Routes>
            </Container>
          </div>
        </Router>
      </ProvideAppContext>
    </MsalProvider>
  );
}