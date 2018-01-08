var quote = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
var name = "Amy Gutmann";
var title = "Penn President";
var showAttribution = true;
var centerElements = false;
var inverseColors = false;
var useWordmark = false;

// colors by publication
var primary = ['#aa1e22', '#44bfbf', '#446cb3'];
var logo = ['logos/dp.svg', 'logos/street.svg', 'logos/utb.svg'];
var inverse = ['logos/inverse-dp.svg', 'logos/inverse-street.svg', 'logos/utb.svg'];

var wrapText = function(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

var renderContent = function() {
  var canvas = document.getElementById("canvas");
  canvas.width = 1000;
  canvas.height = 500;

  var pub = document.getElementById("publicationSelect").selectedIndex;

  // QUOTE TEXT + BG + IMG
  var quoteCtx = canvas.getContext("2d");
  quoteCtx.fillStyle = primary[pub];
  quoteCtx.fillRect(0, 0, canvas.width, canvas.height);
  if (inverseColors) {
    quoteCtx.fillStyle = "#ffffff";
    quoteCtx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
  }

  if (centerElements) {
    quoteCtx.textAlign = "center";
  }

  quoteCtx.font = "200 38px lora";
  if (inverseColors) {
    quoteCtx.fillStyle = primary[pub];
  } else {
    quoteCtx.fillStyle = "#ffffff";
  }
  wrapText(quoteCtx, quote + "\”", 50, canvas.height / 2 - (showAttribution ? 50 : 0), 800, 48);
  quoteCtx.fillText("\“", 36, canvas.height / 2 - (showAttribution ? 50 : 0));

  var image = new Image();
  image.onload = function() {
      quoteCtx.drawImage(image, canvas.width - 150, 70, 92, 70);
  }
  if (useWordmark) {
    if (inverseColors) {
      image.src = "logos/inverse-dp-wordmark.svg";
    } else {
      image.src = "logos/dp-wordmark.svg";
    }
  } else {
    if (inverseColors) {
      image.src = inverse[pub];
    } else {
      image.src = logo[pub];
    }
  }
  image.width = 20;

  if (showAttribution) {
	  // NAME TEXT
	  var nameCtx = canvas.getContext("2d");
	  nameCtx.font = "38px neuzeit-grotesk";
    if (inverseColors) {
      nameCtx.fillStyle = primary[pub];
    } else {
      nameCtx.fillStyle = "#ffffff";
    }
	  nameCtx.fillText(name + " | ", 50, canvas.height - 70);

	  // TITLE TEXT
	  var titleCtx = canvas.getContext("2d");
	  titleCtx.font = "100 38px neuzeit-grotesk";
	  titleCtx.fillText(title, nameCtx.measureText(name + " | ").width + 60, canvas.height - 70);
	}
}

window.setTimeout(function() {
  renderContent();
}, 700);

document.getElementById('quoteBox').oninput = function() {
  quote = this.value;
  renderContent();
}

document.getElementById('quoteAttr').oninput = function() {
  name = this.value;
  renderContent();
}

document.getElementById('quoteTitle').oninput = function() {
  title = this.value;
  renderContent();
}

document.getElementById('saveButton').addEventListener("click", function() {
  var dataURL = canvas.toDataURL("image/png");
  var data = atob(dataURL.substring("data:image/png;base64,".length)),
    asArray = new Uint8Array(data.length);
  for (var i = 0, len = data.length; i < len; ++i) {
    asArray[i] = data.charCodeAt(i);
  }
  var blob = new Blob([asArray.buffer], {
    type: "image/png"
  });
  saveAs(blob, "quote.png");
});

/*
*
* Event Handlers
*
*/

// Toggle Attribution
var toggleAttrCheckbox = document.getElementById('toggleAttribution');
toggleAttrCheckbox.addEventListener('click', function() {
	showAttribution = !showAttribution;
	renderContent();
});

// Toggle Center Elements
var toggleCenterCheckbox = document.getElementById('centerElements');
toggleCenterCheckbox.addEventListener('click', function() {
	centerElements = !centerElements;
	renderContent();
});

// Toggle Inverse Colors
var toggleColorsCheckbox = document.getElementById('inverseColors');
toggleColorsCheckbox.addEventListener('click', function() {
	inverseColors = !inverseColors;
	renderContent();
});

// Change Selected Publication
var publicationSelect = document.getElementById('publicationSelect');
publicationSelect.addEventListener('change', function() {
  // wordmark is only available for DP
  if (document.getElementById('publicationSelect').selectedIndex != 0) {
    document.getElementById('useWordmark').disabled = true;
    document.getElementById('useWordmark').checked = false;
    useWordmark = false;
  } else {
    document.getElementById('useWordmark').disabled = false;
  }
	renderContent();
});

// Toggle Wordmark
var useWordmarkCheckbox = document.getElementById('useWordmark');
useWordmarkCheckbox.addEventListener('click', function() {
  useWordmark = !useWordmark;
	renderContent();
});
