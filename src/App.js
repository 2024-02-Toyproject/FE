import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import MainPage from './pages/main/MainPage';
import './App.css';
import DepositPage from './pages/product/DepositPage';
import SavingsPage from './pages/product/SavingsPage';
import LoanPage from './pages/product/LoanPage';
import TaxPage from './pages/product/TaxPage';
import MyPage from './pages/my/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />

        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/creditLoan" element={<LoanPage />} />
        <Route path="/taxSaving" element={<TaxPage />} />

        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
