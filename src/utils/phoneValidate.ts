export const phoneValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawPhoneNumber = e.target.value.replace(/[^0-9]/g, "");
  let formattedPhoneNumber = "";
  if (rawPhoneNumber.length <= 3) {
    formattedPhoneNumber = rawPhoneNumber;
  } else if (rawPhoneNumber.length <= 7) {
    formattedPhoneNumber = `${rawPhoneNumber.slice(
      0,
      3
    )}-${rawPhoneNumber.slice(3)}`;
  } else {
    formattedPhoneNumber = `${rawPhoneNumber.slice(
      0,
      3
    )}-${rawPhoneNumber.slice(3, 7)}-${rawPhoneNumber.slice(7, 11)}`;
  }

  return formattedPhoneNumber;
};
