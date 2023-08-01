import { useDispatch } from "react-redux";
import { tambahKeranjang } from "../store/actions/actionCreator";
import { useEffect } from "react";

export default function Card({ menu }) {
  const dispatch = useDispatch();
  const tambahKeranjangCard = () => {
    dispatch(tambahKeranjang(menu));
  };
  return (
    <div className="p-10 w-1/3 ">
      <div className="card card-compact w-full h-full bg-base-100 shadow-xl">
        <figure className=" h-52">
          <img src={menu.gambar} alt="menu" className="h-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{menu.nama}</h2>
          <p>{menu.tipe}</p>
          <br />
          <p className="text-blue-500 font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(menu.harga)}
          </p>
          <div className="card-actions mt-5">
            <button onClick={tambahKeranjangCard} className="btn btn-primary flex-grow">
              Tambah ke keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
