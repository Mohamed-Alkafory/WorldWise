function Flag({ countryCode, countryName, className }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
      alt={countryName}
      width="40"
      height="30"
      className={className}
    />
  );
}

export default Flag;
