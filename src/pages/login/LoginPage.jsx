import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import './LoginPage.scss';

export default function LoginPage() {
  const navigate = useNavigate();

  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [loginFail, setLoginFail] = useState(false);

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = () => {
    axios
      .post('/member/login', {
        memberEmail: inputId,
        memberPassword: inputPw,
      })
      .then((res) => {
        if (res.data) {
          navigate('/main');
        }
      })
      .catch((error) => {
        console.log(error, 'error');
        setLoginFail(true);
      });
  };

  const onClickRegister = () => {
    navigate('/register');
  };

  return (
    <div className="LoginContainer">
      <h1 className="LoginTitle">금융 상품 추천 서비스</h1>

      <form className="FormContainer">
        <div>
          <input
            className="InputBox"
            type="text"
            name="input_id"
            value={inputId}
            onChange={handleInputId}
            placeholder="ID"
          ></input>
        </div>

        <div>
          <input
            className="InputBox"
            type="password"
            name="input_pw"
            value={inputPw}
            onChange={handleInputPw}
            placeholder="PW"
          ></input>
        </div>

        {loginFail ? (
          <p className="WrongText">
            아이디 또는 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.
          </p>
        ) : null}

        <div className="ButtonDiv">
          <Button text="로그인" onClick={onClickLogin}></Button>
          <Button text="회원가입" onClick={onClickRegister}></Button>
        </div>
      </form>
    </div>
  );
}
