import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchHeroDetails, saveHero } from '../../store/rootStore';

import HeroSerieList from '../HeroSerieList/HeroSerieList';
import HeroEditForm from '../HeroEditForm/HeroEditForm';

const HeroDetail = ({ fetching, selectedHero, fetchHeroDetails, saveHero }) => {
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchHeroDetails(id);
  }, [fetchHeroDetails, id]);

  if (!fetching && selectedHero) {
    const imagePath = `${selectedHero.thumbnail.path}.${selectedHero.thumbnail.extension}`;
    return (
      <div className="container">
        <div className="hero-detail">
          <div className="hero-card-image">
            <div
              className="content"
              style={{ backgroundImage: `url(${imagePath})` }}
            ></div>
          </div>

          <div className="hero-detail-info">
            {editMode && (
              <HeroEditForm
                hero={selectedHero}
                onSave={(data) => {
                  saveHero(data);
                  setEditMode(false);
                }}
                onCancel={() => setEditMode(false)}
              />
            )}

            {!editMode && (
              <>
                <h1>{selectedHero.name}</h1>
                <p>{selectedHero.description}</p>

                <HeroSerieList {...selectedHero.series} />

                <button className="button" onClick={() => setEditMode(true)}>
                  Editar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // still loading...
  return null;
};

const mapStateToProps = ({ fetching, selectedHero }) => {
  return {
    fetching,
    selectedHero,
  };
};

export default connect(mapStateToProps, { fetchHeroDetails, saveHero })(
  HeroDetail
);
