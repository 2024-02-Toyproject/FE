import { useState } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import './DepositPage.scss';
import HeartButton from '../../components/HeartButton';
import axios from 'axios';

export default function DepositPage() {
  const [depositList, setDepositList] = useState('');

  const [depositLikeList, setDepositLikeList] = useState([]);

  const handleDepositList = (depositData) => {
    setDepositList(depositData);
    setDepositLikeList(Array(depositData.length).fill(false));
  };

  const onClickDepositLike = (index) => {
    const updatedLikeList = [...depositLikeList];
    updatedLikeList[index] = !updatedLikeList[index];
    setDepositLikeList(updatedLikeList);

    axios
      .post('http://loginhost:8000/deposit', {
        likeIndex: index,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  const onClickLink = () => {};

  return (
    <div>
      <Header />
      <div className="ProductContainer">
        <h1>예금</h1>
        <SearchBar onDataTransfer={handleDepositList} type="deposit" />
        <div>
          <table className="ProductTable">
            <thead>
              <tr>
                <th>금융회사명</th>
                <th>금융상품명</th>
                <th>가입 방법</th>
                <th>만기후 이자율</th>
                <th>우대조건</th>
                <th>가입제한</th>
                <th>가입대상</th>
                <th>최고한도</th>
                <th>저축금리유형명</th>
                <th>저축금리</th>
                <th>최고우대금리</th>
                <th>관심상품등록</th>
                <th>연결링크</th>
              </tr>
            </thead>
            <tbody>
              {depositList &&
                depositList.map((deposit, index) => {
                  return (
                    <tr key={index}>
                      <td>{deposit.bankName}</td>
                      <td>{deposit.productName}</td>
                      <td>{deposit.joinMethod}</td>
                      <td>{deposit.maturityInterestRate}</td>
                      <td>{deposit.preferentialConditions}</td>
                      <td>{deposit.joinRestrictions}</td>
                      <td>{deposit.targetCustomers}</td>
                      <td>{deposit.maximumLimit}</td>
                      <td>{deposit.interestRateType}</td>
                      <td>{deposit.interestRate}</td>
                      <td>{deposit.maximumPreferentialRate}</td>
                      <td>
                        <HeartButton
                          like={depositLikeList[index]}
                          onClick={() => onClickDepositLike(index)}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={onClickLink}>
                          신청하기
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
