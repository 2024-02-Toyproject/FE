import { useState } from 'react';
import Header from '../../components/Header';
import './DepositPage.scss';
import SearchBar from '../../components/SearchBar';

export default function DepositPage() {
  const [depositList, setDepositList] = useState('');

  const handleDepositList = (depositData) => {
    setDepositList(depositData);
  };

  return (
    <div>
      <Header />
      <div className="ProductContainer">
        <h1>예금</h1>
        <SearchBar onDataTransfer={handleDepositList} type="deposit" />
      </div>
    </div>
  );
}
