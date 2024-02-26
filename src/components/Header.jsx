import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FiHome } from 'react-icons/fi';

export default function Header() {
  const navigate = useNavigate();

  const backButton = () => {
    navigate(-1);
  };

  const homeButton = () => {
    navigate('/main');
  };
  return (
    <div className="HeaderContainer">
      <IoArrowBackCircleOutline onClick={backButton} className="BackBtn" />
      <FiHome onClick={homeButton} className="HomeBtn" />
    </div>
  );
}
