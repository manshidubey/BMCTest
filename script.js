    async function getFinanceData() {
        let url = 'https://spreadsheets.google.com/feeds/list/1P87qnqjIC7_kXSi7bp7tYSP3UxIPZz_9eyvmLtXUkRk/od6/public/values?alt=json';
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function renderData() {
        let mydata = await getFinanceData();
        console.log(mydata);
        document.getElementById("displayResult").innerHTML  = "";
        mydata.feed.entry.forEach(dt => {

            let textColor = (Math.sign(dt.gsx$percentagechange.$t) >= 0) ? "text-success" : "text-danger";
            console.log(dt.gsx$price.$t);
            document.getElementById("displayResult").innerHTML +=  `
                                <td>${dt.gsx$symbol.$t}  </td>
                                <td>${dt.gsx$price.$t}  </td>
                                <td class="${textColor} text-right pr-5" >${dt.gsx$percentagechange.$t}  </td>
                                `;
        
    });


    }

    renderData();
    setInterval(renderData, 3000);




 /* let myfunction = function(){
    console.log("hello");
    document.getElementById("displayResult").innerHTML ="";
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          //converting it into a JavaScript object
          let data = JSON.parse(this.responseText).feed.entry;
          
          let i;
          for (i = 0; i < data.length; i++) {
            let symbol = data[i]["gsx$symbol"]["$t"];
            let price = data[i]["gsx$price"]["$t"];
            let percentageChange = data[i]["gsx$percentagechange"]["$t"];     
            let textColor = (Math.sign(percentageChange) >= 0) ? "text-success" : "text-danger";
            console.log(textColor);
            document.getElementById("displayResult").innerHTML +=
              "<tr>" +
              "<td>" +
              symbol +
              "</td>" +
              "<td>" +
              price +
              "</td>" +
              "<td class='"+textColor+"'>" +
              percentageChange +
              "</td>" +
              "</tr>";
          }
      }
      
    };

    xmlhttp.open(
      "GET",
      "https://spreadsheets.google.com/feeds/list/1P87qnqjIC7_kXSi7bp7tYSP3UxIPZz_9eyvmLtXUkRk/od6/public/values?alt=json",
      true
    );
    xmlhttp.send();
  }
  myfunction();
  setInterval(myfunction, 30000); */