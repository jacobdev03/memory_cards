import Card from './Card';
import { useEffect, useState } from 'react';
import './Cards.css';

const Cards = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        import.meta.env.VITE_API_KEY
      }&q=cat&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
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

  const handleClick = () => {
    const arrayToShuffle = [...data];
    const shuffledArray = shuffle(arrayToShuffle);
    setData(shuffledArray);
  };

  if (!data) return <p>loading</p>;

  return (
    <div className="cards-container">
      {data.map((cardData) => {
        return <Card key={cardData.id} data={cardData} handleClick={handleClick} />;
      })}
    </div>
  );
};

export default Cards;
