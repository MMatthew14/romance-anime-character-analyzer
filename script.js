// List of popular romance anime characters
const characters = [];

// Function to display characters
function displayCharacters(characters) {
  const characterList = document.getElementById("characterList");

  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.classList.add("character");
    characterElement.textContent = character;
    // Add image
    const imageElement = document.createElement("img");
    imageElement.src = `images/${character.image}`;
    imageElement.alt = character.name;

    // Add name and anime
    const textElement = document.createElement("span");
    textElement.textContent = `${character.name} (${character.anime})`;

    // Add click event listener
    characterElement.addEventListener("click", () => {
      alert(`You selected: ${character}`);
    });

    characterList.appendChild(characterElement);
  });
}

// Initialize the app
displayCharacters();
