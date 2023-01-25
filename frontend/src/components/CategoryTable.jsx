/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoryTable() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const categoryColumns = ["Name", "image", "description"];
  const [allCategory, setAllCategory] = useState([]);
  const [modif, setModif] = useState(false);
  const [modifiedCategory, setModifiedCategory] = useState({
    name: "",
    img: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`${backUrl}/api/category`)
      .then((res) => setAllCategory(res.data))
      .catch((err) => console.error(err));
  }, [modif, setModif]);

  const deleteCategory = (id) => {
    axios
      .delete(`${backUrl}/api/category/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  const modifyCategory = (id) => {
    axios
      .put(`${backUrl}/api/category/${id}`, modifiedCategory)
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
          <td>Modifier</td>
          <td>Delete</td>
        </tr>
        {allCategory.map((cat) => (
          <tr key={cat.id}>
            <td>
              {modif ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setModifiedCategory({
                      ...modifiedCategory,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                cat.name
              )}
            </td>
            <td className="imgContainer">
              {modif ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setModifiedCategory({
                      ...modifiedCategory,
                      img: e.target.value,
                    })
                  }
                />
              ) : (
                cat.img
              )}
            </td>
            <td>
              {modif ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setModifiedCategory({
                      ...modifiedCategory,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                cat.description
              )}
            </td>
            <td>
              {modif ? (
                <button
                  type="button"
                  onClick={() => {
                    setModif(false);
                    modifyCategory(cat.id);
                  }}
                >
                  Done
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setModif(true);
                  }}
                >
                  Modifier
                </button>
              )}
            </td>
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
