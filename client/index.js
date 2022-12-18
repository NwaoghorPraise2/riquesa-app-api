console.log('Client Called');
const test = document.getElementById('get');

fetch('http://localhost:5500/api/v1', {
  method: 'get',
})
  .then((res) => res.json())

  .then((users) => {
    // const userss = users.body;
    const check = users;
    const fine = check.users;

    console.log(check.users);

    fine.forEach((username) => {
      const final = username.username;
      document.write(`<p>${final}</p>`);
    });
  })
  .catch((err) => console.log(err));
