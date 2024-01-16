import { useState } from "react";
import Navbar from "../components/navbar";

const Salary: React.FC = () => {
  const initialGajiPokok = "";
  const initialTunjangan = "";
  const initialKewajiban = "";

  const [gajiPokok, setGajiPokok] = useState<string>(initialGajiPokok);
  const [tunjangan, setTunjangan] = useState<string>(initialTunjangan);
  const [kewajiban, setKewajiban] = useState<string>(initialKewajiban);
  const [gajiKotor, setGajiKotor] = useState<number | null>(null);
  const [gajiBersih, setGajiBersih] = useState<number | null>(null);

  const calcGaji = () => {
    const gajiPokokNumber = parseFloat(gajiPokok) || 0;
    const tunjanganNumber = parseFloat(tunjangan) || 0;
    const kewajibanNumber = parseFloat(kewajiban) || 0;

    const gajiKotorResult = gajiPokokNumber + tunjanganNumber;
    const gajiBersihResult = gajiKotorResult - kewajibanNumber;

    setGajiKotor(gajiKotorResult);
    setGajiBersih(gajiBersihResult);
  };

  const resetValues = () => {
    setGajiPokok(initialGajiPokok);
    setTunjangan(initialTunjangan);
    setKewajiban(initialKewajiban);
    setGajiKotor(null);
    setGajiBersih(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center -mt-14 font-poppins ">
        <div className="bg-gray-300 p-6 rounded-md shadow-sm shadow-purple-800 text-purple-800">
          <h1 className="mb-4 text-center text-lg font-semibold">
            KALKULATOR GAJI
          </h1>
          <div className="card-body">
            <div className="mb-4">
              <label htmlFor="gajiPokok" className="text-lg mr-4">
                Gaji Pokok
              </label>
              <input
                type="number"
                className="form-input my-2 rounded-md p-2"
                id="gajiPokok"
                value={gajiPokok}
                onChange={(e) =>
                  setGajiPokok(e.target.value.replace(/^0+/, ""))
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tunjangan" className="text-lg mr-4">
                Tunjangan
              </label>
              <input
                type="number"
                className="form-input my-2 rounded-md p-2"
                id="tunjangan"
                value={tunjangan}
                onChange={(e) =>
                  setTunjangan(e.target.value.replace(/^0+/, ""))
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="kewajiban" className="text-lg mr-4">
                Kewajiban
              </label>
              <input
                type="number"
                className="form-input my-2 rounded-md p-2"
                id="kewajiban"
                value={kewajiban}
                onChange={(e) =>
                  setKewajiban(e.target.value.replace(/^0+/, ""))
                }
              />
            </div>
            <div className="flex">
              <button
                type="button"
                className="bg-purple-800 font-semibold text-white py-2 px-4 rounded-md m-3 w-32 hover:bg-purple-500"
                onClick={calcGaji}
              >
                Hitung Gaji
              </button>
              <button
                type="button"
                className="bg-white font-semibold text-purple-800 py-2 px-4 rounded-md m-3 w-32 hover:bg-purple-500 hover:text-white"
                onClick={resetValues}
              >
                Reset
              </button>
            </div>
            <div className="mt-3">
              <p>
                Gaji Kotor <span className="ml-4">:</span> Rp.{gajiKotor}
              </p>
              <p>
                Gaji Bersih <span className="ml-2">:</span> Rp.{gajiBersih}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Salary;
