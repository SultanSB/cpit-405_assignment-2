const getBtn = document.querySelector(".get-btn");
const result = document.querySelector(".result");
const apiUrl = "https://api.nationalize.io";
const input = document.querySelector(".user-name");


function fetchData() {
    let name = input.value.trim();
    console.log(name);
    if (name.length === 0) {
        result.innerHTML = `<span class="error">Please enter a valid name.</span>`;
        return;
    }

    result.innerHTML = "Loading...";

    fetch(`${apiUrl}/?name=${name}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.country && data.country.length > 0) {
                let countries = data.country
                    .map(
                        (country) => `<li>${country.country_id} - Probability: ${(
                            country.probability * 100
                        ).toFixed(2)}%</li>`
                    )
                    .join("");
                result.innerHTML = `<ul>${countries}</ul>`;
                console.log(data);
            } else {
                result.innerHTML = `<span class="error">No results found.</span>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<span class="error">An error occurred. Please try again later.</span>`;
        });
}


getBtn.addEventListener("click", fetchData);

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        fetchData(); 
    }
});
