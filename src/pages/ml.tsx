import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

// Interface untuk mendefinisikan struktur data hero
interface Hero {
  hero_name: string;
  hero_role: string;
  hero_specially: string;
}

const ML: React.FC = () => {
  // State untuk menyimpan data hero dari API
  const [heroes, setHeroes] = useState<Hero[]>([]);
  // State untuk menyimpan hasil pencarian
  const [searchResults, setSearchResults] = useState<Hero[]>([]);
  // State untuk menyimpan inputan dari pengguna
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State untuk menandai apakah pencarian tidak ditemukan
  const [notFound, setNotFound] = useState<boolean>(false);

  // Menggunakan useEffect untuk melakukan fetch data saat komponen pertama kali dimount
  useEffect(() => {
    // Mengambil data dari API menggunakan Axios
    axios
      .get("https://api.dazelpro.com/mobile-legends/hero")
      .then((response) => {
        // Menyimpan data hero ke dalam state
        setHeroes(response.data.hero);
        // Menyimpan semua hero ke dalam searchResults saat komponen dimuat
        setSearchResults(response.data.hero);
        // Set notFound ke false saat komponen dimuat
        setNotFound(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fungsi untuk menangani pencarian hero
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Periksa apakah searchTerm tidak kosong
    if (searchTerm.trim() === "") {
      // Jika kosong, tampilkan semua hero dan atur notFound ke false
      setSearchResults(heroes);
      setNotFound(false);
      return;
    }

    // Melakukan filter terhadap data hero berdasarkan inputan pengguna
    const filtered = heroes.filter((hero) => {
      const heroNameLower = hero.hero_name.toLowerCase();
      const roleLower = hero.hero_role.toLowerCase();
      const speciallyLower = hero.hero_specially.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      // Menyaring berdasarkan nama, peran, dan spesialisasi
      const nameMatch = heroNameLower.includes(searchTermLower);
      const roleMatch = roleLower.includes(searchTermLower);
      const speciallyMatch = speciallyLower.includes(searchTermLower);

      // Mengembalikan true jika minimal satu kriteria cocok
      return nameMatch || roleMatch || speciallyMatch;
    });

    // Menyimpan hasil pencarian ke dalam state
    setSearchResults(filtered);

    // Menandai apakah hasil pencarian tidak ditemukan
    setNotFound(filtered.length === 0);
  };

  // Fungsi untuk mereset pencarian
  const handleReset = () => {
    setSearchTerm("");
    // Mengatur searchResults kembali ke semua hero
    setSearchResults(heroes);
    setNotFound(false);
  };
  return (
    <>
      <Navbar />
      <div className="judul my-5">
        <h1 className="text-center text-white text-lg font-medium">
          MOBILE LEGENDS HERO
        </h1>
      </div>
      <div className="search p-5">
        <form className="md:flex gap-2" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Find Hero"
            className="px-2 md:w-60 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="button flex gap-2 md:my-0 my-2">
            <button
              type="submit"
              className="bg-violet-800 w-20 px-2 text-white font-normal text-md hover:bg-violet-500"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-violet-800 w-20 px-2 text-white font-normal text-md hover:bg-violet-500"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="content md:grid md:grid-cols-3 grid-cols-1 p-5 gap-5">
        {notFound ? (
          <p className="text-center text-white">Not Found</p>
        ) : (
          searchResults.map((hero, index) => (
            <div
              key={index}
              className="w-full border border-violet-700 text-white p-5 md:my-0 my-5"
            >
              <h1 className="font-bold text-md">{hero.hero_name}</h1>
              <h1 className="font-thin text-sm">Role: {hero.hero_role}</h1>
              <h1 className="font-thin text-sm">
                Spesialis: {hero.hero_specially}
              </h1>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ML;
