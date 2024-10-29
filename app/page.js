"use client";
import CatCard from "@/components/CatCard";
import { API_URL } from "@/components/config";
import ConfirmModal from "@/components/ConfirmModal";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Pagination, Select, Spin } from "antd";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const limit = 12;
const unknownBreed = { label: "Unknown", value: "unknown" };

const Home = () => {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  const [breedOptions, setBreedOptions] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleFavoriteFilter = () => {
    setFavoritesFilter(!favoritesFilter);
  };

  const updateCatLocalState = (data) => {
    const { id } = data;
    setCats(cats.map((cat) => (cat.id === id ? { ...cat, ...data } : cat)));
  };

  const onChange = (value, options) => {
    setSelectedBreeds(value);
  };

  const resetDatabase = () => {
    setLoading(true);
    fetch(`${API_URL}/api/cats/reset/`, {
      method: "POST",
    })
      .then(() => {
        setPage(1);
        setFavoritesFilter(false);
        setSelectedBreeds([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let url = `${API_URL}/api/cats/?limit=${limit}&skip=${(page - 1) * limit}`;
    if (favoritesFilter) {
      url += "&favorite=true";
    }
    if (selectedBreeds.length) {
      url += `&breeds=${selectedBreeds.join(",")}`;
    }
    setLoading(true)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCats(data.items);
        setTotal(data.count);
        setBreedOptions([
          unknownBreed,
          ...data.breeds.map((breed) => ({
            label: breed.name,
            value: breed.id,
          })),
        ]);
      })
      .catch((error) => { 
          console.log(error)
      })
      .finally(() => {
        setLoading(false)
      });
  }, [page, favoritesFilter, selectedBreeds]);

  useEffect(() => {
    setPage(1);
  }, [favoritesFilter, selectedBreeds]);

  return (
    <div className="flex f-full overflow-hidden max-h-screen flex-col">
      <div className="text-white flex header-part p-2 gap-2 justify-end" />
      <div className="flex flex-1 overflow-hidden main-part">
        <div className="main-left-part bg-gray-700">
          {/* <div className="flex justify-center">
            <Image
              src="/logo1.jpg"
              alt="logo"
              layout="responsive"
              width={50}
              height={50}
              className="w-auto"
            />
          </div> */}
          <div className="pt-2 pb-10 text-center">
            <h1 className="text-3xl font-bold logo-text">Purrfect Pix</h1>
          </div>
          <div className="text-center">
            <button
              className="inline-flex items-center gap-2 bg-[#fcfaed] hover:bg-[#fd8638] text-black font-bold py-2 px-4 rounded"
              onClick={toggleFavoriteFilter}
            >
              {favoritesFilter ? (
                <HeartFilled className="text-red-500" />
              ) : (
                <HeartOutlined />
              )}
              <span>Favorites only</span>
            </button>
          </div>
          <div>
            <h2 className="text-white font-bold pt-2 text-center">
              Select Breeds
            </h2>
            <Select
              className="select-font"
              popupClassName="select-font"
              mode="tags"
              style={{
                width: "100%",
                backgroundColor: "#fcfaed",
                borderColor: "#fd8638", // Set the border color to orange
                color: "#000",
              }}
              placeholder="Choose breeds"
              onChange={onChange}
              options={breedOptions}
            />
          </div>

          <div className="flex-1"></div>
          <div>
            <button
              className="flex flex-col items-center bg-[#fcfaed] hover:bg-[#fd8638] text-black font-bold py-2 px-4 rounded"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <Image
                src="/button-three-cats.jpg"
                alt="Button Cats"
                layout="responsive"
                width={500}
                height={500}
                className="w-full"
              />
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <Spin tip="Loading" size="large"></Spin>
          </div>
        ) : cats.length === 0 ? (
          <div className="flex flex-1 justify-center pt-10 px-2">
            <p>Uh-oh, no cats here! 🐾 Tap the button with three cats to fetch more fluffy friends!</p>
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            <div className="p-2 flex justify-center">
              <Pagination
                className="pagination-custom"
                defaultCurrent={1}
                total={total}
                pageSize={limit}
                showSizeChanger={false}
                current={page}
                onChange={(page) => {
                  setPage(page);
                }}
              />
            </div>

            <div className="overflow-y-auto p-4 flex-1">
              {!!cats.length && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cats.map((cat) => (
                    <div
                      className="w-full rounded overflow-hidden shadow-lg"
                      key={cat.id}
                    >
                      <CatCard
                        cat={cat}
                        updateCatLocalState={updateCatLocalState}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-2 flex justify-center">
              <Pagination
                className="pagination-custom"
                defaultCurrent={1}
                total={total}
                pageSize={limit}
                showSizeChanger={false}
                current={page}
                onChange={(page) => {
                  setPage(page);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        handleConfirm={resetDatabase}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Home;
