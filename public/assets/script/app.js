$(document).on("click", "#save-article", ()=>{
    let id = $(this).attr("data");
  
    $.ajax({
      method: "POST",
      url: "/save/" + id  
    })
      .then((data)=>{
        location.reload();
      });
  });
  