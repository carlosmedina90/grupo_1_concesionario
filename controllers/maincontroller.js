const express= require("express")
const path = require("path")

const controller ={
    index:(req,res)=>{
        res.render("index")
    },
    login:(req,res)=>{
        res.render("login")
    },
    register:(req,res)=>{
        res.render("register")
    },
    productCart:(req,res)=>{
        res.render("productCart")
    },
    productDetail:(req,res)=>{
        res.render("productDetail")
    }
}

module.exports = controller;

