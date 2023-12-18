function Carousel({ search, setSearch }) {
  function handleChange(e) {
    setSearch(e.target.value);
  }
  function submitForm(e) {
    e.preventDefault();
  }

  return (
    <div
      className={`carousel slide`}
      id="carousel"
      data-bs-ride="carousel"
      data-bs-theme="dark"
      style={{ objectFit: "fill" }}
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="3000">
          <img
            src="https://source.unsplash.com/random/1080x500/?burger"
            alt="image of foods"
            className={`w-100 d-block`}
            style={{ filter: "brightness(50%)" }}
          />
        </div>

        <div className="carousel-item" data-bs-interval="3000">
          <img
            src="https://source.unsplash.com/random/1080x500/?noodles"
            alt="image of foods"
            className={`w-100 d-block`}
            style={{ filter: "brightness(50%)" }}
          ></img>
        </div>

        <div className="carousel-item" data-bs-interval="3000">
          <img
            src="https://source.unsplash.com/random/1080x500/?biriyani"
            alt="image of foods"
            className={`w-100 d-block`}
            style={{ filter: "brightness(50%)" }}
          ></img>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        data-bs-slide="prev"
        data-bs-target="#carousel"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        data-bs-slide="next"
        data-bs-target="#carousel"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
      <div className="carousel-caption" style={{ zIndex: "10" }}>
        <form
          className="d-flex w-75 m-auto mb-5 input-group input-group-lg"
          action="search"
          onSubmit={submitForm}
        >
          <input
            className="form-control"
            type="search"
            placeholder="Search foods..."
            value={search}
            onChange={handleChange}
          />
          <button className="btn btn-warning bi bi-search"></button>
        </form>
      </div>
    </div>
  );
}

export default Carousel;
