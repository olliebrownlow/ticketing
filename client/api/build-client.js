import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server
    // requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local
    // this utilises the ingress-nginx-controller namespace not currently available on minikube
    // below is the workaround
    return axios.create({
      baseURL: "http://auth-srv:3000",
      headers: req.headers,
    });
  } else {
    // we are on the browser
    return axios.create({
      baseUrl: "/",
    });
  }
};
