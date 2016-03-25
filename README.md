Flighthound
===========
This single-page app allows users to create flight price alerts, and sends them an email when the
price drops. The email backend is currently set up to just print to the console, but you could use
Sendgrid or Mailgun to send mail to users. The frontend is ReactJS, backend is Django Rest
Framework, and it uses token-based authentication. To test it yourself, clone the repository and
run:

`$ pip install -r requirements.txt`
`$ npm install`
`$ npm run build`
`$ python manage.py runserver`

then navigate to `localhost:8000/app/` in your browser.  
