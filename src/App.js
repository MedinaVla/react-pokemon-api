import { Provider } from "react-redux";
// import generateStore from "./redux/store";
import store from "./redux/store";
import Pokemons from "./components/Pokemones";

function App() {
  return (
    <Provider store={store}>
      <Pokemons />
    </Provider>
  );
}

export default App;
