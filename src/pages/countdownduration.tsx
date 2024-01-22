import React, { useState, useEffect } from "react";
import { format, parseISO, differenceInSeconds } from "date-fns";
import Navbar from "../components/navbar";

const CountDownDuration: React.FC = () => {
  const [targetDate, setTargetDate] = useState<string>("");
  const [countdown, setCountdown] = useState<string | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const handleStart = () => {
    // Validasi apakah targetDate telah diisi
    if (!targetDate) {
      alert("Please enter the target date");
      return;
    }

    // Menghentikan interval sebelumnya (jika ada)
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    // Menghitung selisih waktu antara targetDate dan waktu sekarang
    const targetTime = parseISO(targetDate);
    const currentTime = new Date();
    const difference = differenceInSeconds(targetTime, currentTime);

    console.log("Target Time:", targetTime);
    console.log("Current Time:", currentTime);
    console.log("Difference (seconds):", difference);

    // Jika targetDate lebih awal dari waktu sekarang, tampilkan pesan waktu telah habis
    if (difference <= 0) {
      setCountdown("Waktu telah habis");
      return;
    }

    // Mengatur interval untuk mengupdate countdown setiap detik
    const newIntervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = differenceInSeconds(targetTime, currentTime);

      // Jika targetDate lebih awal dari waktu sekarang, hentikan interval dan tampilkan pesan waktu telah habis
      if (difference <= 0) {
        clearInterval(newIntervalId);
        setCountdown("Waktu telah habis");
      } else {
        // Menghitung jam, menit, dan detik dari selisih waktu
        const seconds = difference % 60;
        const minutes = Math.floor((difference / 60) % 60);
        const hours = Math.floor(difference / 3600);

        // Menampilkan countdown format jam:menit:detik
        setCountdown(`${hours} jam ${minutes} menit ${seconds} detik`);
      }
    }, 1000);

    // Menyimpan ID interval ke dalam state
    setIntervalId(newIntervalId);
  };

  const handleReset = () => {
    // Menghentikan interval jika ada
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    setTargetDate("");
    setCountdown(null);
    setIntervalId(null);
  };

  useEffect(() => {
    // Membersihkan interval saat komponen di-unmount
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <>
      <Navbar />
      <div className="judul my-5">
        <h1 className="text-center text-white text-lg font-medium">
          COUNTDOWN DURATION
        </h1>
      </div>
      <div className="content text-white px-5">
        <div className="md:w-1/2 w-full mx-auto border border-violet-800 p-5">
          <h1 className="text-md font-normal">
            Enter the target date and time
          </h1>
          <form
            action=""
            className="flex gap-2 my-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="datetime-local"
              className="w-3/4 text-violet-950"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
            <button
              type="button"
              onClick={handleStart}
              className="bg-violet-800 w-20 px-2 text-white font-normal text-md hover:bg-violet-500"
            >
              Start
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-violet-800 w-20 px-2 text-white font-normal text-md hover:bg-violet-500"
            >
              Reset
            </button>
          </form>
          <h1 className="text-md font-normal">Countdown : {countdown}</h1>
        </div>
      </div>
    </>
  );
};

export default CountDownDuration;
