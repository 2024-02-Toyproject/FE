import { useState } from 'react';
import Header from '../../components/Header';
import './DepositPage.scss';
import { IoSearch } from 'react-icons/io5';

export default function DepositPage() {
  const [inputDeposit, setInputDeposit] = useState('');

  const handleInputDeposit = (e) => {
    setInputDeposit(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="ProductContainer">
        <h1>예금</h1>
        <div className="SearchBar">
          <input
            className="InputSearch"
            type="text"
            name="input_search_deposit"
            value={inputDeposit}
            onChange={handleInputDeposit}
            placeholder="검색어를 입력해주세요"
          />
          <button className="SearchBtn">
            <IoSearch className="SearchIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
