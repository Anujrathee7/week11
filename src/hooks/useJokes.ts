import { useState } from 'react';
import { Joke } from '../types';

export const useJokes = () => {
  const [savedJokes, setSavedJokes] = useState<Joke[]>([]);

  const saveJoke = (joke: Joke) => {
    setSavedJokes(prevJokes => {
      // Check if joke is already saved to avoid duplicates
      const isAlreadySaved = prevJokes.some(savedJoke => savedJoke.id === joke.id);
      if (isAlreadySaved) {
        return prevJokes;
      }
      return [...prevJokes, joke];
    });
  };

  const deleteJoke = (id: number) => {
    setSavedJokes(prevJokes => prevJokes.filter(joke => joke.id !== id));
  };

  return {
    savedJokes,
    saveJoke,
    deleteJoke
  };
};

export default useJokes;