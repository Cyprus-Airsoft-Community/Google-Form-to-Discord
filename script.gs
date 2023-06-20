const POST_URL = "DISCORD WEBHOOK URL";

function onSubmit(e) {
  const response = e.response.getItemResponses();
  let items = [];
  let nameAnswer = ''; // Variable to store the answer to the "name" question

  for (const responseAnswer of response) {
    const question = responseAnswer.getItem().getTitle();
    const answer = responseAnswer.getResponse();
    let parts = [];

    try {
      parts = answer.match(/[\s\S]{1,1024}/g) || [];
    } catch (e) {
      parts = answer;
    }

    if (!answer) {
      continue;
    }


    for (const [index, part] of Object.entries(parts)) {
      if (index == 0) {
        items.push({
          "name": question,
          "value": part,
          "inline": false
        });
      } else {
        items.push({
          "name": question.concat(" (cont.)"),
          "value": part,
          "inline": false
        });
      }
    }
  }

  const options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
    },
    "payload": JSON.stringify({
      "content": null,
      "embeds": [{
        "title": "Excel File",
        //"description": "New Form", 
        "url": "URL LINK", // Set the URL for the title
        "color": 10257647, // Set the color to 10501743
        "fields": items,
        "footer": {
          "text": "AUTHOR",
          "icon_url": "AUTHOR URL ICON" // Set the image URL for the footer icon
        },
        "timestamp": new Date().toISOString()
      }]
    })
  };

  UrlFetchApp.fetch(POST_URL, options);
};
