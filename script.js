const url = "https://filltext.com/"
const container = document.getElementById("container")
const resultCard = document.getElementById("result")
const filterContainer = document.getElementById("filter-container")

const categoriesData = ["%22category1%22","%22category2%22","%22category3%22", "%22category4%22"]
let results = []

const getData = () => {
    fetch(url + `?rows=10&fname={firstName}&lname={lastName}&category=[${categoriesData}]&pretty=true`)
    .then(response => {
        response.json().then(data => {
            results = data;
            printCategories()
            printData(data)
        })
    })
  };

const printCategories = () => {
    filterContainer.innerHTML = ` <div class="category" onclick="filterData(0)">All</div>`
    filterContainer.innerHTML += categoriesData.map((category,index ) => `
    <div class="category" onclick="filterData(${index + 1})">category ${index + 1}</div>
    `).join("");
}

const filterData = (index) => {
    let clonedResults = []
if(index == 0){
    clonedResults = results
} else {
    clonedResults = results.filter(({category}) => category === "category" + index)
}
 
    clearData()
    printData(clonedResults)
}

const printData = (data) => {
    
    let card = document.createElement("div");
    card.innerHTML = data
      .map(({fname, lname, category}) => ` <div id="card">
      <div class="card-content">
          <div  class="avatar">
              <h2 id="avatar-text">
              ${fname.charAt(0)}${lname.charAt(0)}
              </h2>
          </div>
          <h1 id="title">
          ${fname} ${lname}
          </h1>
          <div class="subtitle category">
          ${category}
          </div>
      </div>
  </div>`).join("");

  resultCard.appendChild(card);
}

const clearData = () => {
    resultCard.innerHTML = ""

}
getData();