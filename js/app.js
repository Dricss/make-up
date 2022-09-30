//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const item = `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
  <figure class="product-figure">
    <img src="https://d3t32hsnjxo7q6.cloudfront.net/i/deedb7bd74bda43f062a09aab2ee1ec8_ra,w158,h184_pa,w158,h184.png" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">NYX Mosaic Powder Blush Paradise</h1>
    <div class="product-brands"><span class="product-brand background-brand">Nyx</span>
<span class="product-brand background-price">R$ 57.70</span></div>
  </section>
  // CARREGAR OS DETALHES
</div>`;
}

window.addEventListener("load", async () => {
  const itensUl = document.querySelector(".catalog");
  const frm = document.querySelector(".catalog-control");
  const iptName = frm.querySelector("input");
  const products = await fetchProducts();
  const listProducts = await loadProducts(products);
  console.log(products.filter((e) => e.rating != null));
  itensUl.innerHTML = listProducts.map((e) => e).join("");
  iptName.addEventListener("change", async (e) => {
    let search = e.target.value;
    const filterProducts = products.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
    const filterProductsHTML = await loadProducts(filterProducts);
    itensUl.innerHTML = filterProductsHTML.map((e) => e).join("");
  });
  const selectList = document.querySelector("#sort-type");
  selectList.addEventListener("select", orderAZ(products));
});

async function orderAZ(products) {
  const itensUl = document.querySelector(".catalog");
  const listProducts = loadProducts(products);
  (await listProducts).sort((a, b) => {
    return a - b;
  });
  itensUl.innerHTML = (await listProducts).map((e) => e).join("");
}

async function loadProducts(products) {
  let listProducts = [];
  for (element of products) {
    if (element.price !== "0.0") {
      listProducts.push(`
       <div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
          <figure class="product-figure">
          <img src="${
            element.image_link == null
              ? element.image_link
              : element.api_featured_image
          }" style="max-width: 200px; max-height: 150px>
       </figure>
       <section class="product-description">
        <h1 class="product-name">${element.name}</h1>
        <div class="product-brands"><span class="product-brand background-brand">${
          element.brand
        }</span>
        <span class="product-brand background-price">R$ ${
          element.price
        }</span></div>
         </section>
         <section class="product-details"><div class="details-row">
         <div>Brand</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">${
             element.brand
           }nyx</div>
         </div>
       </div><div class="details-row">
         <div>Price</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">${element.price}</div>
         </div>
       </div><div class="details-row">
         <div>Rating</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">${
             element.rating
           }</div>
         </div>
       </div><div class="details-row">
         <div>Category</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250"></div>
         </div>
       </div><div class="details-row">
         <div>Product_type</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">bronzer</div>
         </div>
       </div></section>
      </div>
        `);
    }
  }
  return listProducts;
}

async function fetchProducts() {
  let resp = await fetch(
    "http://makeup-api.herokuapp.com/api/v1/products.json"
  );
  let json = await resp.json();
  return json;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">nyx</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">10.49</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">5</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"></div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
      </div></section>`;
}
