export const fetchDataBase = async () => {
  const result = await fetch("./bd/bd.json");
  return await result.json();
};