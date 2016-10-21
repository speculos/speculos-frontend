
export default async function tokenRequest({token, method, url, data}) {
  return await $.ajax({
    headers : {
      Authorization : `Bearer ${token}`
    },
    dataType : 'json',
    method,
    url,
    data
  })
}
