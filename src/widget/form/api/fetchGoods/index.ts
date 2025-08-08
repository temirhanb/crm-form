export const fetchGoods = async () => {
  const result = await fetch("./bd/goods.json");
  return await result.json();
};