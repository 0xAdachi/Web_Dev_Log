let inputH = "<div><input class=\"extIn\" type=\"text\"><button class=\"remBtn\">Remove</button></div>";

$("#addIn").on("click", () => {
    $(".input-field-wrapper").append(inputH);
})

$(".input-field-wrapper").on("click",".remBtn", function() {
    $(this).parent().remove();
})