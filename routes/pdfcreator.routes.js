const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');
const ejs = require('ejs');
let path = require('path');
var moment = require('moment');
const fs = require('fs');
const PDFMerger = require('pdf-merger-js');

router.get('/', (req, res) => {
	res.send('we are the pdfs');
});

router.post('/pdf', (req, res) => {
	var infos = req.body;
	var hsp = Math.sqrt(0.299 * (infos.red1 * infos.red1) + 0.587 * (infos.green1 * infos.green1) + 0.114 * (infos.blue1 * infos.blue1));
	var colorBool=false
	if (hsp > 127.5) {
		colorBool=true;
	} else {
		colorBool=false;
	}
	var absatz1 = infos.absatz1;
	absatz1 = absatz1.split(' ');
	var absatz2 =
		'Ich mache gerade eine Reha-Umschulung zum Fachinformatiker / Fachbereich Anwend-ungsentwicklung. Dabei habe ich den Umgang mit *Java und *Python, Office Programmen, *Datenbanken, Windows, Hardware und *Netzwerktechnik erlernt und möchte das Gelernte nun gerne in der Praxis umsetzen. Bereits seit früher Jugend habe ich mit dem Programmieren begonnen, zunächst mit Basic-Sprachen, dann mit *objektorierteren *Sprachen, wie C++ oder Java bis hin zu Unity und *C# jüngerer Vergangenheit. Ich habe mir zudem selbst während der Ausbildung Grundkonzepte von *Javascript, *NodeJs und *React beigebracht. Ich habe ebenso bereits ein paar *kleinere *Daten-Projekte mit Python erstellt.';
	absatz2 = absatz2.split(' ');
	var absatz3 =
		'Während meiner Ausbildung habe ich mich als *besonders *teamfähig gezeigt. Eine Stärke von mir ist es, Probleme *lösungsorientiert anzugehen. Beides habe ich in diversen *Gruppenarbeiten unter Beweis gestellt. Zudem erweise ich mich als sehr *lernfähig und zeige dabei eine große und *schnelle *Auffassungsgabe. Dies konnte ich vor allem durch das *Selbststudium von React und anderen Konzepten während der Ausbildung beweisen.';
	absatz3 = absatz3.split(' ');
	var absatz4 =
		'Gerne werde ich Ihnen mehr von mir und meinen *Fähigkeiten berichten, wenn Sie mich zu einem Gespräch einladen.';
	absatz4 = absatz4.split(' ');
	const pic = fs.readFileSync('bild.txt', 'utf8');

	ejs.renderFile(
		'./makeApplication.ejs',
		{
			infos: infos,
			moment: moment,
			absatz1: absatz1,
			absatz2: absatz2,
			absatz3: absatz3,
			absatz4: absatz4,
			colorBool: colorBool,
			pic: pic
		},
		function(err, result) {
			// render on success
			if (result) {
				html = result;
			} else {
				// render or error
				res.end('An error occurred');
				console.log(err);
			}
			pdf.create(html, { format: 'a4' }).toFile('./public/test.pdf', async function(err, res) {
				if (err) {
					console.log(err);
				} else {
					var merger = new PDFMerger();
					merger.add('./public/test.pdf',[1,2, 3]);
					merger.add('./public/Anlagen.pdf');
					await merger.save('./public/Bewerbung_Praktikum_' + infos.company + '_Ihmels.pdf');
				}
			});
			res.send(html);
		}
	);
});

async function merge(company) {
	var merger = new PDFMerger();
	merger.add('./public/test.pdf');
	merger.add('./public/Anlagen.pdf');
	await merger.save('./public/Bewerbung_Praktikum_' + company + '_Ihmels.pdf');
}

router.get('/getPdf', async (req, res) => {
	var comp = req.query.comp;
	var filename = './public/Bewerbung_Praktikum_' + comp + '_Ihmels.pdf';
	var file = fs.createReadStream(filename);
	var stat = fs.statSync(filename);
	res.setHeader('Content-Length', stat.size);
	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
	file.pipe(res);
});

router.post('/html', (req, res) => {
	var infos = req.body;
	var hsp = Math.sqrt(0.299 * (infos.red1 * infos.red1) + 0.587 * (infos.green1 * infos.green1) + 0.114 * (infos.blue1 * infos.blue1));
	var colorBool=false
	if (hsp > 127.5) {
		colorBool=true;
	} else {
		colorBool=false;
	}
	var absatz1 = infos.absatz1;
	absatz1 = absatz1.split(' ');
	var absatz2 =
		'Ich mache gerade eine Reha-Umschulung zum Fachinformatiker / Fachbereich Anwend-ungsentwicklung. Dabei habe ich den Umgang mit *Java und *Python, Office Programmen, *Datenbanken, Windows, Hardware und *Netzwerktechnik erlernt und möchte das Gelernte nun gerne in der Praxis umsetzen. Bereits seit früher Jugend habe ich mit dem Programmieren begonnen, zunächst mit Basic-Sprachen, dann mit *objektorierteren *Sprachen, wie C++ oder Java bis hin zu Unity und *C# jüngerer Vergangenheit. Ich habe mir zudem selbst während der Ausbildung Grundkonzepte von *Javascript, *NodeJs und *React beigebracht. Ich habe ebenso bereits ein paar *kleinere *Daten-Projekte mit Python erstellt.';
	absatz2 = absatz2.split(' ');
	var absatz3 =
	'Während meiner Ausbildung habe ich mich als *besonders *teamfähig gezeigt. Eine Stärke von mir ist es, Probleme *lösungsorientiert anzugehen. Beides habe ich in diversen *Gruppenarbeiten unter Beweis gestellt. Zudem erweise ich mich als sehr *lernfähig und zeige dabei eine große und *schnelle *Auffassungsgabe. Dies konnte ich vor allem durch das *Selbststudium von React und anderen Konzepten während der Ausbildung beweisen.';
	absatz3 = absatz3.split(' ');
	var absatz4 =
		'Gerne werde ich Ihnen mehr von mir und meinen *Fähigkeiten berichten, wenn Sie mich zu einem Gespräch einladen.';
	absatz4 = absatz4.split(' ');
	const pic = fs.readFileSync('bild.txt', 'utf8');

	ejs.renderFile(
		'./makeApplication.ejs',
		{
			infos: infos,
			moment: moment,
			absatz1: absatz1,
			absatz2: absatz2,
			absatz3: absatz3,
			absatz4: absatz4,
			colorBool: colorBool,
			pic: pic
		},
		function(err, result) {
			// render on success
			if (result) {
				html = result;
			} else {
				// render or error
				res.end('An error occurred');
				console.log(err);
			}
			res.send(html);
		}
	);
});

module.exports = router;
