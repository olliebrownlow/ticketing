## Ticketing web application with a microservices architecture

Ticket selling website written in Typescript and using a microservices structure.

## Tech stack

- Docker
- Kubernetes
- Skaffold
- Typescript 3.9.5
- ts-node-dev 1.0.0-pre.49
- Express 4.17.1

## Getting started

_Make sure to follow the [NGINX Ingress Controller installation guide](https://kubernetes.github.io/ingress-nginx/deploy/#provider-specific-steps) before running the following steps:_

- In your text editor, open the hosts file on your computer (C:\Windows\System32\Drivers\etc\hosts on Windows or /etc/hosts on MacOS/Linux) and add this line to the end: 127.0.0.1 ticketing.dev. You may need to do this as an administrator. This will force your operating system to connect to itself, your local machine, every time you try to browse to ticketing.dev.

_You will need to be signed in to your Docker account and be running Docker and Kubernetes. In case you plan to make changes to the code, install Skaffold on your system for a better dev experience_

- Clone this repository to the directory of your choice: `git clone https://github.com/olliebrownlow/ticketing.git`
- cd into the directory: `cd ticketing`
- Change any occurences in the yaml files of my Docker hub username to your own
- Run Skaffold to start the Kubernetes cluster and deploy the app: `skaffold dev` (try `skaffold dev --trigger polling` if you find that Skaffold is not automatically redeploying after any code changes.)
- Navigate to https://ticketing.dev/api/users/currentuser in a browser of your choice and you should be able to use the app. Note that if you experience a security warning, try again in a **Chrome** browser, click anywhere on the page and bypass the warning by typing "thisisunsafe".
