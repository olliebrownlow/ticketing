# Ticketing web application with a microservices architecture

Ticket selling website written in Typescript and using a microservices structure.

Users can browse tickets for upcoming events, and can sign up to purchase those tickets or advertise to sell tickets they own but no longer want.

## Tech stack

- Docker
- Kubernetes
- Skaffold
- Typescript 3.9.5
- ts-node-dev 1.0.0-pre.49
- Express 4.17.1
- Next 9.4.4
- React 16.13.1
- React-dom 16.3.1
- Bootstrap 4.5.0
- Jest 26.1.0
- Supertest 4.0.2

## Getting started

_Follow the [NGINX Ingress Controller installation guide](https://kubernetes.github.io/ingress-nginx/deploy/#provider-specific-steps) before running the following steps:_

- In your text editor, open the hosts file on your computer (C:\Windows\System32\Drivers\etc\hosts on Windows or /etc/hosts on MacOS/Linux) and add this line to the end: 127.0.0.1 ticketing.dev (if you are using minikube, run the command `minikube ip` and replace 127.0.0.1 with whatever is the result of that command). You may need to do this as an administrator. This will force your operating system to connect to itself, your local machine, every time you try to browse to ticketing.dev.

_You will need to be signed in to your Docker account and be running Docker and Kubernetes. In case you plan to make changes to the code, install Skaffold on your system for a better dev experience_

- Clone this repository to the directory of your choice: `git clone https://github.com/olliebrownlow/ticketing.git`
- cd into the directory: `cd ticketing`
- Run `npm install`
- Change any occurences in the yaml files of my personal Docker hub username to your own
- ( If using minikube, run `minkube start`)
- Run Skaffold to start the Kubernetes cluster and deploy the app: `skaffold dev` (try `skaffold dev --trigger polling` if you find that Skaffold is not automatically redeploying after any code changes.)
- Navigate to https://ticketing.dev in a browser of your choice and you should be able to use the app. Note that if you experience a security warning, try again in a **Chrome** browser, click anywhere on the page and bypass the warning by typing "thisisunsafe". (Further note if using minikube: if you are getting a "This site can’t be reached ticketing.dev refused to connect" message, in a separate console run `minikube addons enable ingress`

## Structure

Eventually the app will make use of 4 resources, consisting of the indicated properties and types:

- User
  - email (string)
  - password (string)
- Ticket
  - title (string)
  - price (number)
  - userId (Ref to User)
  - orderId (Ref to Order)
- Order
  - userId (Ref to User)
  - status (created/cancelled etc)
  - ticketId (Ref to Ticket)
  - expiresAt (Date)
- Charge
  - orderId (Ref to Order)
  - status (Created/Failed etc)
  - amount (number)
  - stripeId (string)
  - stripeRefundId (string)

and utilise 5 services in a 1-2-1 mapping of the above plus one extra service - _expiration_ - to keep an eye on orders that are in creation, cancelling them if they are not completed within a designated amount of time (e.g. 15 minutes):

- auth
  - singup/signin/signout etc
- tickets
  - ticket creation/editing
- orders
  - order creation/editing
- payments
  - payments and payment success/failure
- expiration
  - watches order creation, payment failure/success

The services will store data in a _mongodb_ database, except for expiration which will use _Redis_.

The client app (front-end) will be written using _Next.js_, and the event bus that is used will make use of _NATS Streaming Server_.

Finally, all reusable code will be written into it's own library called _common_. _common_ is published to [npmjs.com](https://www.npmjs.com/) and pulled in as a dependency into the services that make use of it. It can be found [here](https://www.npmjs.com/package/@osbticketing/common) or by searching for "osbticketing" in [npmjs.com](https://www.npmjs.com/).

## Testing

Testing uses mongodb-memory-server, an in-memory database.

To run the tests, navigate to the relevant service and run `npm run test`.
