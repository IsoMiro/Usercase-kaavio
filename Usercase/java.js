// Tarkistetaan, onko localStoragessa jo äänestystietoja, jos ei, käytetään oletusarvoa
let votes = JSON.parse(localStorage.getItem("votes")) || [
    { name: "Paras jäätelömaku", options: ["Vanilja", "Suklaa", "Mansikka"], votes: [5, 3, 2] },
    { name: "Paras vuodenaika", options: ["Kesä", "Syksy", "Talvi", "Kevät"], votes: [8, 6, 1, 2] }
];

// Salasana ylläpitäjän sivulle
const adminPassword = "salasana123";

// Äänestysten listaaminen
function displayVotes(adminView = false) {
    const voteList = document.getElementById("votes");
    if (voteList) {
        voteList.innerHTML = "";

        votes.forEach((vote, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${vote.name}</strong>
                <button onclick="viewVote(${index})">Katso tilanne</button>
                ${adminView ? `<button onclick="deleteVote(${index})">Poista äänestys</button>` : ''}
            `;
            voteList.appendChild(li);
        });
    }
}

// Äänestystilanteen näyttäminen
function viewVote(index) {
    const vote = votes[index];
    const result = vote.options.map((option, i) => `${option}: ${vote.votes[i]} ääntä`).join("<br>");
    alert(result);
}

// Äänestyksen lisääminen
function addVote() {
    const newVoteName = document.getElementById("new-vote").value;
    if (newVoteName) {
        votes.push({ name: newVoteName, options: [], votes: [] });
        localStorage.setItem("votes", JSON.stringify(votes)); // Päivitetään localStorage
        displayVotes(true); // Päivitetään lista ylläpitäjän näkymässä
        document.getElementById("new-vote").value = ""; // Tyhjennä kenttä
    } else {
        alert("Syötä äänestyksen nimi");
    }
}

// Äänestyksen poistaminen
function deleteVote(index) {
    if (confirm("Haluatko varmasti poistaa tämän äänestyksen?")) {
        votes.splice(index, 1);
        localStorage.setItem("votes", JSON.stringify(votes)); // Päivitetään localStorage
        displayVotes(true); // Päivitetään näkyvä lista ylläpitäjän näkymässä
    }
}

// Ylläpitäjän sivulle siirtyminen salasanan tarkistuksella
function redirectToAdmin() {
    const password = prompt("Syötä salasana:");
    if (password === adminPassword) {
        window.location.href = "yllapitaja.html";
    } else {
        alert("Väärä salasana!");
    }
}

// Ladataan äänestykset sivun latautuessa
window.onload = function() {
    // Tarkistetaan, onko kyseessä ylläpitäjän sivu
    const isAdminPage = window.location.pathname.includes("yllapitaja.html");
    displayVotes(isAdminPage);
};
