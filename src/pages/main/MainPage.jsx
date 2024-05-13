import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './MainPage.scss';

export default function MainPage() {
  const navigate = useNavigate();
  const onClickDeposit = () => {
    navigate('/deposit');
  };
  const onClickSavings = () => {
    navigate('/savings');
  };
  const onClickLoan = () => {
    navigate('/creditLoan');
  };
  const onClickTaxSaving = () => {
    navigate('/taxSaving');
  };

  return (
    <div>
      <Header />
      <div className="MainContainer">
        <h1 className="MainTitle">어떤 상품을 찾고 계신가요?</h1>
        <div>
          <div>
            <button
              type="button"
              className="ProductBtn"
              onClick={onClickDeposit}
            >
              예금
            </button>
            <button
              type="button"
              className="ProductBtn"
              onClick={onClickSavings}
            >
              적금
            </button>
          </div>

          <div>
            <button type="button" className="ProductBtn" onClick={onClickLoan}>
              신용대출
            </button>
            <button
              type="button"
              className="ProductBtn"
              onClick={onClickTaxSaving}
            >
              절세금융상품
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
