---
title: HTML5 Sandbox and some notes
status: publish
tags: ['HTML5','JavaScript','Security']
date: '2012-06-26'
---


        <p align="justify">While building mashups, one of the primary goals is to securely isolate content coming from different origins. Generally, client side mashups are built in one of the two ways-(1) Embedding third party scripts in a web page (2) Loading remote content via iframes. Embedding scripts provides more interactivity but dilutes security since the scripts run with full privileges and could be malicious. Using iframes reduces interactivity but enhances security since they isolate content via same-origin-policy (Script inside a cross-origin iframe cannot access DOM of parent page).</p>
<p align="justify">[Note: By chance if you are wondering why you should bother about mashups since you have never built them, you are mistaken. If you are embedding scripts for website analytics, social plugins (Like, Tweet, +1 etc.), advertisements, comments system (e.g., Disqus) and so on, you are already having a mashup!]</p>
<p align="justify">Though iframes follow same-origin-policy and provide security in some sense, they are well known for their notorious activities like frame phishing, top window redirection, clickjacking, triggering drive by downloads etc. The &ldquo;sandbox&rdquo; attribute for iframes which is introduced in HTML5 promises to thwart the problems caused by iframes. Sandbox is currently supported only in Internet Explorer 10, Chrome 17+.</p>
<p align="justify">A sandboxed iframe by default disables script, popups, form submissions, top navigation etc. Some of the restrictions can be relaxed by specifying space separated white list tokens (allow-forms, allow-scripts, allow-same-origin, allow-top-navigation).</p>
<div id="codeSnippetWrapper" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New', courier, monospace; direction: ltr; height: 67px; max-height: 200px; font-size: 8pt; overflow: auto; cursor: text; border: silver 1px solid; padding: 4px;">
<div>
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff">&lt;</span><span style="color: #800000">iframe</span> <span style="color: #ff0000">sandbox</span> <span style="color: #ff0000">src</span><span style="color: #0000ff">="http://crossOrigin.com"</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">iframe</span><span style="color: #0000ff">&gt;</span><br /><span style="color: #0000ff">&lt;</span><span style="color: #800000">iframe</span> <span style="color: #ff0000">sandbox</span><span style="color: #0000ff">="allow-forms allow-scripts allow-same-origin allow-top-navigation"</span> <br />        <span style="color: #ff0000">src</span><span style="color: #0000ff">="page2.html"</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">iframe</span><span style="color: #0000ff">&gt;</span><br /><br /><br /></pre>
</div>
</div>
<p align="justify">The details about sandbox and its white list tokens are discussed in several blogs, hence purposefully omitting it here. One interesting feature in sandbox is, when a sandboxed iframe loads content from the same origin as the parent document, the loaded content is still treated as if it originated from cross origin, thereby reducing its script privileges. This restriction can be removed by using the token &ldquo;allow-same-origin&rdquo;.</p>
<p align="justify">Below are some of the cases where developers have to be cautious while using sandbox.</p>
<p align="justify"><strong>Disabling Clickjacking Defense:</strong></p>
<p align="justify">Even till date, several sites rely on JavaScript based frame busting defense to get rid of clickjacking (X-Frame-Options response header is a better defense, but unfortunately has lesser implementation). Such sites when embedded in a sandboxed iframe are greatly affected. Since sandbox disables JavaScript, the clickjacking protection used in the framed site is lost, hence back to square one!</p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong></strong></p>
<p align="justify"><strong>Allow-scripts and Allow-same-origin combination:</strong></p>
<p align="justify">This combination of tokens is a little tricky and could negate the effect&nbsp; of sandbox. The &ldquo;allow-scripts&rdquo; token enables JavaScript inside iframe and the &ldquo;allow-same-origin&rdquo; token will give the iframe complete privileges to access DOM of the parent. So if the embedded iframe has a vulnerable input field, script can be injected to remove the &ldquo;sandbox&rdquo; attribute altogether and then carry further exploits. Thus the security benefits of sandbox can be removed completely.</p>
<p align="justify"><strong>Effect on Nested Browsing Contexts:</strong></p>
<p align="justify">If a webpage has nested browsing contexts (page containing an iframe which in turn loads another iframe), then reasoning about the effect of sandbox tokens becomes complicated. Let us consider the scenario in the image on the right below-a parent page has an iframe to a page (Child1) with "allow-scripts" sandbox token. Child1 loads another iframe which points to Child2 having "allow-forms" token. At a quick glance, developers may conclude that the innermost page will have both forms and scripts allowed, but it is on the contrary. The inner page has everything disabled and for a good reason! The child1 frame has forms disabled and it will overwrite the "allow-forms" of Child2. Also, Child1 has scripts enabled but Child2 has them disabled. Hence it does not allow script execution. So it is advisable not to manipulate sandbox tokens dynamically, since it is difficult to reason about the after effects on sandbox restrictions.</p>
<p align="justify"><strong><span style="text-decoration: underline;">DEMOS</span></strong>: Click the images for demos (Source at: <a href="https://github.com/novogeek/html5sandbox">https://github.com/novogeek/html5sandbox</a> )</p>
<p align="right"><a href="http://novogeek.github.com/html5sandbox/" target="_blank"><img style="background-image: none; border-right-width: 0px; margin: 0px 10px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; float: left; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="iframeSandbox1" src="/pics/articles/iframeSandbox1.jpg" border="0" alt="Sandbox demo 1" width="415" height="221" align="left" /></a></p>
<p><a href="http://novogeek.github.com/html5sandbox/parentSandbox.html" target="_blank"><img style="background-image: none; border-right-width: 0px; margin: 0px 10px 0px 0px; padding-left: 0px; padding-right: 0px; display: inline; float: left; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="iframeSandbox2" src="/pics/articles/iframeSandbox2.jpg" border="0" alt="Sandbox demo 2" width="344" height="254" align="left" /></a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>In the first demo, there is an iframe with JS based clickjacking protection and by default sandbox option is selected. You can see the clickjacking defense by selecting &ldquo;normal frame&rdquo;. So this shows how sandbox defeats JS based clickjacking defense. Also in the same demo you can select &ldquo;allow-scripts&rdquo; and &ldquo;allow-same-origin&rdquo; optons and inject the snippets provided below the page into the XSS vulnerable page.</p>
<p>In the second demo, inspect the iframes and load them independently in different windows and to see the effect of sandbox tokens in nested browsing contexts.</p>
<p>Hope the article provided some useful information about HTML5 Iframe Sandbox and its secure usage. Feel free to get back with queries or please share aspects which you feel interesting about Sandbox. Happy coding <img class="wlEmoticon wlEmoticon-smile" style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" src="http://novogeek.com/image.axd?picture=wlEmoticon-smile.png" alt="Smile" /></p>
      