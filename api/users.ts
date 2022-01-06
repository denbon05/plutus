// we can get data from any DB
async function getDataFromDB() {
  return (await require('axios').get(`https://reqres.in/api/users?page=1`))
    .data;
}

async function index() {
  const res = await getDataFromDB();

  // some business logic
  let ret = res.data.map((el: any) => {
    return {
      id: el.id,
      full_name: el.first_name + ' ' + el.last_name,
      highlight: el.first_name.charAt(0) === 'J',
    };
  });
  ret = ret.sort(() => 0.5 - Math.random());

  return ret;
}

async function show({ id }: any) {
  const res = await getDataFromDB();

  return res.data.filter((el: any) => el.id === id)[0];
}

export { index, show };
