import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import './DepositPage.scss';
import HeartButton from '../../components/HeartButton';
import axios from 'axios';
import SelectBox from '../../components/SelectBox';

export default function DepositPage() {
  const [depositList, setDepositList] = useState([]);
  const [depositLikeList, setDepositLikeList] = useState([]);

  const [selectedBank, setSelectedBank] = useState('');
  const [selectedJoinWay, setSelectedJoinWay] = useState('');
  const [selectedJoinObject, setSelctedJoinObject] = useState('');
  const [selectedSortWay, setSelectedSortWay] = useState('');

  //초기 테이블에 모든 데이터 출력
  useEffect(() => {
    axios
      .get('/fixedDeposit')
      .then((response) => {
        setDepositList(response.data);
        setDepositLikeList(Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //검색 요청 시 데이터 출력
  const handleDepositList = (depositData) => {
    setDepositList(depositData);
    // setDepositLikeList(Array(depositData.length).fill(false));
  };

  //필터링 요청 시 데이터 출력
  const fetchDepositData = (bank, joinWay, joinObject, sortWay) => {
    axios
      .post('/fixedDeposit', {
        bank: bank,
        joinWay: joinWay,
        joinObject: joinObject,
        sortWay: sortWay,
      })
      .then((res) => {
        console.log(res.data);
        setDepositList(res.data);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  //은행 필터링 선택
  const handleBankSelect = (e) => {
    setSelectedBank(e.target.value);
    fetchDepositData(
      selectedBank,
      selectedJoinWay,
      selectedJoinObject,
      selectedSortWay
    );
  };

  //가입방법 필터링 선택
  const handleJoinWaySelect = (e) => {
    setSelectedJoinWay(e.target.value);
    fetchDepositData(
      selectedBank,
      selectedJoinWay,
      selectedJoinObject,
      selectedSortWay
    );
  };

  //가입대상 필터링 선택
  const handleJoinObjectSelect = (e) => {
    setSelctedJoinObject(e.target.value);
    fetchDepositData(
      selectedBank,
      selectedJoinWay,
      selectedJoinObject,
      selectedSortWay
    );
  };

  //정렬방법 필터링 선택
  const handleSortWaySelect = (e) => {
    setSelectedSortWay(e.target.value);
    fetchDepositData(
      selectedBank,
      selectedJoinWay,
      selectedJoinObject,
      selectedSortWay
    );
  };

  //좋아요 클릭
  const onClickDepositLike = (index) => {
    const updatedLikeList = [...depositLikeList];
    updatedLikeList[index] = !updatedLikeList[index];
    setDepositLikeList(updatedLikeList);

    axios
      .post('/depositLike', {
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
        <SearchBar onDataTransfer={handleDepositList} type="fixedDeposit" />
        <div>
          <SelectBox
            options={[
              { value: 'BankTitle', name: '은행' },
              { value: 'kb', name: '국민은행' },
              { value: 'kn', name: '경남은행' },
              { value: 'gj', name: '광주은행' },
              { value: 'nh', name: '농협은행' },
              { value: 'dg', name: '대구은행' },
              { value: 'bs', name: '부산은행' },
              { value: 'sh', name: '신한은행' },
              { value: 'suhyup', name: '수협은행' },
              { value: 'wr', name: '우리은행' },
              { value: 'ibk', name: '중소기업은행' },
              { value: 'jb', name: '전북은행' },
              { value: 'jj', name: '제주은행' },
              { value: 'kko', name: '카카오뱅크' },
              { value: 'k', name: '케이뱅크' },
              { value: 'ts', name: '토스뱅크' },
              { value: 'hn', name: '하나은행' },
              { value: 'ksc', name: '한국스탠다드차타드은행' },
              { value: 'cb', name: '한국씨티은행' },
            ]}
            value={selectedBank}
            onSelectChange={handleBankSelect}
          />

          <SelectBox
            options={[
              { value: 'joinWayTitle', name: '가입방법' },
              { value: 'store', name: '영업점' },
              { value: 'internet', name: '인터넷' },
              { value: 'phone', name: '스마트폰' },
              { value: 'tele', name: '전화(텔레뱅킹)' },
              { value: 'etc', name: '기타' },
            ]}
            value={selectedJoinWay}
            onSelectChange={handleJoinWaySelect}
          />

          <SelectBox
            options={[
              { value: 'joinObjectTitle', name: '가입대상' },
              { value: 'individual', name: '개인' },
              { value: 'business', name: '개인사업자' },
              { value: 'corporate', name: '법인' },
              { value: 'nolimit', name: '제한없음' },
            ]}
            value={selectedJoinObject}
            onSelectChange={handleJoinObjectSelect}
          />

          <SelectBox
            options={[
              { value: 'sortWayTitle', name: '정렬방법' },
              { value: 'basic', name: '기본금리순' },
              { value: 'top', name: '최고금리순' },
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
              {Array.isArray(depositList) &&
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
