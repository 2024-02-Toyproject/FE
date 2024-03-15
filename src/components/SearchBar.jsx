import axios from 'axios';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import './SearchBar.scss';

export default function SearchBar({ onDataTransfer, type }) {
  const [searchWord, setSearchWord] = useState('');

  const handleSearchWord = (e) => {
    setSearchWord(e.target.value);
  };

  const onClickSearch = () => {
    axios
      .post(
        `/${type}`,
        {
          searchWord: searchWord,
        },
        {
          withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
        }
      )
      .then((res) => {
        console.log(res.data);
        onDataTransfer(res.data); //콜백 함수 호출하여 데이터 전달
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  return (
    <div className="SearchBar">
      <input
        className="InputSearch"
        type="text"
        name="input_search"
        value={searchWord}
        onChange={handleSearchWord}
        placeholder="검색어를 입력해주세요"
      />
      <button className="SearchBtn" onClick={onClickSearch}>
        <IoSearch className="SearchIcon" />
      </button>
    </div>
  );
}
