import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import HeartButton from '../../components/HeartButton';
import axios from 'axios';
import SelectBox from '../../components/SelectBox';
import './CreditLoanPage.scss';

export default function CreditLoanPage() {
  const [creditLoanList, setCreditLoanList] = useState([]);
  const [creditLoanLikeList, setCreditLoanLikeList] = useState([]);
  const [memberData, setMemberData] = useState({});

  const [selectedBank, setSelectedBank] = useState('');
  const [selectedJoinWay, setSelectedJoinWay] = useState('');
  const [selectedLoanType, setSelctedLoanType] = useState('');
  const [selectedSortWay, setSelectedSortWay] = useState('');

  //초기 테이블에 모든 데이터 출력
  useEffect(() => {
    axios
      .get('/creditLoan')
      .then((response) => {
        setCreditLoanList(response.data);
        setCreditLoanLikeList(Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //회원 정보(아이디) 가져오기
  useEffect(() => {
    axios
      .get('/member/myPage')
      .then((response) => {
        setMemberData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //검색 요청 시 데이터 출력
  const handleCreditLoanList = (creditLoanData) => {
    setCreditLoanList(creditLoanData);
    // setDepositLikeList(Array(depositData.length).fill(false));
  };

  //필터링 할 때마다 데이터 반영
  useEffect(() => {
    fetchCreditLoanData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBank, selectedJoinWay, selectedLoanType, selectedSortWay]);

  //은행 필터링 선택
  const handleBankSelect = (e) => {
    setSelectedBank(e.target.value);
  };

  //가입방법 필터링 선택
  const handleJoinWaySelect = (e) => {
    setSelectedJoinWay(e.target.value);
  };

  //대출종류 필터링 선택
  const handleLoanTypeSelect = (e) => {
    setSelctedLoanType(e.target.value);
  };

  //정렬방법 필터링 선택
  const handleSortWaySelect = (e) => {
    setSelectedSortWay(e.target.value);
  };

  //필터링 요청 시 데이터 출력 함수
  const fetchCreditLoanData = () => {
    axios
      // 서버로 post 요청 보내는 부분
      .post('/creditLoan', {
        bank: selectedBank,
        joinWay: selectedJoinWay,
        loanType: selectedLoanType,
        sortWay: selectedSortWay,
      })
      // 서버로부터의 응답을 처리하는 부분
      .then((res) => {
        setCreditLoanList(res.data.loanProducts);
        // setDepositLikeList(Array(res.data.length).fill(false));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  //좋아요 클릭
  const onClickCreditLoanLike = (index, creditLoan) => {
    const updatedLikeList = [...creditLoanLikeList];
    updatedLikeList[index] = !updatedLikeList[index];
    setCreditLoanLikeList(updatedLikeList);

    axios
      .post('/creditLoanLike', {
        memberId: memberData.memberEmail, //멤버 아이디
        bankName: creditLoan.company, //은행 이름
        productName: creditLoan.productName, //상품 이름
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  return (
    <div>
      <Header />
      <div className="ProductContainer">
        <h1>신용대출</h1>
        <SearchBar onDataTransfer={handleCreditLoanList} type="creditLoan" />
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
              { value: '모집인', name: '모집인' },
              { value: '기타', name: '기타' },
            ]}
            value={selectedJoinWay}
            onSelectChange={handleJoinWaySelect}
          />

          <SelectBox
            options={[
              { value: '대출종류', name: '대출종류' },
              { value: '전체', name: '전체' },
              { value: '일반신용', name: '일반신용' },
              { value: '마이너스한도', name: '마이너스한도' },
              { value: '장기카드', name: '장기카드' },
            ]}
            value={selectedLoanType}
            onSelectChange={handleLoanTypeSelect}
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
                <th>가입방법</th>
                <th>대출종류명</th>
                <th>CB회사명</th>
                <th>금리구분</th>
                <th>평균금리</th>
                <th>관심상품등록</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(creditLoanList) &&
                creditLoanList.map((creditLoan, index) => {
                  return (
                    <tr key={index}>
                      <td>{creditLoan.company}</td>
                      <td>{creditLoan.productName}</td>
                      <td>{creditLoan.method}</td>
                      <td>{creditLoan.loanType}</td>
                      <td>{creditLoan.cbCompany}</td>
                      <td>{creditLoan.rateType}</td>
                      <td>{creditLoan.averageRate}</td>
                      <td>
                        <HeartButton
                          like={creditLoanLikeList[index]}
                          onClick={() =>
                            onClickCreditLoanLike(index, creditLoan)
                          }
                        />
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
