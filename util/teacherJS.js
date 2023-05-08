// Get the form element and add a submit event listener
const form = document.querySelector("#car-form");
form.addEventListener("submit", handleSubmit);

// Define the renderCar function
function renderCar(car) {
  const carContainer = document.querySelector("#car-container");
  const carCard = document.createElement("div");
  carCard.classList.add("car-card");

  // Create the HTML for the car card
  carCard.innerHTML = `
		<h2>${car.getMake()} ${car.getModel()}</h2>
		<p>Year: ${car.getYear()}</p>
		<p>Color: ${car.getColor()}</p>
	`;

  // Add the car card to the car container
  carContainer.appendChild(carCard);
}

// Define the handleSubmit function
function handleSubmit(e) {
  e.preventDefault();

  // Get the form values and create a new Car object
  const make = e.target.make.value;
  const model = e.target.model.value;
  const year = e.target.year.value;
  const color = e.target.color.value;
  try {
    const newCar = new Car(make, model, year, color);

    if (!("getMake" in newCar.constructor.prototype)) {
      throw new Error(
        "Make is required. Please make sure that a getter is defined for this property in your class."
      );
    }
    if (!("getModel" in newCar.constructor.prototype)) {
      throw new Error(
        "Model is required. Please make sure that a getter is defined for this property in your class. "
      );
    }
    if (!("getYear" in newCar.constructor.prototype)) {
      throw new Error(
        "Year is required. Please make sure that a getter is defined for this property in your class."
      );
    }
    if (
      isNaN(year) ||
      newCar.getYear() < 1900 ||
      newCar.getYear() > new Date().getFullYear()
    ) {
      throw new RangeError(
        "Year must be a valid number between 1900 and the current year."
      );
    }
    if (!("getColor" in newCar.constructor.prototype)) {
      throw new Error(
        "Color is required. Please make sure that a getter is defined for this property in your class."
      );
    }

    // Render the new Car object to the page
    renderCar(newCar);

    // Reset the form
    form.reset();
  } catch (e) {
    if (e instanceof ReferenceError) {
      alert(
        "It seems that a class called 'Car' has not been defined. Try defining it and filling out the form again"
      );
    }
    if (e instanceof RangeError) {
      alert(e.message);
    } else {
      alert(e.message);
    }
  }
}
