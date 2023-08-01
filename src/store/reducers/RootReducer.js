const initialState = {
  data: [],
  keranjang: [],
  pesanan:[]
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'menus/fetchSuccess':
      return { ...state, data: action.payload }
    case 'menus/tambahKeranjang':
      return { ...state, keranjang: [...state.keranjang, action.payload] }
    case 'menus/bersihkanKeranjang':
      return { ...state, keranjang: [] }
    case 'menus/hapusMenuKeranjang':
      const keranjangSekarang = [...state.keranjang]
      keranjangSekarang.splice(keranjangSekarang.findIndex(el => el.id == action.payload.id), 1)
      return { ...state, keranjang: keranjangSekarang }
    default:
      return state
  }
}

export default rootReducer