import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Alert
} from '@mui/material';
import { Joke } from '../types';

interface FrontPageProps {
  saveJoke?: (joke: Joke) => void;
}

const FrontPage: React.FC<FrontPageProps> = ({ saveJoke }) => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  const fetchJoke = async (abortController: AbortController) => {
    setLoading(true);
    setError('');
    setSaved(false);
    
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke', {
        signal: abortController.signal
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      
      const jokeData: Joke = await response.json();
      setJoke(jokeData);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('Failed to load joke. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchJoke(abortController);

    return () => {
      abortController.abort();
    };
  }, []);

  const handleGetNewJoke = () => {
    const abortController = new AbortController();
    fetchJoke(abortController);
  };

  const handleSaveJoke = () => {
    if (joke && saveJoke) {
      saveJoke(joke);
      setSaved(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Random Joke Generator
        </Typography>
        
        <Button 
          variant="contained" 
          onClick={handleGetNewJoke}
          disabled={loading}
          size="large"
        >
          Get Joke
        </Button>

        {loading && (
          <Typography variant="h6" color="text.secondary">
            Loading a joke...
          </Typography>
        )}

        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        {joke && !loading && (
          <Card key={joke.id} sx={{ width: '100%', maxWidth: 600 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {joke.setup}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                {joke.punchline}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                Type: {joke.type} | ID: {joke.id}
              </Typography>
              
              {saveJoke && (
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={handleSaveJoke}
                    disabled={saved}
                  >
                    {saved ? 'Joke Saved!' : 'Save Joke'}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default FrontPage;