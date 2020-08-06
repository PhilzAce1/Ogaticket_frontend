const addEventForm = document.querySelector('#add_event');
addEventForm.addEventListener('submit', function (e) {
  e.preventDefault();
  dataX(this);
});
function dataX(e) {
  const name = document.querySelector('#name').value;
  const category = document.querySelector('#cat').value;
  const city = document.querySelector('#city').value;
  const desc = document.querySelector('#desc').value;
  const phone = document.querySelector('#number').value;
  const email = document.querySelector('#email').value;
  const image = document.querySelector('#image');

  //first try
  const data = {
    event_code: 'fs2012',
    event_name: 'fusion',
    event_date: '2020-12-12',
    event_time: '8:00',
    event_description: 'show',
    event_location: 'lagos',
    event_category: 'cat',
    image: 'c://user/img.jpg',
  };
  const reqData = JSON.stringify(data);

  // formdata approach
  const formData = new FormData();
  // formData.append('event_code', 'fs2019');
  // formData.append('event_name', 'name');
  // formData.append('event_description', 'desc');
  // formData.append('event_location', 'city');
  formData.append('image', image.files[0]);
  // formData.append('event_date', '2020-12-12');
  // formData.append('event_time', '9:00');

  const url = 'https://ogatickets.herokuapp.com/api/event/add';
  fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      // 'Content-Type': 'multipart/form-data;charset=utf-8;',
      // Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8;',

      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODU1ZGVjZmMyNGRkN2EwOWI2NzhkZjEzMDM0NmJlOWFhMmFkMzkzYmZjNmY1NGMwNTBjNGRmM2M2YjRjNmY2NDIzYmNkZjVkOTY0Nzc2M2EiLCJpYXQiOjE1OTYxNTQ1NzUsIm5iZiI6MTU5NjE1NDU3NSwiZXhwIjoxNjI3NjkwNTc1LCJzdWIiOiIzMjEiLCJzY29wZXMiOltdfQ.UwMqqEcYIwAQISDmghZZH7Pl8sEx1Po_gi-WZlDuGJyryH4zfh7hkFKhwmnBDJDcobfd2dbHf2PuJh_exPFdeQQEqyx18DeQUZTVLbmGVv1ApTlOsYCIpYoO8-57-XZXyjS2E7W4kUjfz5UHH3J8nFmkXXtS5zgW0G-XO0MxaoL1PFqZQds5aefriHz3SCbRQS5SK9_xZTJiFmyJcVzrBK17lQwN3MAu7sJR4FyLZkO2oGSHckC_cZM0-Jd68GWMYq8SP_tucjXHaShVT7eFa7uh33btJFEKcTInHobFXGAgUgw03l0kb2bQN39GOIeicKU7dAp9hCOxn7-3G5-kf5XogK5eVnz2y_Pqz92g8EuPJCrbssg0SWvAR7wdHu88uycnU_lYNdYJYLIi5lR15oxOOhTo7gUjpB9JMTIqxwApzYux1BhLUOR90stlr-qZGLgLNFH7fQr-gDJyaXUWGPS9wzV8ZNAFN539sLqrQV0X6qXvQvklzGbyJhbvAaONdSBFc79RKSwOAG4KqwpPaXAdzoyiQdM8_K3-fPujagN9-DJgCx1YFc8xmVhTT5dMrFGP3yUaJ_C1fw-tdx6qfh3GiO9Y-DxGnY3DZ8P8fRV9KCeXY1G7EyygfL24Nmuu_-4moG3DfhS3vYXnhdjmz8s_ldOVYF5nB2ufi5jVCIU',
    },
    body: reqData,
  })
    .then((response) => response.json())
    .then((res) => console.log(res))
    .catch((error) => {
      console.error('Error:', error);
    });
}
dataX();
