"use client";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Pagination, Select } from "antd";
import React, { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const limit = 12;
const unknownBreed = { label: "Unknown", value: "unknown" };

const Home = () => {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  const [breedOptions, setBreedOptions] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  const toggleFavoriteFilter = () => {
    setFavoritesFilter(!favoritesFilter);
  };

  const toggleFavorite = (id) => { 
    let url = `${API_URL}/api/cats/${id}/favorite/`;
    fetch(url, {
      method: "PUT",
    }).then((res) => {
      return res.json();
    })
    .then((data) => {
      setCats(
        cats.map((cat) =>
          cat.id === id ? { ...cat, favorite: data.favorite } : cat
        )
      );
    });
  }

  const onChange = (value, options) => {
    setSelectedBreeds(value);
  }

  const resetDatabase = () => {
    fetch(`${API_URL}/api/cats/reset/`, {
      method: "POST",
    }).then(() => {
      setPage(1);
      setFavoritesFilter(false);
      setSelectedBreeds([]);
    });
  }

  useEffect(() => {
    let url = `${API_URL}/api/cats/?limit=${limit}&skip=${
      (page - 1) * limit
    }`;
    if (favoritesFilter) {
      url += "&favorite=true";
    }
    if (selectedBreeds.length) {
      url += `&breeds=${selectedBreeds.join(",")}`;
    }
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
        setBreedOptions([unknownBreed, ...data.breeds.map((breed) => ({
          label: breed.name,
          value: breed.id,
        }))]);
      });
  }, [page, favoritesFilter, selectedBreeds]);

  useEffect(() => {
    setPage(1);
    }, [favoritesFilter, selectedBreeds]);

  return (
    <>
      <div className="flex f-full overflow-hidden max-h-screen flex-col">
        <div className="bg-gray-800 text-white flex justify-center header-part">
          <h1 className="text-3xl font-bold">Purrfect Pix</h1>
        </div>
        <div className="flex flex-1 overflow-hidden main-part">
          <div className="main-left-part ">
            <div>
              <button
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleFavoriteFilter}
              >
                {favoritesFilter ? <HeartFilled className="text-red-500"/> : <HeartOutlined />} 
              <span className="">Favorites only</span>
              </button>
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Breeds
              </button>
              <Select
                className="select-font"
                popupClassName="select-font"
                mode="tags"
                style={{
                  width: "100%",
                }}
                placeholder="Choose breeds"
                onChange={onChange}
                options={breedOptions}
              />
            </div>
            <div className="flex-1"></div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetDatabase}>
                Reset Database
              </button>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="p-2 flex justify-center">
              <Pagination
                defaultCurrent={1}
                total={total}
                pageSize={limit}
                showSizeChanger={false}
                current = {page}
                onChange={(page) => {
                  setPage(page);
                }}
              />
            </div>

            <div className="overflow-y-auto p-4 flex-1">
              {!!cats.length && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cats.map((cat) => (
                    <div
                      className="max-w-sm rounded overflow-hidden shadow-lg"
                      key={cat.id}
                    >
                      <img className="w-full" src={cat.url} alt="Cat" />
                      <div className="px-6 py-4">
                        {cat.favorite ? (
                          <HeartFilled
                            className="text-red-500"
                            onClick={() => {
                              toggleFavorite(cat.id);
                            }}
                          />
                        ) : (
                          <HeartOutlined
                            onClick={() => {
                              toggleFavorite(cat.id);
                            }}
                          />
                        )}
                        <div className="font-bold text-xl mb-2">Cat</div>
                        <p className="text-gray-700 text-base">{cat.url}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!cats.length && (
                <div className="flex justify-center">
                  <p>No cats found</p>
                </div>
              )}
            </div>
            <div className="p-2 flex justify-center">
              <Pagination
                defaultCurrent={1}
                total={total}
                pageSize={limit}
                showSizeChanger={false}
                current = {page}
                onChange={(page) => {
                  setPage(page);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
