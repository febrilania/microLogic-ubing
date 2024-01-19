import React, { useState } from "react";
import Navbar from "../components/navbar";

// Komponen utama
const Currency: React.FC = () => {
  // State untuk menyimpan jumlah uang yang akan dikonversi
  const [amount, setAmount] = useState<number>(0);

  // State untuk menyimpan mata uang asal
  const [fromCurrency, setFromCurrency] = useState<string>("IDR");

  // State untuk menyimpan mata uang tujuan
  const [toCurrency, setToCurrency] = useState<string>("USD");

  // State untuk menyimpan hasil konversi
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  // Handle perubahan jumlah uang yang akan dikonversi
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  // Handle perubahan mata uang asal
  const handleFromCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFromCurrency(e.target.value);
  };

  // Handle perubahan mata uang tujuan
  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  // Handle saat tombol Convert ditekan
  const handleConvert = () => {
    // Melakukan logika konversi mata uang
    // Untuk keperluan demonstrasi, kita asumsikan nilai tukar tetap
    const exchangeRate: Record<string, number> = {
      IDR: 0.000071, // 1 IDR ke USD
      USD: 1, // 1 USD ke USD
      EUR: 1.13, // 1 EUR ke USD
      GBP: 1.34, // 1 GBP ke USD
    };

    // Menghitung jumlah yang sudah dikonversi
    const converted =
      amount * exchangeRate[fromCurrency] * (1 / exchangeRate[toCurrency]);
    setConvertedAmount(converted);
  };

  return (
    <>
      {/* Menampilkan Navbar */}
      <Navbar />

      {/* Bagian Judul */}
      <div className="Judul my-5">
        <h1 className="text-center text-white text-lg font-medium">
          CURRENCY CONVERTER
        </h1>
      </div>

      {/* Bagian Form Konversi Mata Uang */}
      <div className="card px-5">
        <div className="w-full md:w-1/2 bg-violet-800 py-5 px-5 mx-auto rounded-md">
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConvert();
              }}
              className="md:flex md:gap-4 gap-5 justify-center"
            >
              {/* Input Jumlah Uang */}
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full h-10 rounded-md px-2 text-violet-950"
              />

              {/* Pilihan Mata Uang Asal */}
              <div className="flex gap-4 md:my-0 my-2">
                <select
                  value={fromCurrency}
                  onChange={handleFromCurrencyChange}
                  className="h-10 w-full md:w-16 rounded-md text-violet-950"
                >
                  <option value="IDR">IDR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>

                {/* Teks 'to' sebagai pemisah */}
                <h1 className="text-white flex items-center text-md font-normal">
                  to
                </h1>

                {/* Pilihan Mata Uang Tujuan */}
                <select
                  value={toCurrency}
                  onChange={handleToCurrencyChange}
                  className="h-10 w-full md:w-16 rounded-md text-violet-950"
                >
                  <option value="IDR">IDR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

              {/* Tombol untuk Melakukan Konversi */}
              <button
                type="submit"
                className="bg-violet-950 hover:bg-violet-500 rounded-md h-10 w-full md:w-40 text-md font-normal text-white"
              >
                Convert
              </button>
            </form>

            {/* Menampilkan Hasil Konversi */}
            <div className="hasil flex mt-2 md:mt-4">
              <h1 className="rounded-md w-full md:w-full bg-white py-2 px-2 text-md font-normal text-violet-950">
                {" "}
                {convertedAmount !== null
                  ? convertedAmount.toFixed(2)
                  : ""}{" "}
                {toCurrency}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Currency;
