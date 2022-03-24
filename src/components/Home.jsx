import React, { useState, useEffect } from "react";
import "./css/home.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getdata() {
      const list = await fetch("http://localhost:2022");
      const finaldata = await list.json();
      setData(finaldata);
    }
    getdata();
  }, []);
  console.log(data);

  return (
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
