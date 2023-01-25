/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoryTable() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const categoryColumns = ["Name", "image", "description"];
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${backUrl}/api/category`)
      .then((res) => setAllCategory(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteCategory = (id) => {
    axios
      .delete(`${backUrl}/api/category/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <table>
      <thead>
        <tr className="tableTitle">Category List</tr>
      </thead>
      <tbody>
        <tr>
          {categoryColumns.map((col, i) => (
            <td key={i}>{col}</td>
          ))}
          <td>Delete</td>
        </tr>
        {allCategory.map((cat) => (
          <tr key={cat.id}>
            <td>{cat.name}</td>
            <td className="imgContainer">
              <img className="categoryImg" src={cat.img} alt={cat.name} />
            </td>
            <td>{cat.description}</td>
            <td>
              <button type="button" onClick={() => deleteCategory(cat.id)}>
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CategoryTable;
