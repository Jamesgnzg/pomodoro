export const useRandomId = () => {
  return "id-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
};
