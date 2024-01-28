import './Card.css';

const Card = ({ data, handleClick, id }) => {
  if (!data) {
    return <p>Fetching.....</p>;
  }
  return (
    <div className="card" id={id} onClick={handleClick}>
      <img src={data.images.original.url} alt={data.title} />
    </div>
  );
};

export default Card;
