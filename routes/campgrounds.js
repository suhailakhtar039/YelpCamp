var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");
//INDEX show all campgrounds
router.get("/",function(req,res){
	Campground.find({},function(err,allCampground){
		if(err){
			console.log("Error encountered");
			console.log(err);
		}else {
			res.render("campgrounds/index",{campgrounds:allCampground, currentUser:req.user});
		}
	})

})
//create route
router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newObject={name:name, image:image, description:description,author:author};
	Campground.create(newObject,function(err,newly){
		if(err){
			console.log(err);
		}else {
			res.redirect("/campgrounds");
		}
	})
})
///new campground form route
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
})


//show route
router.get("/:id",function(req,res){
	var id=req.params.id;
	Campground.findById(id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else {
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
})
//Edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			res.send("Error");
		}
		else{
			res.render("campgrounds/edit",{campground:foundCampground});
		}
	})
})
//Update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp){
		if(err){
			res.redirect("/campgrounds");
		}else {
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})
//delete route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else {
			res.redirect("/campgrounds");
		}
	})
})
//middleware
module.exports=router;