import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import HeartButton from '../../components/HeartButton';
import axios from 'axios';
import './TaxSavingPage.scss';

export default function TaxSavingPage() {
  const [taxSavingList, setTaxSavingList] = useState([]);
  const [taxSavingLikeList, setTaxSavingLikeList] = useState([]);
  const [memberData, setMemberData] = useState({});

  //초기 테이블에 모든 데이터 출력
  useEffect(() => {
    axios
      .get('/taxSaving')
      .then((response) => {
        setTaxSavingList(response.data);
        setTaxSavingLikeList(Array(response.data.length).fill(false));
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
  const handleTaxSavingList = (taxSavingData) => {
    setTaxSavingList(taxSavingData);
    // setDepositLikeList(Array(depositData.length).fill(false));
  };

  //좋아요 클릭
  const onClickTaxSavingLike = (index, taxSaving) => {
    const updatedLikeList = [...taxSavingLikeList];
    updatedLikeList[index] = !updatedLikeList[index];
    setTaxSavingLikeList(updatedLikeList);

    axios
      .post('/favorites', {
        memberId: memberData.memberEmail, //멤버 아이디
        bankName: taxSaving.mainSalesCompany, //주요 판매 회사 이름
        productName: taxSaving.financialProduct, //상품 이름
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
        <h1>절세금융상품</h1>
        <SearchBar onDataTransfer={handleTaxSavingList} type="taxSaving" />
        <div>
          <table className="ProductTable">
            <thead>
              <tr>
                <th>금융상품</th>
                <th>주요판매회사</th>
                <th>구분</th>
                <th>세제혜택</th>
                <th>가입대상</th>
                <th>가입한도</th>
                <th>근거법령</th>
                <th>관심상품등록</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(taxSavingList) &&
                taxSavingList.map((taxSaving, index) => {
                  return (
                    <tr key={index}>
                      <td>{taxSaving.financialProduct}</td>
                      <td>{taxSaving.mainSalesCompany}</td>
                      <td>{taxSaving.categoryType}</td>
                      <td>{taxSaving.taxBenefits}</td>
                      <td>{taxSaving.eligibility}</td>
                      <td>{taxSaving.subscriptionLimit}</td>
                      <td>{taxSaving.legalBasis}</td>
                      <td>
                        <HeartButton
                          like={taxSavingLikeList[index]}
                          onClick={() => onClickTaxSavingLike(index, taxSaving)}
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
