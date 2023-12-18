import styles from "./Section.module.css";
import Card from "./Card";
import Carousel from "./Carousel";

export function Section({ foodCatagories, foodItems, search, setSearch }) {
  console.log(foodCatagories, foodItems);

  const options = search;

  return (
    <div>
      <Carousel search={search} setSearch={setSearch} />
      <div>
        <div className="container">
          {foodCatagories.length !== 0
            ? foodCatagories.map((cata) => {
                return (
                  <div key={cata._id} className="row mb-3">
                    <div className={`fs-4 fw-bold text-dark m-4 ${styles.ts}`}>
                      {cata.CategoryName}
                    </div>
                    <hr />
                    {foodItems.length !== 0 ? (
                      foodItems
                        .filter(
                          (item) =>
                            item.CategoryName === cata.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((filteredItems) => {
                          return (
                            <div
                              key={filteredItems._id}
                              className="col-12 col-md-6 col-lg-4"
                            >
                              <Card filteredItems={filteredItems} />
                            </div>
                          );
                        })
                    ) : (
                      <div>No Such Data Found.</div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Section;
