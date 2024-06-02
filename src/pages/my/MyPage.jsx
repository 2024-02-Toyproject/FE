import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './MyPage.scss';
import axios from 'axios';

export default function MyPage() {
  const [myData, setMyData] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchMyData();
  }, []);

  const fetchMyData = () => {
    axios
      .get('/member/myPage')
      .then((response) => {
        setMyData(response.data);
        fetchFavorites(response.data.memberEmail);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //회원별 관심상품조회
  const fetchFavorites = (memberEmail) => {
    axios
      .get(`/api/favorites/${memberEmail}`)
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="MyPageContainer">
        <h1>마이페이지</h1>
        <p className="CustomerName">
          <span className="CustomerNameText">{myData.memberName}</span>님
        </p>
        <p className="CustomerInfo">
          <span className="CustomerInfoText">{myData.age}</span>세/
          <span className="CustomerInfoText">{myData.gender}</span>
        </p>
        <div className="LikeList">
          <p>❤ 관심 상품 목록 ❤</p>
          {favorites.map((favorite) => {
            return (
              <li key={favorite.id}>
                {favorite.bankName}-{favorite.productName}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}
