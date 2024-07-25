export default function selectJobTitle(event, setSelectedOptions) {
  const { name, checked } = event.target;
  setSelectedOptions((prevSelected) => {
    if (checked) {
      return [...prevSelected, name];
    }
    return prevSelected.filter((option) => option !== name);
  });
}
