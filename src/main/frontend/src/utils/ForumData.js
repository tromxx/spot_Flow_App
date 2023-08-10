import React from 'react'


    // xml 제이슨으로 파싱해주는 함수 
    function xmlToJson(xml) {
        // Create the return object
        var obj = {};
      
        if (xml.nodeType == 1) {
          // element
          // do attributes
          if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) {
          // text
          obj = xml.nodeValue;
        }
    
    
    
        var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
          return node.nodeType === 3;
        });
        if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
          obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
            return text + node.nodeValue;
          }, "");
        } else if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
              obj[nodeName] = xmlToJson(item);
            } else {
              if (typeof obj[nodeName].push == "undefined") {
                var old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
            }
          }
        }
        return obj;
      }
  

    



    async function ForumData(start_idx, end_idx , type , title) {
        
        const KEY = "6c65415a6d73756e313131744f787146";
    
        const response = await fetch(`http://openapi.seoul.go.kr:8088/${KEY}/xml/culturalEventInfo/${start_idx}/${end_idx}/${type}/${title}/%20/`);
        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const json = xmlToJson(xmlDoc); 

        return json.culturalEventInfo.row;
    

        //CODENAME에는 문화교양/강좌,전시/미술,뮤지컬/오페라,기타,연극,무용,영화,국악,콘서트,축제-문화/예술,축제-전통/역사,축제-시민화합,클래식,축제-기타,축제-자연/경관,독주/독창회로 총16개 있습니다.

  
   
}

export default ForumData;