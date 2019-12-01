(function() {
  async function getData() {
    let response = await fetch(
      "https://product-api-ctoms.herokuapp.com/api/products",
      {
        method: "Get",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: "9zDfoosGRycWaGU7u66c",
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    return data;
  }

  const data = getData().then(dat => {
    let htmlCards = dat.products.map(d => {
      let x = createCard(d);
      //   console.log(d);
      document.getElementsByClassName("big-container")[0].appendChild(x);
    });
  });

  const createCard = dataPoint => {
    var para = document.createElement("div");
    var image = document.createElement("img");
    image.src = dataPoint.img_url;

    var t = document.createTextNode(dataPoint.title);
    var titleOut = document.createElement("h3");
    titleOut.append(t);

    var dropDown;
    var vrs = dataPoint.variants;
    if (vrs.length > 0) {
      dropDown = document.createElement("select");
      for (let vr of vrs) {
        let opt = document.createElement("option");
        let v = document.createTextNode(
          `${vr.item_code} ${vr.variant_price} ${vr.variant_option}`
        );
        opt.append(v);
        dropDown.append(opt);
      }
    }

    var varOps = dataPoint.variant_options;
    var varOpsNode, text;
    let options = document.createElement("p");
    if (varOps.length > 0) {
      text =
        varOps.length === 1
          ? `This item comes in an array of ${varOps[0]}s`
          : `This item comes in an array of ${varOps[0]}s and ${varOps[1]}s`;
    } else {
      text = `See below options.`;
    }
    options.append(text);

    para.className = "card";
    para.appendChild(image);
    para.appendChild(titleOut);
    para.appendChild(options);
    para.appendChild(dropDown);
    return para;
  };
})();
