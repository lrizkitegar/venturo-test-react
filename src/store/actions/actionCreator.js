import fetchHelpers from '../../helpers/fetchHelpers'
export const successFetchData = (payload) => {
  return {
    type: 'menus/fetchSuccess',
    payload,
  }
}

export const tambahKeranjang = (payload) => {
  return {
    type: 'menus/tambahKeranjang',
    payload,
  }
}
export const hapusMenuKeranjang = (payload) => {
  return {
    type: 'menus/hapusMenuKeranjang',
    payload,
  }
}

export const bersikanKeranjang = () => {
  return {
    type: 'menus/bersihkanKeranjang',
  }
}

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const data = await fetchHelpers('/menus')
      console.log(data)
      dispatch(successFetchData(data.datas))
    } catch (err) {
      console.log(err)
    }
  }
}