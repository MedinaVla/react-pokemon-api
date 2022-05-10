import React from "react";
const PokemonDetail = ({ poken }) => {
  return (
    <div id={poken.name} className="modal">
      <div className="modal-contenido">
        <a href="#" className="close"></a>

        <img
          id="modal-img"
          alt={poken.sprites.front_default}
          src={poken.sprites.other.dream_world.front_default}
        />
        <div className="poken-datails">
          <h2>{poken.name}</h2>
          <div>base_experience:{poken.base_experience}</div>
          <div>hp: {poken.stats[0].base_stat}</div>
          <div>attack:{poken.stats[1].base_stat}</div>
          <div>defense:{poken.stats[2].base_stat}</div>
          <div>special:{poken.stats[3].base_stat}</div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
