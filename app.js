
// To be run from Node.js - i.e. "node app.js"

var XmlDocument = require('./lib/xmldoc').XmlDocument;

// Now load an XML file from disk and parse it
var fs = require('fs'),
    path = require('path')
	
var mdDir=path.join(__dirname, "md");
//If the directory "md" doesn't exist, create one.
if(!fs.existsSync(mdDir)){
	console.log("\nCreating the directory 'md'\n");
	fs.mkdirSync(mdDir);
}

fs.readFile(path.join(__dirname, "DummyBlogML.xml"), 'utf8', function (err, data) {
  
  if (err) {
    return console.log('Error: '+err);
  }

  // Parse the XML
  var blog = new XmlDocument(data);

  // Pull out the <posts> node
  var posts = blog.childNamed("posts");

  // Print out post details
  posts.eachChild(function (post) {
      console.log("***** Begin Post *****");
	  
	  var title=post.valueWithPath("title");
	  var status = post.attr["is-published"].toLowerCase() === "true" ? "publish" : "draft";
	  var tags=fetchTags(post);
	  var dateCreated="'" + post.attr["date-created"].split("T")[0]+ "'" ;
	  var postBody=post.valueWithPath("content");
	  
	  var br="\n";
	  var mdPost  = "---" + br;
	  mdPost += "title: "+ title + br;
	  mdPost += "status: "+ status + br
	  mdPost += "tags: " + tags + br 
	  mdPost += "date: " + dateCreated + br 
	  mdPost += "---" + br + br + postBody;
	  
	  function fetchTags(post) {
	      var tagsNode = post.childNamed("tags");
	      var tagsList = "";
          if(tagsNode){
		      var tagNodesList = tagsNode.childrenNamed("tag");
		      //    < Pull out tags >
		      tagsList = "[";
		      for (i = 0; i < tagNodesList.length; i++) {
			      tagsList += "'" + tagNodesList[i].attr.ref + "',";
		      }
		      // Remove the last comma from the above list.
		      if (tagsList.charAt(tagsList.length - 1) === ',') {
			      tagsList = tagsList.substr(0, tagsList.length - 1);
		      }
		      tagsList += "]";
          }
		  return tagsList;
	  }
	  
      console.log("Title '%s'", title);
      console.log("Status '%s'", status);   
      console.log("Tags %s", tags);
	  console.log("Date created '%s'", dateCreated);
     // console.log("Content '%s'", postBody);
      
	  console.log("***** End Post *****\n");
	  
	  //<Write file>
		var postName=post.attr["post-url"].split("/post/")[1].split(".aspx")[0]+".md";
		fs.writeFile(path.join(mdDir, postName), mdPost, function (err) {
		  if (err) throw err;
		});
	  //</Write file>
	  
  });
});