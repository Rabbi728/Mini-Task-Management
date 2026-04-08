export const formatDateTime = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString.replace('Z', ''));
  return date.toLocaleString();
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString.replace('Z', ''));
  return date.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};
