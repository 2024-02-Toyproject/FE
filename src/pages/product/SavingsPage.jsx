import { useState } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
// import './SavingsPage.scss';

export default function SavingsPage() {
  const [savingsList, setSavingsList] = useState('');

  const handleSavingsList = (savingsData) => {
    setSavingsList(savingsData);
  };

  return (
    <div>
      <Header />
      <div className="ProductContainer">
        <h1>적금</h1>
        <SearchBar onDataTransfer={handleSavingsList} type="savings" />
      </div>
    </div>
  );
}
