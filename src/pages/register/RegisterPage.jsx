import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.scss';
import Button from '../../components/Button';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [registerId, setRegisterId] = useState('');
  const [registerPw, setRegisterPw] = useState('');
  // const [registerPwConfirm, setRegisterPwConfirm] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerGender, setRegisterGender] = useState('');
  const [registerBday, setRegisterBday] = useState('');

  const backButton = () => {
    navigate(-1);
  };

  const handlerRegisterId = (e) => {
    setRegisterId(e.target.value);
  };

  const handlerRegisterPw = (e) => {
    setRegisterPw(e.target.value);
  };

  // const handlerRegisterPwConfirm = (e) => {
  //   setRegisterPwConfirm(e.target.value);
  // };

  const handlerRegisterName = (e) => {
    setRegisterName(e.target.value);
  };

  const handlerRegisterGender = (e) => {
    setRegisterGender(e.target.value);
    console.log(registerGender);
  };

  const handlerRegisterBday = (e) => {
    setRegisterBday(e.target.value);
  };

  const onClickRegister = () => {
    axios
      .post('http://localhost:8080/member/save', {
        id: registerId,
        pw: registerPw,
        name: registerName,
        gender: registerGender,
        birthday: registerBday,
      })
      .then((res) => {
        console.log(res.data);
        navigate('/main');
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  return (
    <>
      <div>
        <IoArrowBackCircleOutline onClick={backButton} className="BackBtn" />
      </div>

      <div className="RegisterContainer">
        <h1 className="RegisterTitle">회원가입</h1>

        <form>
          <div>
            <p className="FormTitle">아이디</p>
            <input
              className="RegisterInputBox"
              type="text"
              name="register_id"
              value={registerId}
              onChange={handlerRegisterId}
              required
            ></input>
          </div>

          <div>
            <p className="FormTitle">비밀번호</p>
            <input
              className="RegisterInputBox"
              type="password"
              name="register_pw"
              value={registerPw}
              onChange={handlerRegisterPw}
              required
            ></input>
          </div>

          {/* <div>
          <p>비밀번호 확인</p>
          <input
            className="RegisterInputBox"
            type="password"
            name="register_pw_confirm"
            value={registerPwConfirm}
            onChange={handlerRegisterPwConfirm}
            required
          ></input>
        </div> */}

          <div>
            <p className="FormTitle">이름</p>
            <input
              className="RegisterInputBox"
              type="text"
              name="register_name"
              value={registerName}
              onChange={handlerRegisterName}
              required
            ></input>
          </div>

          <div>
            <p className="FormTitle">성별</p>
            <label for="male">남성</label>
            <input
              id="male"
              type="radio"
              name="register_gender"
              value="male"
              onChange={handlerRegisterGender}
              className="RegisterGender"
            ></input>

            <label for="female">여성</label>
            <input
              id="female"
              type="radio"
              name="register_gender"
              value="female"
              onChange={handlerRegisterGender}
              className="RegisterGender"
            ></input>
          </div>

          <div>
            <p className="FormTitle">생년월일</p>
            <input
              type="date"
              name="register_bday"
              value={registerBday}
              onChange={handlerRegisterBday}
              className="RegisterBday"
            ></input>
          </div>

          <div className="RegisterBtn">
            <Button text="회원가입" onClick={onClickRegister}></Button>
          </div>
        </form>
      </div>
    </>
  );
}
