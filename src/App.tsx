import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import FrontPage from './components/FrontPage';
import SavedPage from './components/SavedPage';
import useJokes from './hooks/useJokes';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const { savedJokes, saveJoke, deleteJoke } = useJokes();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <FrontPage 
                saveJoke={saveJoke}
              />
            } 
          />
          <Route 
            path="/saved" 
            element={
              <SavedPage 
                savedJokes={savedJokes}
                deleteJoke={deleteJoke}
              />
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;