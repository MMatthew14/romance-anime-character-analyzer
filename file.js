// Romance Anime Character Analyzer for Multiple Users

// Personality Types
const personalityTypes = {
  tsundere: {
    description:
      "Tsundere characters are initially cold or hostile but gradually show a warmer, friendlier side over time.",
    traits: ["confident", "stubborn", "emotional"],
  },
  yandere: {
    description:
      "Yandere characters are obsessively in love, often to the point of being dangerous.",
    traits: ["obsessive", "protective", "intense"],
  },
  kuudere: {
    description:
      "Kuudere characters are calm, collected, and often appear emotionless, but they have a soft side.",
    traits: ["calm", "reserved", "logical"],
  },
  dandere: {
    description:
      "Dandere characters are shy and quiet but open up once they feel comfortable.",
    traits: ["shy", "kind", "loyal"],
  },
  deredere: {
    description:
      "Deredere characters are cheerful, loving, and always express their feelings openly.",
    traits: ["cheerful", "affectionate", "optimistic"],
  },
};

// Romantic Tendencies
const romanticTendencies = {
  bold: "This character is bold and direct in expressing their feelings.",
  reserved: "This character is reserved and takes time to open up emotionally.",
  protective:
    "This character is protective and prioritizes their loved one's safety.",
  playful: "This character is playful and enjoys teasing their love interest.",
  obsessive:
    "This character is obsessive and deeply attached to their love interest.",
};

// Compatibility Matrix
const compatibilityMatrix = {
  tsundere: ["deredere", "kuudere"],
  yandere: ["dandere", "kuudere"],
  kuudere: ["tsundere", "yandere"],
  dandere: ["yandere", "deredere"],
  deredere: ["tsundere", "dandere"],
};

// Function to Analyze Character
function analyzeCharacter(traits) {
  let bestMatch = { type: "", score: 0 };

  // Determine Personality Type
  for (const type in personalityTypes) {
    const characterTraits = personalityTypes[type].traits;
    const matchingTraits = traits.filter((trait) =>
      characterTraits.includes(trait)
    );
    const score = matchingTraits.length; // Number of matching traits

    // Update best match if this character has a higher score
    if (score > bestMatch.score) {
      bestMatch = { type, score };
    }
  }

  return {
    personalityType: bestMatch.type || "Unknown",
    romanticTendency: determineRomanticTendency(traits),
  };
}

function determineRomanticTendency(traits) {
  if (traits.includes("bold")) {
    return "bold";
  } else if (traits.includes("reserved")) {
    return "reserved";
  } else if (traits.includes("protective")) {
    return "protective";
  } else if (traits.includes("playful")) {
    return "playful";
  } else if (traits.includes("obsessive")) {
    return "obsessive";
  }
  return "Unknown";
}

// Function to Check Compatibility
function checkCompatibility(user1, user2) {
  if (
    user1.personalityType === "Unknown" ||
    user2.personalityType === "Unknown"
  ) {
    return "Unknown (Cannot determine compatibility)";
  }

  if (
    compatibilityMatrix[user1.personalityType] &&
    compatibilityMatrix[user1.personalityType].includes(user2.personalityType)
  ) {
    return "Compatible";
  }
  return "Not Compatible";
}

// Function to Display Results
function displayResults(users) {
  console.log("=== Romance Anime Character Analysis ===");
  users.forEach((user, index) => {
    console.log(`\nUser ${index + 1} (${user.name}):`);
    console.log(`Personality Type: ${user.personalityType || "Unknown"}`);
    console.log(
      `Description: ${
        personalityTypes[user.personalityType]?.description || "N/A"
      }`
    );
    console.log(`Romantic Tendency: ${user.romanticTendency || "Unknown"}`);
    console.log(
      `Tendency Description: ${
        romanticTendencies[user.romanticTendency] || "N/A"
      }`
    );
  });

  // Display Compatibility
  console.log("\n=== Compatibility Analysis ===");
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      console.log(
        `${users[i].name} (${users[i].personalityType || "Unknown"}) and ${
          users[j].name
        } (${users[j].personalityType || "Unknown"}): ${checkCompatibility(
          users[i],
          users[j]
        )}`
      );
    }
  }
}

// Example Usage
const users = [
  { name: "Alice", traits: ["shy", "kind", "loyal", "reserved"] }, // User 1
  { name: "Bob", traits: ["confident", "stubborn", "emotional"] }, // User 2
  { name: "Charlie", traits: ["calm", "reserved", "logical"] }, // User 3
];

// Analyze Each User
const analyzedUsers = users.map((user) => ({
  ...user,
  ...analyzeCharacter(user.traits),
}));

// Display Results
displayResults(analyzedUsers);
