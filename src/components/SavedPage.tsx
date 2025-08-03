import React from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Joke } from '../types';

interface SavedPageProps {
  savedJokes: Joke[];
  deleteJoke: (id: number) => void;
}

const SavedPage: React.FC<SavedPageProps> = ({ savedJokes, deleteJoke }) => {
  const handleDeleteJoke = (id: number) => {
    deleteJoke(id);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Saved Jokes
      </Typography>
      
      {savedJokes.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No saved jokes yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {savedJokes.map((joke) => (
            <Grid item xs={12} md={6} key={joke.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {joke.setup}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    {joke.punchline}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                    Type: {joke.type} | ID: {joke.id}
                  </Typography>
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="outlined" 
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteJoke(joke.id)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {savedJokes.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Total saved jokes: {savedJokes.length}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SavedPage;