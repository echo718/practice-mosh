import _ from "lodash";

export function paginate (items, currentPage, pageSize) {
  const index = (currentPage - 1) * pageSize;
  
  return _(items).slice(index).take(pageSize).value();
}
