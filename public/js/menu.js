const mainBtn = document.getElementById("mainBtn");
const listBtn = document.getElementById("listBtn");
const logoutBtn = document.getElementById("logoutBtn");




mainBtn.addEventListener("click", function() {
    location.href = "/";
});


listBtn.addEventListener("click", function() {
    location.href = "/diary/list";
});

logoutBtn.addEventListener("click", function() {
    
app.get('/logout',function(req, res){
    req.session.destroy(function(){
    req.session;
    });
    res.redirect('/');
    });
});
