import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { expertise } from '../utils/arraysConstants';

export default function MultiSelectDropDown({ skillSet, setSkillSet }) {
//   const [selectedCities, setSelectedCities] = useState(null);

  const groupedItemTemplate = (option) => (
    <div className="flex align-items-center">
      <div>{option.label}</div>
    </div>
  );

  return (
    <div className="card flex justify-content-center custom-card-div">
      <MultiSelect
        value={skillSet}
        options={expertise}
        onChange={
            (e) => {
            //   console.log('selections:', skillSet);
              setSkillSet(e.value);
            }
        }
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        placeholder="Choose Expertise"
        optionGroupTemplate={groupedItemTemplate}
        display="chip"
        className="w-full md:w-20rem"
      />
    </div>
  );
}
