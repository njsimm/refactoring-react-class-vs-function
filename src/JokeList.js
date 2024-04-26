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
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });

          let newJoke = res.data.joke;

          collectionOfJokes.push(newJoke);
        }

        setJokes(collectionOfJokes);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [jokes]);

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      ) : (
        <ul>
          {jokes.map((joke) => {
            return (
              <li>
                <Joke text={joke} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default JokeList;
