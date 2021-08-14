# partner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:serve` for a dev api server. Navigate to `http://localhost:3000/`. Server side code inside the backend folder and the data stores inside the json files which are under the db folder. Api's created Express framework (Node Js). Here are following api's-

GET `/api/provider/create/:id` for creating a token for partner and it valid for 30 days.

GET `/api/provider/` for getting partner details by passing the token for authorizations.

GET `/api/provider/traffic` for getting data as per total no of request and no of request based on the partner.

![partner1](https://user-images.githubusercontent.com/25032027/128821924-a33eb393-3403-41ee-ae5a-6e3d8bc80f2f.png)
![traffic1](https://user-images.githubusercontent.com/25032027/128821932-5bb8132d-b20d-435e-b790-6ed521b66b10.png)
![traffic2](https://user-images.githubusercontent.com/25032027/128821934-c20370e6-42ed-44a5-a481-5ad3efc3dead.png)
