var express = require("express")
const app = express()
const {credential} = require("firebase-admin")
const { initializeApp } = require('firebase-admin/app');
var serviceAccount = require("./alonzoaustin-8314b-firebase-adminsdk-ssbgi-21d429dcdb.json");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const path = require("path")
const fs = require("fs")
const hljs = require('highlight.js');
const optimize = require("./id-optimizer");
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

app.get("/blog", function(req, res) {
    res.sendFile(pathToFile + "/blog.html")
})

app.get("/article/:id", function(req, res) {
    res.sendFile(pathToFile + `/article/id/${optimize(req.params.id)}.html`)
})

app.get("/projects", function(req, res) {
    res.sendFile(pathToFile + "/projects.html")
})

app.get("/project/:id", function(req, res) {
    res.sendFile(pathToFile + `/project/id/${optimize(req.params.id)}.html`)
})

app.get("/works", function(req, res) {
    res.sendFile(pathToFile + "/works.html")
})

app.get("/job/:id", function(req, res) {
    res.sendFile(pathToFile + `/job/id/${optimize(req.params.id)}.html`)
})

db.collection("blogs").onSnapshot(docs => {
    var map = {}
    docs.docs.map(doc => {
        map[doc.id] = {data: doc.data(), id: doc.id}
    })

    blogsMap = map

    try {
        fs.mkdirSync(path.join(__dirname, "dist/alonzo-austin-angular/article/id"), {recursive: true})
    } catch(err) {
        console.log("folder already exists", err)
    }

    Object.values(map).map(document => {
        let page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
        var newContent = `<app-root>\n<h1>${document.data.title}</h1>\n<br>${md.render(document.data.content)}}</app-root>`
        console.log("newContent", newContent)
        page = page.split("<title>Alonzo Austin Angular Website</title>").join(`<title>${document.data.title + "- Alonzo Austin's article"}</title>`)
        page = page.split("</title>").join(`</title>\n<meta name='description' content='${document.data.content}'>`)
        page = page.split("<app-root></app-root>").join(newContent)
        fs.writeFileSync(`dist/alonzo-austin-angular/article/id/${optimize(document.id)}.html`, page, function(err, data){
            if(err){
                console.log(`failed to write to ${optimize(document.id)}.html`, err)
            } else {
                console.log(`successfully wrote to ${optimize(document.id)}.html`, data)
            }
        })
    })

    var page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
    var newContent = `<app-root>\n<h1>Blog</h1>\n${Object.values(map).map(document => `\n<h3>${document.data.title}</h3>\n<br>${md.render(document.data.content)}\n`).join("")}</app-root>`
    page = page.split("<title>Alonzo Austin Angular Website</title>").join("\n<title>Alonzo Austin's Blog Articles</title>")
    page = page.split("</title>").join("</title>\n<meta name='description' content='My Blog consists of articles regarding my journey as a web developer and tips.'>")
    page = page.split("<app-root></app-root>").join(newContent)
    fs.writeFileSync("dist/alonzo-austin-angular/blog.html", page, function(err, data){
        if(err){
            console.log("did not write blog.html", err)
        } else {
            console.log("did write to blog.html", data)
        }
    })

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

    try {
        fs.mkdirSync(path.join(__dirname, "dist/alonzo-austin-angular/project/id"), {recursive: true})
    } catch(err) {
        console.log("folder already exists", err)
    }

    Object.values(map).map(document => {
        let page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
        var newContent = `<app-root>\n<h1>${document.data.title}</h1>\n<br>\n<p>${document.data.description}</p>\n<br>${md.render(document.data.Log)}}</app-root>`
        console.log("newContent", newContent)
        page = page.split("<title>Alonzo Austin Angular Website</title>").join(`\n<title>${document.data.title + "- Alonzo Austin's Projects"}</title>`)
        page = page.split("</title>").join(`</title>\n<meta name='description' content='${document.data.description}'>`)
        page = page.split("<app-root></app-root>").join(newContent)
        fs.writeFileSync(`dist/alonzo-austin-angular/project/id/${optimize(document.id)}.html`, page, function(err, data){
            if(err){
                console.log(`failed to write to ${optimize(document.id)}.html`, err)
            } else {
                console.log(`successfully wrote to ${optimize(document.id)}.html`, data)
            }
        })
    })

    var page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
    var newContent = `<app-root>\n<h1>Projects</h1>${Object.values(map).map(document => `\n<h3>${document.data.title}</h3>\n<br>${md.render(document.data.description)}`).join("")}\n</app-root>`
    console.log("newContent", newContent)
    page = page.split("<title>Alonzo Austin Angular Website</title>").join("\n<title>Alonzo Austin's Web Development Projects</title>")
    page = page.split("</title>").join("</title>\n<meta name='description' content='This is a showcase of all my the projects I have created and am working on as a Fullstack Web Developer.'>")
    page = page.split("<app-root></app-root>").join(newContent)
    fs.writeFileSync("dist/alonzo-austin-angular/projects.html", page, function(err, data){
        if(err){
            console.log("did not write projects.html", err)
        } else {
            console.log("did write to projects.html", data)
        }
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

    try {
        fs.mkdirSync(path.join(__dirname, "dist/alonzo-austin-angular/job/id"), {recursive: true})
    } catch(err) {
        console.log("folder already exists", err)
    }

    Object.values(map).map(document => {
        let page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
        var newContent = `<app-root>\n<h1>${document.data.client}</h1><br><p>${document.data.review}\n</p>\n<br>\n${md.render(document.data.description)}}\n</app-root>`
        console.log("newContent", newContent)
        page = page.split("<title>Alonzo Austin Angular Website</title>").join(`\n<title>${document.data.client + "- Job that Alonzo Austin did"}</title>`)
        page = page.split("</title>").join(`</title>\n<meta name='description' content='${document.data.review}'>`)
        page = page.split("<app-root></app-root>").join(newContent)
        fs.writeFileSync(`dist/alonzo-austin-angular/job/id/${optimize(document.id)}.html`, page, function(err, data){
            if(err){
                console.log(`failed to write to ${optimize(document.id)}.html`, err)
            } else {
                console.log(`successfully wrote to ${optimize(document.id)}.html`, data)
            }
        })
    })

    var page = fs.readFileSync("dist/alonzo-austin-angular/index.html", "utf-8")
    var newContent = `<app-root><h1>Works</h1>${Object.values(map).map(document => `<h3>${document.data.client}</h3><br>${md.render(document.data.description)}`).join()}</app-root>`
    console.log("newContent", newContent)
    page = page.split("<title>Alonzo Austin Angular Website</title>").join("<title>Alonzo Austin's jobs as a freelancer</title>")
    page = page.split("</title>").join("</title>\n<meta name='description' content='This is a showcase of all of the jobs as a freelancer on upwork and fiverr or for friends/family'>")
    page = page.split("<app-root></app-root>").join(newContent)
    fs.writeFileSync("dist/alonzo-austin-angular/works.html", page, function(err, data){
        if(err){
            console.log("did not write works.html", err)
        } else {
            console.log("did write to works.html", data)
        }
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



app.listen(port, () => {
    if(port === 3000){
        console.log(`listening on http://localhost:3000`)
    } else {
        console.log(`listening on port ${port}`)
    }
})