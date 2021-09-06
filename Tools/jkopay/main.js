var getParameter = function(name, schemaname, url){
    // if (!url) {
    //      url = window.location.href;
    //  }
     name = name.replace(/[\[\]]/g, "\\$&");
     console.log(`name:${name}`);
     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), // ?? + j + 
         results = regex.exec(url);
     if (!results) return null;
     if (!results[2]) return '';
     console.log(`result: ${results}`);


     var para = decodeURIComponent(results[2].replace(/\+/g, " "));	
     console.log(`para: ${para}`);

     if (para !== null && para !== '' && para !== undefined){
         var schemaregex = new RegExp(schemaname + "(:([^&#]*))");
         results = schemaregex.exec(para);
         console.log(`last results: ${results}`);
         return decodeURIComponent(results[2].replace(/\+/g, " "));	
     }
};


console.log(getParameter('j', 'A', 'https://www.jkopay.com/transfer?j=Transfer:903198237A:100'))