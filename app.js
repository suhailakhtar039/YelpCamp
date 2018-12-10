var express     =require("express"),
    app         =express(),
    flash       =require("connect-flash"),
    passport	=require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    bodyParser  =require("body-parser"),
    mongoose    =require("mongoose"),
    Comment     =require("./models/comment"),
    User 		=require("./models/user"),
    Campground  =require("./models/campground"),
    seedDB		=require("./seeds");
//requiring routes
var commentRoutes	=require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	indexRoutes		=require("./routes/index");

// seedDB();//seed the database
mongoose.connect(process.env.DATABASEURL,{useNewUrlParser:true});
// mongoose.connect("mongodb://suhailakhtar039:suhail786@ds129914.mlab.com:29914/yelpcamp",{useNewUrlParser:true});
//mongodb://suhailakhtar39:suhail786@ds129914.mlab.com:29914/yelpcamp
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//password configuration
app.use(require("express-session")({
	secret:"Once again Rusty wind cutest dog",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    // res.locals.success=req.flash("success");
	next();
});
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
//routes

app.listen(process.env.PORT||3000,function(){
	console.log("app has started");
});