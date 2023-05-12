function searchVariants(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get the gene symbol entered by the user
  const geneSymbol = document.getElementById("GeneHGNCsymbol").value;

  // Make a fetch request to the DisGeNET API to get gene data
  fetch(`https://api.disgenetplus.com/api/v1/entity/gene?gene_symbol=${geneSymbol}`, {
    headers: {
      Authorization: "8418f11f-c0f8-43ef-a158-9fe8a53e475a",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Get a reference to the table body element
      const tableBody = document.querySelector("#table-of-variants .table-body-of-variants");
      // Clear the table body
      tableBody.innerHTML = "";

      // Loop through the disease-gene associations returned by the API and create a table row for each one
      const genes = data.payload;
      genes.forEach((gene) => {
        const row = document.createElement("tr");

        const symbolOfGene = document.createElement("td");
        symbolOfGene.textContent = gene.symbolOfGene;
        row.appendChild(symbolOfGene);

        const geneToVariants = document.createElement("td");
        geneToVariants.textContent = gene.geneToVariants.length;
        row.appendChild(geneToVariants);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      // Log any errors to the console
      console.error(error);
    });

  return false;
}

function searchAssociations(event) {
  event.preventDefault();

  const disease_prefix = String(document.getElementById("disease_prefix").value).toUpperCase();
  const disease_id = String(document.getElementById("disease_id").value).toUpperCase();

  // Make a fetch request to the DisGeNET API to get disease-association data
  fetch(`https://api.disgenetplus.com/api/v1/gda/summary?disease=${disease_prefix}_${disease_id}`, {
    headers: {
      Authorization: "8418f11f-c0f8-43ef-a158-9fe8a53e475a",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#associations-table .table-disease");
      tableBody.innerHTML = "";

      data.payload.forEach((association) => {
        const row = document.createElement("tr");

        const symbolCell = document.createElement("td");
        symbolCell.textContent = association.symbolOfGene;
        row.appendChild(symbolCell);

        const scoreCell = document.createElement("td");
        scoreCell.textContent = association.score;
        row.appendChild(scoreCell);

        const yearInitialCell = document.createElement("td");
        yearInitialCell.textContent = association.yearInitial;
        row.appendChild(yearInitialCell);

        const yearFinalCell = document.createElement("td");
        yearFinalCell.textContent = association.yearFinal;
        row.appendChild(yearFinalCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error(error);
      // displays error message on HTML page if necessary
    });

  return false;
}