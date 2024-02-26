import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FiHome } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';

export default function Header() {
  const navigate = useNavigate();

  const backButton = () => {
    navigate(-1);
  };

  const homeButton = () => {
    navigate('/main');
  };

  const myButton = () => {
    navigate('/mypage');
  };

  return (
    <div className="HeaderContainer">
      <IoArrowBackCircleOutline onClick={backButton} className="BackBtn" />
      <div>
        <FiHome onClick={homeButton} className="HomeBtn" />
        <IoPersonCircleOutline onClick={myButton} className="MyBtn" />
      </div>
    </div>
  );
}
