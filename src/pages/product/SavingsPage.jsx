import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import HeartButton from '../../components/HeartButton';
import axios from 'axios';
import SelectBox from '../../components/SelectBox';
import './SavingsPage.scss';

export default function SavingsPage() {
  const [savingsList, setSavingsList] = useState([]);
  const [savingsLikeList, setSavingsLikeList] = useState([]);

  const [selectedBank, setSelectedBank] = useState('');
  const [selectedJoinWay, setSelectedJoinWay] = useState('');
  const [selectedJoinObject, setSelctedJoinObject] = useState('');
  const [selectedSortWay, setSelectedSortWay] = useState('');

  //초기 테이블에 모든 데이터 출력
  useEffect(() => {
    axios
      .get('/saving')
      .then((response) => {
        // console.log(response.data);
        setSavingsList(response.data);
        setSavingsLikeList(Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //검색 요청 시 데이터 출력
  const handleSavingsList = (savingsData) => {
    setSavingsList(savingsData);
    // setDepositLikeList(Array(depositData.length).fill(false));
  };

  //필터링 할 때마다 데이터 반영
  useEffect(() => {
    fetchSavingsData();
  }, [selectedBank, selectedJoinWay, selectedJoinObject, selectedSortWay]);

  //은행 필터링 선택
  const handleBankSelect = (e) => {
    setSelectedBank(e.target.value);
  };

  //가입방법 필터링 선택
  const handleJoinWaySelect = (e) => {
    setSelectedJoinWay(e.target.value);
  };

  //가입대상 필터링 선택
  const handleJoinObjectSelect = (e) => {
    setSelctedJoinObject(e.target.value);
  };

  //정렬방법 필터링 선택
  const handleSortWaySelect = (e) => {
    setSelectedSortWay(e.target.value);
  };

  //필터링 요청 시 데이터 출력 함수
  const fetchSavingsData = () => {
    axios
      // 서버로 post 요청 보내는 부분
      .post('/saving', {
        bank: selectedBank,
        joinWay: selectedJoinWay,
        joinObject: selectedJoinObject,
        sortWay: selectedSortWay,
      })
      // 서버로부터의 응답을 처리하는 부분
      .then((res) => {
        // console.log(res.data);
        setSavingsList(res.data.savingProducts);
        // setDepositLikeList(Array(res.data.length).fill(false));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  //좋아요 클릭
  const onClickSavingsLike = (index) => {
    const updatedLikeList = [...savingsLikeList];
    updatedLikeList[index] = !updatedLikeList[index];
    setSavingsLikeList(updatedLikeList);

    axios
      .post('/savvingsLike', {
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
        <h1>적금</h1>
        <SearchBar onDataTransfer={handleSavingsList} type="savings" />
        <div className="SelectBoxes">
          <SelectBox
            options={[
              { value: '은행', name: '은행' },
              { value: '전체', name: '전체' },
              { value: '국민은행', name: '국민은행' },
              { value: '경남은행', name: '경남은행' },
              { value: '광주은행', name: '광주은행' },
              { value: '농협은행', name: '농협은행' },
              { value: '대구은행', name: '대구은행' },
              { value: '부산은행', name: '부산은행' },
              { value: '신한은행', name: '신한은행' },
              { value: '수협은행', name: '수협은행' },
              { value: '우리은행', name: '우리은행' },
              { value: '중소기업은행', name: '중소기업은행' },
              { value: '전북은행', name: '전북은행' },
              { value: '제주은행', name: '제주은행' },
              { value: '카카오뱅크', name: '카카오뱅크' },
              { value: '케이뱅크', name: '케이뱅크' },
              { value: '토스뱅크', name: '토스뱅크' },
              { value: '하나은행', name: '하나은행' },
              {
                value: '한국스탠다드차타드은행',
                name: '한국스탠다드차타드은행',
              },
              { value: '한국씨티은행', name: '한국씨티은행' },
            ]}
            value={selectedBank}
            onSelectChange={handleBankSelect}
          />

          <SelectBox
            options={[
              { value: '가입방법', name: '가입방법' },
              { value: '전체', name: '전체' },
              { value: '영업점', name: '영업점' },
              { value: '인터넷', name: '인터넷' },
              { value: '스마트폰', name: '스마트폰' },
              { value: '전화(텔레뱅킹)', name: '전화(텔레뱅킹)' },
              { value: '기타', name: '기타' },
            ]}
            value={selectedJoinWay}
            onSelectChange={handleJoinWaySelect}
          />

          <SelectBox
            options={[
              { value: '가입대상', name: '가입대상' },
              { value: '전체', name: '전체' },
              { value: '개인', name: '개인' },
              { value: '개인사업자', name: '개인사업자' },
              { value: '법인', name: '법인' },
              { value: '제한없음', name: '제한없음' },
            ]}
            value={selectedJoinObject}
            onSelectChange={handleJoinObjectSelect}
          />

          <SelectBox
            options={[
              { value: '정렬방법', name: '정렬방법' },
              { value: '기본금리순', name: '기본금리순' },
              { value: '최고금리순', name: '최고금리순' },
            ]}
            value={selectedSortWay}
            onSelectChange={handleSortWaySelect}
          />
        </div>
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
              {Array.isArray(savingsList) &&
                savingsList.map((savings, index) => {
                  return (
                    <tr key={index}>
                      <td>{savings.company}</td>
                      <td>{savings.productName}</td>
                      <td>{savings.joinMethod}</td>
                      <td>{savings.maturityInterestRate}</td>
                      <td>{savings.preferentialConditions}</td>
                      <td>{savings.joinRestrictions}</td>
                      <td>{savings.targetCustomers}</td>
                      <td>{savings.maximumLimit}</td>
                      <td>{savings.interestRateType}</td>
                      <td>{savings.interestRate}</td>
                      <td>{savings.maximumPreferentialRate}</td>
                      <td>
                        <HeartButton
                          like={savingsLikeList[index]}
                          onClick={() => onClickSavingsLike(index)}
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
