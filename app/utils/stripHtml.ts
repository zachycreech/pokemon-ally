const stripHtml = (html: string): string => {
  return html.replace(/\s+/g, " ").trim();
};

export default stripHtml;
