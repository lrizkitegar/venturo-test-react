import { useDispatch, useSelector } from "react-redux";
import {
  bersikanKeranjang,
  hapusMenuKeranjang,
  tambahKeranjang,
} from "../store/actions/actionCreator";
import { useMemo, useState } from "react";
import fetchHelpers from "../helpers/fetchHelpers";
import Swal from "sweetalert2";

export function Drawer() {
  const keranjang = useSelector((state) => state.keranjang);
  const [catatan, setCatatan] = useState({});
  const [diskon, setDiskon] = useState(0);
  const [voucher, setVoucher] = useState("");
  const [voucherErr, setVoucherErr] = useState("");
  const [pesanan, setPesanan] = useState({});

  const dispatch = useDispatch();

  const totalHargaMenu = useMemo(() => {
    return keranjang.reduce((acc, curr) => acc + curr.harga, 0);
  }, [keranjang]);

  const totalHarga = useMemo(() => {
    return totalHargaMenu - diskon < 0 ? 0 : totalHargaMenu - diskon;
  }, [keranjang, diskon]);

  const tambahKeranjangDrawer = (menu) => {
    dispatch(tambahKeranjang(menu));
  };

  const handleCatatan = (e) => {
    console.log(catatan);
    setCatatan((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const tambahVoucher = async () => {
    try {
      if (!voucher) throw { message: "Data tidak ditemukan" };
      const data = await fetchHelpers("/vouchers?kode=" + voucher);
      console.log(data);
      setVoucherErr("");
      setDiskon(data.datas.nominal);
    } catch (err) {
      setVoucherErr(err.message);
      setDiskon(0);
      console.log(err);
    }
  };

  const voucherChange = (e) => {
    setVoucher(e.target.value);
  };
  const hapusMenuKeranjangDrawer = (menu) => {
    dispatch(hapusMenuKeranjang(menu));
  };

  const handleOrder = async () => {
    try {
      const orderData = {
        nominal_diskon: diskon,
        nominal_pesanan: totalHarga,
        items: keranjang.map((el) => {
          return {
            id: el.id,
            harga: el.harga,
            catatan: catatan[el.id] ? catatan[el.id] : "tanpa catatan",
          };
        }),
      };
      console.log(orderData);
      const data = await fetchHelpers("/order", "POST", orderData);
      setPesanan(data);
      dispatch(bersikanKeranjang())
      Swal.fire({
        icon: "success",
        title: data.message,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleBatalPesanan = async() => {
    try {
      const data = await fetchHelpers("/order/cancel/" + pesanan.id, "POST",);
      setPesanan({})
      Swal.fire({
        icon: "success",
        title: data.message,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="p-4 w-1/3 min-h-screen bg-base-200 flex flex-col">
          <h1 className=" text-2xl font-bold">Keranjang</h1>
          <div className="divider"></div>
          {keranjang.length == 0 ? <p className="font-bold">Pesanan Kosong</p> : keranjang
            .reduce((acc, curr) => {
              const duplicate = acc.findIndex((el) => el[0].id == curr.id);
              if (duplicate !== -1) {
                acc[duplicate][1]++;
              } else {
                acc.push([curr, 1]);
              }
              return acc;
            }, [])
            .map((el, i) => {
              return (
                <div key={i}>
                  <div className="flex flex-row gap-5">
                    <img
                      src={el[0].gambar}
                      alt="keranjang"
                      className=" w-1/3 h-24 object-contain"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{el[0].nama}</p>
                      <p className="text-blue-500 font-bold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(el[0].harga)}
                      </p>
                      <p>{el[0].tipe}</p>
                    </div>
                    <div className=" self-end content-end flex-row flex flex-grow justify-end">
                      <button
                        onClick={() => hapusMenuKeranjangDrawer(el[0])}
                        className="btn btn-primary btn-xs"
                      >
                        -
                      </button>
                      <div className=" align-middle text mx-2">{el[1]}</div>
                      <button
                        onClick={() => tambahKeranjangDrawer(el[0])}
                        className="btn btn-primary btn-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={catatan[el[0].id]}
                    className="input w-full mt-2 mb-2"
                    placeholder="Masukan Catatan di sini"
                    name={el[0].id}
                    onChange={handleCatatan}
                  />
                </div>
              );
            })}
          <div className="divider"></div>
          <div className="flex flex-col">
            <p>Tambah Voucher</p>
            <input
              type="text"
              onChange={voucherChange}
              value={voucher}
              className="input w-full mt-2 mb-2"
              placeholder="Masukan vouchermu di sini"
              name="voucher"
            />
            {voucherErr && (
              <div className="alert alert-error my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{voucherErr}</span>
              </div>
            )}
            <button onClick={tambahVoucher} className="btn btn-primary">
              Add
            </button>
          </div>
          <div className=" flex flex-col flex-grow  justify-end content-end">
            <div className="flex flex-row justify-between my-2">
              <p>Total Harga : </p>
              <p className="font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalHarga)}
              </p>
            </div>
            <label
              htmlFor="my-drawer-4"
              className="btn-primary btn"
              onClick={handleOrder}
            >
              Buat Pesanan
            </label>
          </div>
        </div>
      </div>
      {pesanan.id && (
        <div className="toast">
          <div className="alert alert-info flex flex-col">
            <p>Pesanan No : { pesanan.id}</p>
            <button onClick={handleBatalPesanan} className="btn btn-error btn-xs">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
