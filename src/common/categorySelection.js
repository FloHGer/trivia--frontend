
export const categorySelection = (selectedCategories = [], setSelectedCategories, allCategories, navigate) => {
  const quickCategories = selectedCategories.length ? [...selectedCategories] : [];
  for (let i = 0; quickCategories.length < 6; i++) {
    const newCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
    if (!quickCategories.find(category => category === newCategory)) quickCategories.push(newCategory);
  }
  setSelectedCategories(quickCategories);
  return navigate('/game');
};
