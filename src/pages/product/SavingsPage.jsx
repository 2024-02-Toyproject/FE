import { useState } from 'react';
import Header from '../../components/Header';
// import './SavingsPage.scss';

export default function SavingsPage() {
  const [inputSavings, setInputSavings] = useState('');

  const handleInputSavings = (e) => {
    setInputSavings(e.target.value);
  };

  return (
    <div>
      <Header />
      <h1>적금</h1>
      <input
        className="InputBox"
        type="text"
        name="input_search_savings"
        value={inputSavings}
        onChange={handleInputSavings}
        placeholder="검색어를 입력해주세요"
      ></input>
    </div>
  );
}
