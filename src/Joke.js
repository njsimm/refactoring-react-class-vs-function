import React from "react";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. */

const Joke = ({ id, vote, votes, text }) => {
  const voteUp = () => vote(id, +1);
  const voteDown = () => vote(id, -1);

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={voteUp}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={voteDown}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
};

export default Joke;
