
<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/taufik17/alamanak">
    <img src="https://res.cloudinary.com/dbpfwb5ok/image/upload/v1659148545/portofolio/recipe/2_kpnvj7.png" alt="Logo" width="150px">
  </a>

  <h3 align="center">Mama Recipe</h3>

  <p align="center">
    Mama Recipe RESTful APIs using Express.
    <br />
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
Mama Recipe Restful API is a service food recipe for multiple food categories and provide all the ingredients with video steps managed by owner recipe.

### Built With
This app was built with some technologies below:
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Multer](https://www.npmjs.com/package/multer)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* [Node.js](https://nodejs.org/en/download/)

### Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](https://www.postgresql.org/) I used PostgreSQL

### Installation

- Clone the Repo
```
git clone https://github.com/rezcode/food-recipe-expressJS.git
```

```
- Install Module
```
npm install
```
- Create new database named `mama_recipes`
- Restore database file in `database/db` using pgadmin4

- <a href="#setup-env-example">Setup .env</a>
- Type ` npm run dev` To Start Development
- Type ` npm run start` To Start Production

### Setup .env example

Create .env file in your root project folder.

```env
DB_USERNAME=
DB_HOST=
DB_NAME=
DB_PASS=
DB_PORT=
SECRET_KEY=
ENV_MODE=
DB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```


## REST API

You can view my Postman collection [here](https://documenter.getpostman.com/view/21471690/VV51taEf)
</br>

<img src="https://res.cloudinary.com/dll4afml9/image/upload/v1662476868/screenshots/Screen_Shot_2022-09-06_at_23.06.49_y2fhb8.png" alt="Postman-documentation">

## Related Project
:rocket: [`Backend Mama Recipe`](https://github.com/rezcode/food-recipe-expressJS.git)

:rocket: [`Frontend Mama Recipe`](https://github.com/rezcode/food-recipe-reactjs.git)

## Contact

My Email : rezharians@gmail.com

## License
Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">back to top</a>)</p>
