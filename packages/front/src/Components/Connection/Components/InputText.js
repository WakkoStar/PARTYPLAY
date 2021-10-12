import React from 'react';
import '../style.scss';

const InputText = ({ setState, label }) => (
  <div className="form-group">
    <input
      type="input"
      className="form-field"
      onChange={e => setState(e.target.value)}
    />
    <label className="form-label">{label}</label>
  </div>
);

export default InputText;
