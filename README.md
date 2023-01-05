<h1 align="center"> Raiders Crew </h1>


### :mega: Que es Riders Crew?
Es una aplicación web para generar viajes en moto, con amigos o conocidos. Donde se pueden subir distintos tipos de post, ya sea con fotos o solo texto. A su vez se pueden añadir comentarios en dichos posts.


- React.js front end and python/flask backend for your web application.
- Extensive documentation [here](https://start.4geeksacademy.com/).
- Integrated with Pipenv for package managing.
- Fast deloyment to heroku [in just a few steps here](https://start.4geeksacademy.com/backend/deploy-heroku-posgres).
- Use of .env file.
- SQLAlchemy integration for database abstraction.



### Context

This boilerplate comes with a centralized general Context API. The file `./src/js/store/flux.js` has a base structure for the store, we encourage you to change it and adapt it to your needs.

React Context [docs](https://reactjs.org/docs/context.html)
BreathCode Lesson [view](https://content.breatheco.de/lesson/react-hooks-explained)

The `Provider` is already set. You can consume from any component using the useContext hook to get the `store` and `actions` from the Context. Check `/views/demo.js` to see a demo.

```jsx
import { Context } from "../store/appContext";
const MyComponentSuper = () => {
    //here you use useContext to get store and actions
    const { store, actions } = useContext(Context);
    return <div>{/* you can use your actions or store inside the html */}</div>;
};
```

