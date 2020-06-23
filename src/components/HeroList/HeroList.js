import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchHeroes } from '../../store/rootStore';
import HeroCard from '../HeroCard/HeroCard';

const HeroList = ({ fetching, total, heroes, fetchHeroes }) => {
  const [nameStartsWith, setNameStartsWith] = useState('');

  // we need to useRef here to keep the
  // reference for debounced function
  const searchHeroes = useRef(
    _.debounce((value) => {
      fetchHeroes({
        offset: 0,
        nameStartsWith: value,
      });
    }, 600)
  );

  useEffect(() => {
    searchHeroes.current(nameStartsWith);
  }, [nameStartsWith, searchHeroes]);

  return (
    <div className="container">
      <form className="hero-search-form">
        <input
          type="text"
          value={nameStartsWith}
          onChange={(e) => setNameStartsWith(e.target.value)}
          placeholder="Encontre seu personagem"
        />
      </form>

      {fetching && (
        <div className="heroes-grid-status-indicator">carregando...</div>
      )}

      {!fetching && heroes.length === 0 && (
        <div className="heroes-grid-status-indicator">
          Nenhum resultado encontrado
        </div>
      )}

      <div className="heroes-grid">
        {heroes.map((hero) => {
          return (
            <Link key={hero.id} to={`/${hero.id}`}>
              <HeroCard {...hero} />
            </Link>
          );
        })}
      </div>

      {heroes.length < total && (
        <div className="heroes-grid-load-more">
          <button
            className="button"
            onClick={() =>
              fetchHeroes({
                offset: heroes.length,
                nameStartsWith,
              })
            }
          >
            {fetching ? 'Carregando...' : 'Mostrar mais personages'}
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ fetching, heroes, total }) => {
  return {
    fetching,
    heroes,
    total,
  };
};

export default connect(mapStateToProps, { fetchHeroes })(HeroList);
