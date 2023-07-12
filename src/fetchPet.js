//Used to make the request to the API
const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  //Notice the if conditional. We need it to throw if there's an error and fetch wouldn't
  //throw here if there's a 400 or a 500 error. We need it to.
  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPet;
