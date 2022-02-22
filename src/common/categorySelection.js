
export const categorySelection = (selectedCategories = [
    'choose', 'choose', 'choose',
    'choose', 'choose', 'choose',
  ],
  setSelectedCategories, allCategories, navigate) => {
  const quickCategories = [...selectedCategories];

  quickCategories.forEach((quickCategory, i) => {
    if(quickCategory !== 'choose') return;
    do{
      const newCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
      if (!quickCategories.find(category => category.name === newCategory.name)){
        quickCategories[i] = newCategory;
      }
    }while(quickCategories[i] === 'choose');
  })
  setSelectedCategories(quickCategories);
  return navigate('/game');
};
