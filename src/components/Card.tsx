import './Card.css';

const Card = ({ data, handleClick }) => {
  if (!data) {
    return <p>Fetching.....</p>;
  }
  return (
    <div className="card" onClick={handleClick}>
      <img src={data.images.original.url} alt={data.title} />
    </div>
  );
};

export default Card;
