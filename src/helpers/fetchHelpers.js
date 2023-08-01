const fetchHelpers = async (endoint, method, data) => {
  const url = 'https://tes-mobile.landa.id/api' + endoint
  const rawResponse = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const content = await rawResponse.json();
  if (!rawResponse.ok) throw content
  if (content.status_code !== 200) throw { message: content.message }
  return content
}

export default fetchHelpers