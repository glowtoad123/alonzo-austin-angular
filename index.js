var express = require("express")
const app = express()
const {credential} = require("firebase-admin")
const { initializeApp } = require('firebase-admin/app');
var serviceAccount = require("./alonzoaustin-8314b-firebase-adminsdk-ssbgi-21d429dcdb.json");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const path = require("path")
const fs = require("fs")
const hljs = require('highlight.js');
const md = require('markdown-it')({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping
    }
  });

/* "/app/dist/alonzo-angular/browser" */

const pathToFile = __dirname + "/dist/alonzo-austin-angular"

app.use(express.static("dist/alonzo-austin-angular"))

app.use((req, res, next) => {

    const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

const port = process.env.PORT || 3000

initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL: "https://alonzoaustin-8314b.firebaseio.com"
});

const db = getFirestore()
var blogsMap = {}
var projectsMap = {}
var worksMap = {}

db.collection("blogs").onSnapshot(docs => {
    var map = {}
    docs.docs.map(doc => {
        map[doc.id] = {data: doc.data(), id: doc.id}
    })

    blogsMap = map

})

app.get("/get-blog", function(req, res) {
    res.send(blogsMap)
})

app.get("/get-article/:id", function(req, res) {
    console.log("id", req.params.id)
    const selectedOne = blogsMap[req.params.id]
    res.send(selectedOne)
})

db.collection("projects").onSnapshot(docs => {
    var map = {}
    var list = docs.docs.map(doc => {
        /* map[doc.doc.id] = {data: doc.doc.data(), id: doc.doc.id} */
        /* console.log("type: ", doc.type, doc.doc.data().title, doc.doc.updateTime) */
        /* if(doc.type === "modified"){
            map[doc.doc.id] = {data: doc.doc.data(), id: doc.doc.id}
        } */
        return {data: doc.data(), id: doc.id}
    })
    
    list.map(document => {
        map[document.id] = document
    })

    projectsMap = map
    
    
    
})

app.get("/get-projects", function(req, res) {
    /*  Object.keys(projectsMap).length > 0 && console.log("theOne:", projectsMap['Cldb7azpI2e2Td1bA9wI']) */
    res.send(projectsMap)
})

app.get("/get-project/:id", function(req, res) {
    console.log("id", req.params.id)
    const selectedOne = projectsMap[req.params.id]
    res.send(selectedOne)
})

db.collection("works").onSnapshot(docs => {
    var map = {}
    docs.docChanges().map(doc => {
        map[doc.doc.id] = {data: doc.doc.data(), id: doc.doc.id}
    })

    worksMap = map

})

app.get("/get-works", function(req, res) {
    res.send(worksMap)
})

app.get("/get-job/:id", function(req, res) {
    console.log("id", req.params.id)
    const selectedOne = worksMap[req.params.id]
    res.send(selectedOne)
})

app.get("/blog", function(req, res) {
    var page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
    /* var appRoot = new RegExp(/<app-root>[\s\S]+<\/app-root>/gm) */
    var newContent = `<app-root>${Object.values(blogsMap).map(document => `<h3>${document.data.title}</h3><br>${md.render(document.data.content)}`).join()}</app-root>`
    console.log("newContent", newContent)
    page = page.split("<app-root></app-root>").join(newContent)
    fs.writeFileSync("dist/alonzo-austin-angular/blog.html", page, function(err, data){
        if(err){
            console.log("did not write blog.html", err)
        } else {
            console.log("did write to blog.html", data)
        }
    })
    res.sendFile(pathToFile + "/blog.html")
})

app.get("/projects", function(req, res) {
    var page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
    /* var appRoot = new RegExp(/<app-root>[\s\S]+<\/app-root>/gm) */
    var newContent = `<app-root>${Object.values(projectsMap).map(document => `<h3>${document.data.title}</h3><br>${md.render(document.data.description)}`).join()}</app-root>`
    console.log("newContent", newContent)
    page = page.split("<app-root></app-root>").join(newContent)
    fs.writeFileSync("dist/alonzo-austin-angular/project.html", page, function(err, data){
        if(err){
            console.log("did not write project.html", err)
        } else {
            console.log("did write to project.html", data)
        }
    })
    res.sendFile(pathToFile + "/project.html")
})
app.get("/works", function(req, res) {
    var page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
    /* var appRoot = new RegExp(/<app-root>[\s\S]+<\/app-root>/gm) */
    var newContent = `<app-root>${Object.values(worksMap).map(document => `<h3>${document.data.client}</h3><br>${md.render(document.data.description)}`).join()}</app-root>`
    console.log("newContent", newContent)
    page = page.split("<app-root></app-root>").join(newContent)
    fs.writeFileSync("dist/alonzo-austin-angular/works.html", page, function(err, data){
        if(err){
            console.log("did not write works.html", err)
        } else {
            console.log("did write to works.html", data)
        }
    })
    res.sendFile(pathToFile + "/works.html")
})

app.listen(port, () => {
    if(port === 3000){
        console.log(`listening on http://localhost:3000`)
    } else {
        console.log(`listening on port ${port}`)
    }
})