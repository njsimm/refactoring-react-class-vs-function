import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

const JokeList = () => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let collectionOfJokes = [...jokes];

      try {
        while (collectionOfJokes.length < 5) {
          const res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });

          const newJoke = res.data;

          collectionOfJokes.push({ ...newJoke, votes: 0 });
        }

        setJokes(collectionOfJokes);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (jokes.length === 0) fetchData();
  }, [jokes]);

  const getNewJokes = () => {
    setJokes([]);
    setIsLoading(true);
  };

  const vote = (id, voteValue) => {
    setJokes((currJokes) => {
      return currJokes.map((joke) => {
        return joke.id === id
          ? { ...joke, votes: joke.votes + voteValue }
          : joke;
      });
    });
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      ) : (
        <div>
          <ul>
            {/* future iterations to include uuid instead of idx as key */}
            {jokes.map((joke, idx) => {
              return (
                <li key={idx}>
                  <Joke
                    key={joke.id}
                    id={joke.id}
                    text={joke.joke}
                    votes={joke.votes}
                    vote={vote}
                  />
                </li>
              );
            })}
          </ul>
          <button className="JokeList-getmore" onClick={getNewJokes}>
            Get More Jokes
          </button>
        </div>
      )}
    </div>
  );
};

export default JokeList;
