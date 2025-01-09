export const isValidForm = {
  email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  quantity(value) {
    console.log(value);
    
    return Number.parseInt(value)  <= 1000;
  }
};
