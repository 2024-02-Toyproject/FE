import './SelectBox.scss';

export default function SelectBox(props) {
  return (
    <select onChange={props.onSelectChange} className="CustomSelect">
      <option selected disabled hidden>
        {props.options[0].name}
      </option>

      {props.options.slice(1).map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
