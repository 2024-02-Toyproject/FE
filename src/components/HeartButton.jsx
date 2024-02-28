import './HeartButton.scss';
import HeartImg from '../assets/heart.png';
import EmptyHeartImg from '../assets/empty-heart.png';

export default function HeartButton({ like, onClick }) {
  return (
    <button className="HeartBtn" onClick={onClick}>
      <img className="HeartImg" src={like ? HeartImg : EmptyHeartImg} />
    </button>
  );
}
