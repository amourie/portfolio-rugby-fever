google.load("feeds", "1");
var container = document.getElementById("rs-feed");

function initialize() {
    var feed = new google.feeds.Feed("http://www.radiosport.co.nz/rss-feeds/cricket-world-cup/");
    feed.setNumEntries(12);
    feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
    feed.load(function(result) {
       
        if (!result.error) {
            var container = document.getElementById("rs-feed");
            var items = result.xmlDocument.getElementsByTagName('item');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                
                //create container elements
                var colDiv = document.createElement("div");
                colDiv.className = "col-md-6 col-lg-4 col-sm-12 item-container";
                var h2link = document.createElement("a");
                h2link.setAttribute("target", "_blank");
                
                //create title & append
                var title = document.createElement("h2");
                if (item.getElementsByTagName('title')[0] != null) {
                    var innerText = item.getElementsByTagName('title')[0].firstChild.nodeValue;
                    title.innerHTML = innerText;
                    h2link.appendChild(title);
                    colDiv.appendChild(h2link);
                }

                //create image link
                var imglink = document.createElement("a");
                colDiv.appendChild(imglink);
                imglink.setAttribute("target", "_blank");

                //the img
                var imgBackUpUrl = "assets/img/cricketfeverbackup.png";
                var imgElement = document.createElement("img");
                if (item.getElementsByTagName("enclosure")[0] != null) {
                    var imgUrl = item.getElementsByTagName("enclosure")[0].getAttribute("url");
                    imgElement.setAttribute("src", imgUrl);
                    imgElement.setAttribute("class", "img-responsive");
                    if (item.getElementsByTagName('title')[0] != null) {
                        var imgAltText = item.getElementsByTagName('title')[0].firstChild.nodeValue;
                        imgElement.setAttribute("alt", imgAltText);
                    }
                } 
                else {
                    imgElement.setAttribute("src", imgBackUpUrl);
                }
                imglink.appendChild(imgElement);
                
                //the pubdate
                var date = document.createElement("span");
                date.className = "date";
                if (item.getElementsByTagName('storydate')[0] != null) {
                    var dateText = item.getElementsByTagName('storydate')[0].firstChild.nodeValue;
                    var dateObj = new Date(dateText);
                    var newDate = dateObj.toDateString() + " " + dateObj.toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    date.innerHTML = newDate;
                    colDiv.appendChild(date);
                }

                //create button
                var actionButton = document.createElement('div');
                actionButton.className = "btn btn-default btn-orange";
                actionButton.innerHTML = "Read More";

                //append image link
                var btnLink = document.createElement("a");
                colDiv.appendChild(btnLink);
                btnLink.setAttribute("target", "_blank");
                colDiv.appendChild(btnLink);
                btnLink.appendChild(actionButton);

                //create description and append
                var descriptElement = document.createElement("p");
                var maxLength = 150;
                if (item.getElementsByTagName('description')[0] != null) {
                    var descriptText = item.getElementsByTagName('description')[0].firstChild.nodeValue;
                    if (descriptText.length > maxLength) {
                        descriptText = descriptText.substring(0, maxLength);
                        descriptText = descriptText.replace(/\w+$/, '');
                        descriptText = descriptText + "...";
                    }
                    descriptElement.innerHTML = descriptText;
                    colDiv.appendChild(descriptElement);
                }
                if (item.getElementsByTagName('contentlink')[0] != null) {
                    var href = "http://www.radiosport.co.nz" + item.getElementsByTagName('contentlink')[0].firstChild.nodeValue;
                    imglink.setAttribute("href", href);
                    h2link.setAttribute("href", href);
                    btnLink.setAttribute("href", href);
                }
                //set source attribution label
                var labelElement = document.createElement("p");
                labelElement.className = "labelRS labelText";
                var labelLink = document.createElement("a");
                labelLink.setAttribute("href", "http://www.radiosport.co.nz");
                labelLink.setAttribute("target", "_blank");
                labelLink.innerHTML = "Radio Sport";
                labelElement.appendChild(labelLink);
                colDiv.appendChild(labelElement);
                container.appendChild(colDiv);
            }
        }
        //if feed result returns error - display error msg
        else {
            var container = document.getElementById("rs-feed");
            var pMsg = document.createElement("h1");
            pMsg.innerText = "404: Apologies for the inconvenience. The content feed is pulled from an external website and could not be retrieved. It may have been moved. ";
            container.appendChild(pMsg);        
        }
    });
}
google.setOnLoadCallback(initialize);