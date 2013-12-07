---
title: A note on JSONP & misconceptions of Cross Origin AJAX
status: publish
tags: ['JavaScript','web security','browsers','html']
date: '2012-07-18'
---


        <p align="justify">Web developers who have worked on accessing APIs using JavaScript would be very much familiar with the term &ldquo;JSONP&rdquo;. Many web devs whom I have met offline or in online discussion forums seem to have some misconceptions about JSONP. Below are some of the basic &amp; common definitions which I have come across:</p>
<ul>
<li>
<div>JSONP is a technique to work with remote APIs</div>
</li>
<li>
<div>It is nothing but Cross Origin AJAX</div>
</li>
<li>
<div>If we add a query string like &ldquo;?callback=someCallback&rdquo; and fire jQuery&rsquo;s $.ajax or $.getJSON, what we are doing is nothing but a JSONP call.</div>
</li>
<li>
<div>May be a slightly complicated definition: Cross origin AJAX is possible only when the response thrown is JavaScript</div>
</li>
<li>
<div>and many more..</div>
</li>
</ul>
<p align="justify">The truth in the above statements is very little and such definitions add more confusion, bringing in misconceptions. In my recent presentation &ldquo;<a href="http://www.novogeek.com/post/Browser-Internals-Content-Isolation-with-Same-Origin-Policy.aspx" target="_blank">Content Isolation with Same Origin Policy</a>&rdquo;, I put up the below slides (check slides 4 &amp; 5 in the ppt)</p>
<p align="justify"><a href="http://novogeek.com/pics/articles/jsonp1.jpg" target="_blank"><img style="background-image: none; border-right-width: 0px; margin: 0px 10px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; float: left; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" src="http://novogeek.com/pics/articles/jsonp1.jpg" border="0" alt="image" width="421" height="299" align="left" /></a></p>
<p align="justify"><a href="http://novogeek.com/pics/articles/jsonp2.jpg" target="_blank"><img style="background-image: none; border-right-width: 0px; margin: 0px 10px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; float: left; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" src="http://novogeek.com/pics/articles/jsonp2.jpg" border="0" alt="image" width="381" height="297" align="left" /></a></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">&nbsp;</p>
<p align="justify">For all practical purposes, the first one is possible and second one is not. Apart from the tweaked definitions of JSONP as stated above, the below reasoning complicates the topic:</p>
<ul>
<li>
<div>In the first case, the content requested is of the type &ldquo;text/javascript&rdquo; while in the second case it is HTML. So browsers look at content type of the response header and decide whether they should block the content or not (actually, a very good observation).</div>
</li>
<li>
<div>There is a &ldquo;?callback=?&rdquo; parameter in the first case enables jQuery to make the cross origin call in the first case</div>
</li>
<li>
<div>Server side framework should have special capabilities (Iike inbuilt serialization/deserialization) for the first case to work</div>
</li>
</ul>
<p align="justify">I thought it would be nice to summarize few facts and hence this post. Read on.</p>
<p align="justify"><strong>What's an Origin?</strong></p>
<p align="justify">The combination of <strong><em>scheme://host:port</em></strong> is what browsers treat as an Origin. e.g., http://abc.com, https://abc.com, http://abc.com:81 belong to different origins as they differ in one of scheme, host or port. Remember that http://abc.om/user1 and http://abc.om/user2 are different URLs but not different origins. Also, a domain (http://abc.com) and its subdomain (http://sub.abc.com) belong to different origins (this particular restriction can be relaxed using a technique called <a href="http://en.wikipedia.org/wiki/Same_origin_policy#Additional_document.domain_logic" target="_blank">domain relaxation</a>, which is out of scope of this topic).</p>
<p align="justify"><strong>Can my client script read your emails?</strong></p>
<p align="justify">Browsers restrict JavaScript calls to server (read as AJAX) based on Origin. This is governed by a policy called Same Origin Policy. In other words, client script in your page can make calls only to your server (strictly speaking, origin). If this rule wasn&rsquo;t there, it would have been possible to write a script in some arbitrary web page which can read your web based email conversations.</p>
<p align="justify"><strong>Cross Origin AJAX? Really?</strong></p>
<p align="justify">For the reason stated above, a page can make an AJAX call to the same origin from which it originated. If I am allowed to coin an acronym stressing on the boundaries of AJAX, I would coin &ldquo;<em><strong>AJAX-FOO&rdquo;</strong></em>, which expands to &ldquo;Asynchronous JavaScript And XML For Own Origin&rdquo;. As soon as a new XMLHttpRequest is fired to a remote origin, browsers check the origin of the page with the destination of the request. If both are same, the call is allowed. Else, the call is blocked with an appropriate error message. So there is nothing like Cross Origin AJAX.</p>
<p align="justify"><strong>Understanding JSONP (TL;DR: It&rsquo;s all about script tag hack!)</strong></p>
<p align="justify">As they say, necessity is the mother of invention. When web2.0 APIs were introduced, they desperately wanted cross origin interactions. JSNOP was discovered as a hack/work-around to bypass the restrictions of Same Origin Policy.</p>
<p align="justify">The idea behind it is very simple. Same Origin Policy doesn't apply for scripts (and a couple of other elements too). A &lt;script&gt; tag in a web page can load JavaScript from any origin (i.e., when you embed jQuery.js pointing to a CDN, loading from a remote origin is allowed). Using this loophole, one can create cross origin requests.</p>
<p align="justify"><strong><em>Simple example to create your own JSONP service</em></strong></p>
<p align="justify">1. Create a HTML page having two JavaScript files. In script1.js, create a function &ldquo;processData&rdquo;</p>
<div id="codeSnippetWrapper" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New', courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; cursor: text; border: silver 1px solid; padding: 4px;">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff">function</span> processData(data){ <br />    console.log(<span style="color: #006080">'Hello '</span>+data.firstName+<span style="color: #006080">' '</span>+data.lastName);<br />}</pre>
<br /></div>
<p align="justify">2. In script2.js execute the above function by passing valid JSON data:</p>
<div id="codeSnippetWrapper" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New', courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; cursor: text; border: silver 1px solid; padding: 4px;">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;">processData({firstName:<span style="color: #006080">'Krishna'</span>, lastName:<span style="color: #006080">'Chaitanya'</span>}); </pre>
<br /></div>
<p>3. When you load the page, both the script files load, code in the second file executes the function defined in the first file. This is an expected behavior.</p>
<p>4. Create a file &ldquo;service.abc&rdquo; (yes, create it with this dummy extension. This is going to be your web service) and place it in the same folder. Open it and write the same code as in step 2. Now open your web server (IIS or your preferable one), go to your site, open mime types section and add a new mime type &ldquo;.abc&rdquo; having the mime type value &ldquo;text/javascript&rdquo;.</p>
<p><img style="margin: 0px 10px 0px 0px" src="http://novogeek.com/pics/articles/jsonp-mime.jpg" alt="" /></p>
<p>5. Now remove reference to &ldquo;script2.js&rdquo; and add a reference to this new file &ldquo;service.abc&rdquo; in the head section like this:</p>
<div id="codeSnippetWrapper" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New', courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; cursor: text; border: silver 1px solid; padding: 4px;">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;">&lt;script type=<span style="color: #006080">"text/javascript"</span> src=<span style="color: #006080">"service.abc"</span>&gt;&lt;/script&gt;</pre>
<br /></div>
<p>6. When you load the page now, you get the same behavior as that of script2. So far, everything is in the same origin. Place the file &ldquo;service.abc&rdquo; in another origin (simply create another website on a different port number-recollect that different ports means different origins) and reference it in script tag and the code still works.</p>
<p>What you have done is, you have loaded content from a remote service via script tag injection. This is the essence of JSONP. The idea of having a random file format &ldquo;.abc&rdquo; is just to show that any file which can serve script content will hold good for this. You may use your &ldquo;.aspx&rdquo;, &ldquo;.asmx&rdquo;, &ldquo;.ashx&rdquo; or whatever to achieve this.</p>
<p><em>Hence, <span style="text-decoration: underline;">JSONP is always a script Injection</span> and has nothing to do with XMLHttpRequest object and AJAX.</em></p>
<p><strong>How JavaScript libraries like jQuery help (mislead) you</strong></p>
<p align="justify">If you use libraries like jQuery, they give you a common syntax which works for AJAX as well as JSONP hack. They do a lot of work behind the screens to make a JSONP script injection</p>
<div id="codeSnippetWrapper" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New', courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; cursor: text; border: silver 1px solid; padding: 4px;">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;">$.getJSON(<span style="color: #006080">'http://graph.facebook.com/zuck?callback=?'</span>, <span style="color: #0000ff">function</span> (data) { <br />    console.log(data);<br />}</pre>
<br /></div>
<p align="justify">In the above API for Facebook, if the value for callback is given by the developer as &ldquo;<a href="https://graph.facebook.com/zuck?callback=fetch" target="_blank">https://graph.facebook.com/zuck?callback=fetch</a>&rdquo;, facebook returns json data by wrapping it in the function &ldquo;fetch&rdquo; (open the link in your browser and check the output. Note: IE will ask to save the response as ".js" file.). If the function name is omitted, jQuery handles it in an interesting/tricky manner. It takes the success callback as the function to be executed (similar to &ldquo;processData&rdquo; function as declared above), creates a random function name and assigns the callback to it. The server too responds by wrapping its json data in the random function name which it got from the request (see the first screenshot in this blog post). Once the http transaction is done, jQuery destroys the random function.</p>
<p align="justify">(<strong>Note:</strong> To test the trick jQuery uses, I used burp proxy to intercept and pause the request sent by jQuery. While pausing, I typed jQuery&rsquo;s random function name in browser&rsquo;s console and it printed the definition of the function. After the response is received, I did the same and I got that function is undefined. This way I was able to deduce the trick jQuery uses for JSONP).</p>
<p align="justify">In this process, jQuery does not fire an AJAX call. All it does is injection of script tag and serving javascript in its response. Since the syntax for AJAX and JSONP are maintained the same, web developers tend to confuse about JSONP.</p>
<p align="justify"><strong>So what mime-type should be served for a successful JSONP request?</strong></p>
<p align="justify">Well, this is a topic of confusion, at least for me. Since the served content is JavaScript, the preferred mime-type should be &ldquo;application/javascript&rdquo; or &ldquo;text/javascript&rdquo; or may be "application/json". In my demo, I&rsquo;ve changed the mime type of the above service to &ldquo;image/gif&rdquo;, &ldquo;text/css&rdquo; etc and the script still worked in all modern browsers without any warnings. Also, there are cases where browsers show a "<a href="http://stackoverflow.com/questions/5388893/ie9-json-data-do-you-want-to-open-or-save-this-file" target="_blank">save file</a>" dialog when wrong mime type is served. Enabling adhoc mime types has security concerns and <a href="http://www.json-p.org/" target="_blank">research is being done</a> in this area for standardizing mime-type. At least for now, &ldquo;application/javascript&rdquo; can be used and anyways <a href="http://www.html5rocks.com/en/tutorials/cors/" target="_blank">CORS</a> is the future, so no more content type worries.</p>
<p align="justify">Hope the article provided useful info. Share your thoughts or discuss if you see the need for any corrections. Happy coding <img class="wlEmoticon wlEmoticon-smile" style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" src="http://novogeek.com/image.axd?picture=wlEmoticon-smile_1.png" alt="Smile" /></p>
      