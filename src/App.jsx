import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./components/Card";
import { fetchData } from "./store/actions/actionCreator";
import Navbar from "./components/Navbar";

function App() {
  const menus = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <Navbar/>
      <div className="flex flex-row flex-wrap w-4/5 m-auto">
        {menus.map((el) => {
          return <Card key={el.id} menu={el}></Card>;
        })}
      </div>
    </>
  );
}

export default App;
