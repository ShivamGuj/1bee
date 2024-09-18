import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { favEmail } from "./redux/emailSlice";
import Card from "./components/card";

const App = () => {
  const [data, setData] = React.useState([]);
  const [fullData, setFullData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [click, setClick] = React.useState(false);
  const [card, setCard] = React.useState({});
  const [readtab, setReadtab] = React.useState(false);
  const [Unreadtab, setUnreadtab] = React.useState(false);
  const [favtab, setFavtab] = React.useState(false);

  const dispatch = useDispatch();
  const fav = useSelector((state) => state.email.favArr);

  const fetchData = () => {
    axios
      .get(`https://flipkart-email-mock.vercel.app/?page=${page}`)
      .then((response) => {
        setData(response.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`https://flipkart-email-mock.now.sh/`)
      .then((response) => {
        setFullData(response.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const read = [];

  data.map((item) => {
    read[item.id] = false;
    //console.log(item);
  });

  const handleGetFav = () => {
    setData(fav);
  };

  const handlefav = () => {
    dispatch(favEmail(card));
  };

  const handleCard = (card) => {
    read[card.id] = true;
    setCard(fullData.filter((item) => item.id === card.id));
    setClick(true);
  };

  const handleUnread = () => {
    setData(data.filter((item) => read[item.id] === false));
  };

  const handleRead = () => {
    setData(data.filter((item) => read[item.id] === true));
  };

  console.log(data);
  return (
    <div className="bg-[#F4F5F9] text-[#636363] flex flex-row gap-2">
      <div className="flex flex-col">
        <nav className="flex flex-row gap-2 p-4 items-center">
          <span>Filter By: </span>
          <div
            className={`cursor-pointer p-2 hover:bg-[#CFD2DC] rounded-xl ${
              readtab ? "" : ""
            }`}
            onClick={handleUnread}
          >
            <span>Unread</span>
          </div>
          <div
            className={`cursor-pointer p-2 hover:bg-[#CFD2DC] rounded-xl ${
              Unreadtab ? "" : ""
            }`}
            onClick={handleRead}
          >
            <span>Read</span>
          </div>
          <div
            className={`cursor-pointer p-2 hover:bg-[#CFD2DC] rounded-xl ${
              favtab ? "" : ""
            }`}
            onClick={handleGetFav}
          >
            <span>Favorites</span>
          </div>
        </nav>
        <div className="flex flex-col gap-3">
          {data.map((item, index) => (
            <div key={index} onClick={handleCard}>
              <Card item={item} />
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => setPage(page - 1)}>Previous</button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
      {click && (
        <div>
          <img src="" alt="" />
          <div>
            <div>
              <span>{card.name}</span>
              <span>{card.date}</span>
            </div>
            <button conClick={handlefav}>Add to fav</button>
          </div>
          <div>
            <span>{card.body}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
