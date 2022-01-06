import knex from '../db/knex.js';

async function getDataFromDB() {
  const data = await knex.select().from('users');
  return { data };
  // return (await require('axios').get(`https://reqres.in/api/users?page=1`))
  //   .data;
}

async function index() {
  const res = await getDataFromDB();

  let ret = res.data.map((el: any) => {
    return {
      full_name: `${el.first_name} ${el.last_name}`,
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
