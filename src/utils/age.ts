//计算年龄
const getAge = (birthday: string) => {
  // console.log(birthday);
  const currentDate = new Date();
  const dateOfBirth = new Date(birthday);
  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  if (currentDate.getMonth() < dateOfBirth.getMonth()) {
    age--;
  }
  if (
    currentDate.getMonth() === dateOfBirth.getMonth() &&
    currentDate.getDate() < dateOfBirth.getDate()
  ) {
    age--;
  }
  return age;
};

export default getAge;
