let sendBtn = document.querySelector('.btn');
sendBtn.addEventListener('click', ()=> {
    let messageWhatsapp = document.querySelector('#message').value;
    let countryArea = document.querySelector('#country').value;
    let numberPhone = document.querySelector('#tel').value;

    let url = `https://api.whatsapp.com/send?phone=${countryArea}${encodeURIComponent(numberPhone)}&text=${encodeURIComponent(messageWhatsapp)}`;
  
  if( numberPhone != "") {
    window.open(url);
  }
});