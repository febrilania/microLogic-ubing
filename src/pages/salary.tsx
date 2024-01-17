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
  const [showGajiPokok, setShowGajiPokok] = useState<boolean>(false);

  const calcGaji = () => {
    const gajiPokokNumber = parseFloat(gajiPokok) || 0;
    const tunjanganNumber = parseFloat(tunjangan) || 0;
    const kewajibanNumber = parseFloat(kewajiban) || 0;

    const gajiKotorResult = gajiPokokNumber + tunjanganNumber;
    const gajiBersihResult = gajiKotorResult - kewajibanNumber;

    setGajiKotor(gajiKotorResult);
    setGajiBersih(gajiBersihResult);
    setShowGajiPokok(true);
  };

  const resetValues = () => {
    setGajiPokok(initialGajiPokok);
    setTunjangan(initialTunjangan);
    setKewajiban(initialKewajiban);
    setGajiKotor(null);
    setGajiBersih(null);
    setShowGajiPokok(false);
  };

  return (
    <>
      <Navbar />
      <div className="font-poppins px-5">
        <div className="bg-purple-200 w-full md:w-96 p-6 rounded-md shadow-sm shadow-purple-800 text-purple-800 mx-auto my-5">
          <h1 className="mb-4 text-center text-xl font-semibold">
            KALKULATOR GAJI
          </h1>
          <div className="card-body flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="gajiPokok" className="text-lg font-semibold">
                Gaji Pokok
              </label>
              <input
                type="number"
                className="form-input rounded-md p-2 font-semibold "
                id="gajiPokok"
                value={gajiPokok}
                onChange={(e) =>
                  setGajiPokok(e.target.value.replace(/^0+/, ""))
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tunjangan" className="text-lg font-semibold">
                Tunjangan
              </label>
              <input
                type="number"
                className="form-input rounded-md p-2 font-semibold"
                id="tunjangan"
                value={tunjangan}
                onChange={(e) =>
                  setTunjangan(e.target.value.replace(/^0+/, ""))
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="kewajiban" className="text-lg font-semibold">
                Kewajiban
              </label>
              <input
                type="number"
                className="form-input rounded-md p-2 font-semibold"
                id="kewajiban"
                value={kewajiban}
                onChange={(e) =>
                  setKewajiban(e.target.value.replace(/^0+/, ""))
                }
              />
            </div>
            <div className="flex justify-center">
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
          </div>
        </div>
        {showGajiPokok && (
          <div className="bg-purple-200 w-full md:w-96 mx-auto rounded-md p-2 shadow-sm shadow-purple-800 text-purple-800">
            <table className="table-fixed w-full border-separate border-spacing-y-1 ">
              <tr>
                <td className="font-semibold w-24">Gaji Pokok</td>
                <td className="font-semibold w-5 text-center">:</td>
                <td className="font-semibold bg-white px-2 rounded-md">
                  Rp.{gajiPokok}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Gaji Bersih</td>
                <td className="font-semibold w-5 text-center">:</td>
                <td className="font-semibold bg-white px-2 rounded-md">
                  Rp.{gajiBersih}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Gaji Kotor</td>
                <td className="font-semibold w-5 text-center">:</td>
                <td className="font-semibold bg-white px-2 rounded-md">
                  Rp.{gajiKotor}
                </td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
export default Salary;
