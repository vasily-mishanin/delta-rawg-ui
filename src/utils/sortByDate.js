export function sortByDate(array, order = 'ASC') {
  const sortOrder = order === 'ASC' ? 1 : -1;

  return array.sort((a, b) => {
    const dateA = new Date(a.released);
    const dateB = new Date(b.released);

    // Compare the dates
    return sortOrder * (dateA - dateB);
  });
}
