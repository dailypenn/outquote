var quote = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
var name = "Amy Gutmann";
var title = "Penn President";
var showAttribution = true;
var centerElements = false;
var inverseColors = false;

// colors by publication
var primary = ['#aa1e22', '#44bfbf', '#446cb3'];

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
  };
  image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADkAQMAAAAYf4tbAAAABlBMVEX///////9VfPVsAAAAAnRSTlMD/Om1IMwAAASDSURBVHhe1dhBrhwnEAbgQkjBu84yC2u4QpZeWGkfIgfwEbz0wjLcIDeIr8JNzA3CkgWhohmqukiDPSiZ917Sm2Hor/+malqjFiAHYoXxeNU+PtBXhYiYRva6fbj2oa8Ky8h+IZZEIfo2afPBkBgGgI0URopmDwo9sf5oKVZWaTBMWOG5QmzDOGHIRVdiFtOMea6HmMM8YwGooNAY335nIKVaYQqxzljiqUSFIvrGho44YRvlCpOOkOeziVrZHxVAsafgMmEIoNlTcJ0zw+wCumvSub+G/YWGacICbMIsLXPGLMdeYOc5MCcWe+aOZuozk4iLklucWeqYlmvVwByfuhhJg+8w+wd3aXjgcsf232hy9ogcsRc0xw8N9pvMVmIFhsYVwLoRK1oeQj2wBMSSlkcajt5oYgH2W4SNik8dNRQaVYVtvRn2ANw2Xlx8S49BVbUNMjjqlvyNRLgyc2OlDbJCvhO041eAG9PM9JVpbLHyJ0pM3VgmtvEDX3rGRavUfLZf2wDzmbmOFfeFik9TFltsqRYA1MDoWiD2Z7F0Zcf8wDCPzDRmryzQ3ePIdjiYZxZGhhPmB6ZrY9v17Lt2ssLAtgkrI7M9o5InzJUVpnCJ6TVm1ti2xuwa2zGvMNez8E2GS2kKl9L0Q5kZmfvnbFu76baWZh/DcmP7Wtr+0DS3luaeKM18Lw3v/FiZ2JDmcGBDWtMLaTsupbmlNIVLaXrK3DnNzJjBc9o2YxbPaXbG3BJTOLB9wvTI3ISZh7JtZDhh9qFsf2Km/kWaG9NegsHTp+HIltO8W2EZ9pWbRtgX0lxYY36NwYQlfWafZwzgzN5O2Oc19mlkryfs48h+mrA3a+znkb1aY/Dk7McbS/cYPAGLL8HCQ5lfY/BIVtdYWWN5jaUFphDjGgtrzE/Z5cxgnuZ7prEMDG8s/Z3lM7ONlcYKsXhm2Bj6jhn0J6aZxZ5V6FkE2Jjljm3pzCyz2jHbXjo75pjhbVyPzVWLmIXhwYKw97Rm31gCJSwJoz5hZKaZ8a4SM5onZoTVnul+vy/DJgx7ZhsLxGzHvJPNYtdYvLECe8eiMNUUZmKuY8khRllaOzGy0u0QE6s3VgE7Vh2HydaaH1nXNccsXBkvlVlhxgqj4R0xYbKVcLBksMKZBWLmYNnSD9szUlxoqx7OrH88JG9gWQod97+FJWadqjAwrkB1LI3MD/2gS62wrlDTMRhYHfuBhVl0zMrQD65qxwI7szxhgVgUlpjtwnjCC4tjdwuxCsKCdLdS7zKx3DEv3fXUvEjxsWMcpjHxCgOxMGMtV8uU88Quu3TXFK6kMgNmm3R3S9w+nvp0MN1118sa2/HxYCDswoOjkx+E7XwpvOGBCyPbIvDk+e7wXpg+2Dse/MCDIEwF+PYhDN6tMfhvsvoSafXZ1+YeVIKkvQSrj017dob/e6bWGT4v45fIB7KvGO4yg/hljW0Y77INq1ljGtNdZrEAlgWWwdU7jN8Kfr/PAlis95hDD+Y+uwq1wMo18h5TmADA3mH0mqDuMVPOM38B55BpP+SN4FgAAAAASUVORK5CYII=";
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
	renderContent();
});
