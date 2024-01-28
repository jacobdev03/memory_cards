import Card from './Card';
import { memo, useEffect, useState } from 'react';
import './Cards.css';

const Cards = () => {
  const [data, setData] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [memorizedCards, setMemorizedCards] = useState<string[]>([]);

  if (score > bestScore) {
    setBestScore(score);
  }

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        import.meta.env.VITE_API_KEY
      }&q=cat&limit=12&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
      {
        method: 'GET',
        headers: {},
      }
    )
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((err) => console.error(err));
  }, []);

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkMemorizedCards = (id) => {
    if (memorizedCards.includes(id)) {
      console.log('You lost');
      setScore(0);
      setMemorizedCards([]);
    } else {
      setScore(score + 1);
      setMemorizedCards([id, ...memorizedCards]);
    }
  };

  const handleClick = (e) => {
    console.log(e.currentTarget);
    const arrayToShuffle = [...data];
    checkMemorizedCards(e.currentTarget.id);

    const shuffledArray = shuffle(arrayToShuffle);
    setData(shuffledArray);
  };

  if (!data) return <p>loading</p>;

  return (
    <>
      <div className="sub-heading">
        Score: <h2>{score}</h2> <br />
        Best Score: <h2>{bestScore}</h2>
      </div>
      <div className="cards-container">
        {data.map((cardData) => {
          return (
            <Card id={cardData.id} key={cardData.id} data={cardData} handleClick={handleClick} />
          );
        })}
      </div>
    </>
  );
};

export default Cards;
