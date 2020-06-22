import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroEditForm = ({ hero, onSave, onCancel }) => {
  const [heroValues, setHeroValues] = useState(hero);

  const handleChange = (e, fieldName) => {
    setHeroValues({
      ...heroValues,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) {
      onSave(heroValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Personagem</h1>

      <div>
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          type="text"
          value={heroValues.name}
          onChange={(e) => handleChange(e, 'name')}
        />
      </div>

      <div>
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          onChange={(e) => handleChange(e, 'description')}
        >
          {heroValues.description}
        </textarea>
      </div>

      <input type="submit" value="Salvar" className="button" />
      <Link onClick={onCancel} style={{ marginLeft: '12px' }}>
        Cancelar
      </Link>
    </form>
  );
};

export default HeroEditForm;
