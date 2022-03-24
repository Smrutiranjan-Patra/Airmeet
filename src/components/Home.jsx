import React, { useState, useEffect } from "react";
import "./css/home.css";
import {
  DoubleBubble,
} from "react-spinner-animated";

import "react-spinner-animated/dist/index.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getdata() {
      const list = await fetch("http://localhost:2022");
      const finaldata = await list.json();
      setData(finaldata);
      setLoading(false);
    }

    getdata();
  }, []);
  console.log(data);

  return loading ? (
    <div className="loading">
      <DoubleBubble
        text={""}
        bgColor={"tra"}
        width={"100px"}
        height={"100px"}
      />
    </div>
  ) : (
    <div className="Home">
      <div className="tablebox">
        <tbody>
          {data.map((e) => (
            <tr className="table" key={e.id}>
              <th className="box1">
                <input type="checkbox" className="checkbox" />
              </th>
              <th className="box2">
                <p>{e.name}</p>
              </th>
              <th className="box3">
                <img src={e.profile} alt="profile" />
              </th>
              <th className="box4">
                <button>Delete</button>
              </th>
              <th className="box5">
                <button>Add to Favorite</button>
              </th>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
};

export default Home;
