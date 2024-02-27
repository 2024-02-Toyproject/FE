import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './MyPage.scss';
import axios from 'axios';

export default function MyPage() {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    fetchMyData();
  }, []);

  const fetchMyData = () => {
    axios
      .get('/mypage')
      .then((response) => {
        setMyData(response.data);
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
          <span className="CustomerNameText">{myData.name}</span>님
        </p>
        <p className="CustomerInfo">
          <span className="CustomerInfoText">{myData.age}</span>
          세/
          <span className="CustomerInfoText">{myData.gender}</span>
        </p>
        <div className="LikeList">
          <p>❤ 관심 상품 목록 ❤</p>
          {myData.likelist &&
            myData.likelist.map((product, key) => {
              return <li key={key}>{product.name}</li>;
            })}
        </div>
      </div>
    </div>
  );
}
