/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoryTable() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const categoryColumns = ["Name", "Image", "Description"];
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
    <div>
      <h1 className="tableTitle">Category List</h1>
      <table>
        <thead>
          <tr className="columnRow">
            {categoryColumns.map((col, i) => (
              <td key={i} className="column">
                <h3 className="content">{col}</h3>
              </td>
            ))}
            <div className="modifContainer">
              <td className="modifTd">
                <h3>Modifier</h3>
              </td>
              <td className="modifTd">
                <h3>Supprimer</h3>
              </td>
            </div>
          </tr>
        </thead>
        <tbody>
          {allCategory.map((cat) => (
            <tr key={cat.id}>
              <td className="columnContainer">
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
                  <p className="content">{cat.name}</p>
                )}
              </td>
              <td className="columnContainer">
                {modif ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setModifiedCategory({
                        ...modifiedCategory,
                        img: e.target.value,
                      })
                    }
                    className="columntext"
                  />
                ) : (
                  <p className="content">{cat.img}</p>
                )}
              </td>
              <td className="columnContainer">
                {modif ? (
                  <textarea
                    type="text"
                    onChange={(e) =>
                      setModifiedCategory({
                        ...modifiedCategory,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="content">{cat.description}</p>
                )}
              </td>
              <td className="columnContainer">
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
                    className="modifyBtn"
                    type="button"
                    onClick={() => {
                      setModif(true);
                    }}
                  >
                    Modif
                  </button>
                )}
              </td>
              <td>
                <button
                  className="modifyBtn"
                  type="button"
                  onClick={() => deleteCategory(cat.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
