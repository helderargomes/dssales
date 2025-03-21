import './styles.css';
import flatpickrLib from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import FlatPicker from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

flatpickrLib.localize(Portuguese);

function Filter() {
  const onChangeDate = (dates: Date[]) => {
    console.log(dates);
  };

  return (
    <div className="base-card filter-container">
      <FlatPicker
        options={{
          mode: 'range',
          dateFormat: 'd/m/Y',
          showMonths: 2
        }}
        className="filter-input"
        onChange={onChangeDate}
        placeholder="Selecione um período"
      />
      <select className="filter-input">
        <option value="">Selecione um gênero</option>
        <option value="MALE">Masculino</option>
        <option value="FEMALE">Feminino</option>
        <option value="OTHER">Outro</option>
      </select>
    </div>
  );
}

export default Filter;
