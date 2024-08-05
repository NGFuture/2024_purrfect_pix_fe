import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { API_URL } from "./config";
import EditableText from "./EditableText";

export default function CatCard({ cat, updateCatLocalState }) {
  const toggleFavorite = (id) => {
    let url = `${API_URL}/api/cats/${id}/favorite/`;
    fetch(url, {
      method: "PUT",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        updateCatLocalState(data);
      });
  };

  const updateCatData = (params) => {
    let url = `${API_URL}/api/cats/${cat.id}/`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        updateCatLocalState(data);
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 justify-center items-center flex bg-gray-200">
        <img className="w-full" src={cat.url} alt="Cat" />
      </div>
      <div className="px-6 py-4">
        <div className="flex gap-2 min-h-[30px] max-h-[80px] overflow-y-auto items-center">
          <label className="">Name:</label>
          <EditableText
            value={cat.name}
            onEdit={(value) => {
              updateCatData({ name: value });
            }}
          />
        </div>
        <div className="flex gap-2 h-[30px] items-center">
          <label>Breed:</label>
          <div>
            {cat.breeds?.length ? cat.breeds.map((breed) => { 
              return breed.name
            })
            .join(", ")
          : "Unknown"}
          </div>
        </div>
        <div className="flex gap-2 h-[30px] items-center">
          <label>Description:</label>
          <EditableText
            value={cat.description}
            onEdit={(value) => {
              updateCatData({ description: value });
            }}
          />
        </div>
      </div>

      <div className="flex justify-end px-6 py-4">
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
      </div>
    </div>
  );
}
