const paragraphs = [
  'Deutsches Ipsum Dolor deserunt dissentias Ich bin ein Berliner et. Tollit argumentum Eichhörnchen an. Saepe lobortis Ohrwurm per ne, nam Milchreis probatus pertinax, impetus über aliquando no sea. Die Ärzte scripserit no vis, Honigkuchenpferd meis suscipit ea. über ea offendit eleifend, Kaftfahrzeug-Haftpflichtversicherung blandit voluptatibus sed, Zauberer eius consul sanctus genau Cu quas legimus Die unendliche Geschichte vim',
  'Id latine indoctum Audi pri, mea meliore Aufenthaltsgenehmigung nominavi id. Elitr Handtasche nam an, his Kirschkerne reque euismod assentior. Hamburg principes iracundia ex genau Ut vel solum Ritter Sport quas natum adversarium Mettwurst ius, diam minim Ohrwurm eum no',
  'Sit amet, Stuttgart adipiscing elit, sed zu spät eiusmod tempor incididunt Hockenheim labore et dolore Milchreis aliqua. Ut enim Brezel minim veniam, quis genau exercitation ullamco laboris Vorsprung durch Technik ut aliquip ex Bratwurst commodo consequat. Duis Bier irure dolor in Ampelmännchen in voluptate velit Apfelstrudel cillum dolore eu Brezel nulla pariatur. Excepteur Apfelstrudel occaecat cupidatat non Mesut Özil sunt in culpa Kreuzberg officia deserunt mollit Wiener Würstchen id est laborum',
  'Meliore Lebensabschnittsgefährte et mel. Te Frau Professor utamur vix. Exerci Bahnhof eu per. Principes Glühwein eos no. His Aufenthaltsgenehmigung moderatius ut, at Hamburg omnis minim epicurei, Danke feugait mel ei. Wiener Schnitzel purto singulis te',
  'Quo Audi posidonium at, adhuc Mertesacker sadipscing per at, Sprechen Sie deutsch mei ullum gloriatur. Käsefondue inermis recteque accommodare Wiener Würstchen Id nec assum Glühwein te melius erroribus Eichhörnchen Nec ut amet Erbsenzähler iriure, prodesset gloriatur Die unendliche Geschichte ut. Dicunt virtute Bahnhof per no. At Freude schöner Götterfunken scaevola eum. An Kartoffelkopf malorum efficiendi ius',
  'Meliore Danke et mel. Te Oktoberfest utamur vix. Exerci bitte eu per. Principes Bier eos no. His Entschuldigung moderatius ut, at Autobahn omnis minim epicurei, Die Toten Hosen feugait mel ei. Jürgen Klinsmann purto singulis te',
  'Quo Brezel posidonium at, adhuc Hörspiele sadipscing per at, genau mei ullum gloriatur. Mertesacker inermis recteque accommodare Frau Professor Id nec assum Michael Schuhmacher te melius erroribus Weihnachten Nec ut amet Schwarzwälder Kirschtorte iriure, prodesset gloriatur Audi ut. Dicunt virtute Weltschmerz per no. At Mesut Özil scaevola eum. An Guten Tag malorum efficiendi ius',
  'Deserunt Guten Tag has et. Tollit Prost ius an. Saepe Glühwein elaboraret per ne, Krankenschwester eu probatus pertinax, Ich bin ein Berliner eripuit aliquando no Grossbritannien Diam scripserit no Aperol Spritz eos meis suscipit Guten Tag Eam ea offendit Helmut Kohl ad blandit voluptatibus Schwarzwälder Kirschtorte ad eius consul Bildung vix. Cu quas Currywurst veritus vim',
  'Id latine Rotwurst complectitur pri, mea Angela Merkel denique nominavi id. Hörspiele expetenda nam an, Handtasche ei reque euismod Döner Odio principes iracundia Bratwurst pri. Ut vel Hamburg mandamus, quas natum Gemeinsamkeit ei ius, diam 99 Luftballons honestatis eum no',
]

function* iterateParagraph () {
  for (let i = 0, len = paragraphs.length; i < len; ++i) {
    yield paragraphs[i]
    if (i + 1 === len) i = 0
  }
}

let gen

export function initialise () {
  gen = iterateParagraph()
}

export function getParagraph () {
  return gen.next().value
}