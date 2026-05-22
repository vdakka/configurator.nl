# Designbrief, Swipegame Quickscan voor Claude Design

Project: Configurator.nl Quickscan. Doel: wireframe (mobiel én desktop) van een swipegame waarin een bezoeker in maximaal 10 stellingen ontdekt of een productconfigurator past bij zijn situatie. Eindigt in een match-formulier voor contact met Gerke.

Referentie en toon: zie het Happy Horizon voorbeeld https://e.happyhorizon.com/3/4/1513/3/50uBo7fUXb9ni1d5t3Gzd1vCJz-zBJA5be912DistzoT1Z1jLvGnY0oIx2Qx9xezrqpmEg_4q8--RBXnGM4J8w. Stijl moet aansluiten op de bestaande Configurator.nl wireframe (v2).

## Branding tokens

- Happy Blue: #070733 (achtergrond donker, tekst, primaire CTA)
- Happy Yellow: #FCE512 (accent, swipe rechts, highlights, vorm op achtergrond)
- Happy White: #FFFFFF (kaarten, tekst op donker)
- Happy Grey: #F2F4F6 (rust, dividers, secundaire backgrounds)
- Typografie: Montserrat (800/900 voor displays, 600 voor CTA, 400 voor body)

## Schermen, in volgorde

### Scherm 1: Intro

- Bovenaan: logo Configurator.nl
- Titel groot, displaystijl: "Past een configurator bij jouw bedrijf?"
- Subtitel: "Doe de Quickscan. 10 stellingen, 2 minuten."
- Visueel: grote gele cirkelvorm linksachter (zelfde stijl als de Gerke-foto compositie)
- Primaire CTA, geel met donkerblauwe tekst: "Start de Quickscan"
- Kleine link onder de CTA: "Hoe werkt het?" (opent eventueel tooltip)

### Scherm 2: Korte profielvraag

- Eén kaart met de vraag: "Wie zijn jouw klanten vooral?"
- Drie keuzeknoppen (verticaal gestapeld op mobiel, horizontaal op desktop):
  - "Vooral zakelijk (B2B)"
  - "Vooral consumenten (B2C)"
  - "Beide ongeveer evenveel"
- Antwoord bepaalt welke 3 extra stellingen in de set komen (zie set-logica onder)
- Geen progressie-indicator op dit scherm

### Scherm 3 t/m 12: Swipe-kaarten (10 keer, template)

Layout per kaart:

- Bovenaan, gecentreerd: progressie-indicator "Vraag 3 van 10" plus voortgangsbalk
- Centraal: de kaart, met grote ruimte rondom
- Op de kaart:
  - Klein label bovenaan: "Stelling"
  - Hoofdtekst, groot en gecentreerd: de stelling
  - Onderaan in de kaart: subtiele swipe-hint, "Swipe rechts als dit klopt"
- Onder de kaart, twee ronde actieknoppen:
  - Links: rood/grijs cirkeltje met kruis, label "Niet herkenbaar"
  - Rechts: geel cirkeltje met vinkje, label "Ja, dat zijn wij"
- Op desktop ook werkbaar met pijltjestoetsen (links/rechts) en muisklik op de knoppen

Interactie:

- Swipe of klik registreert antwoord
- Kaart kantelt licht en faded weg (tilt + fade animatie, ~250ms)
- Volgende kaart slidet in van onderen
- Optie "Vorige" als kleine tekstlink linksboven (alleen vanaf vraag 2)

### Scherm 13: Tussenscherm (optioneel, 1 seconde)

- Volledig scherm in Happy Blue
- Centraal in geel: "Even rekenen..."
- Houdt spanning vast voor de uitslag

### Scherm 14a: Match (8 tot 10 keer rechts)

- Achtergrond: half wit, half geel zoals de huidige "It's a match" pagina
- Foto van Gerke rechtsboven in cirkelcompositie (gebruik bijgeleverde foto, plaats hem zelf in de Configurator.nl folder als gerke-portret.png)
- Titel: "It's a match!"
- Subtekst: "Op basis van jouw antwoorden is er een grote kans dat een configurator jullie verkoopproces flink helpt. Gerke neemt deze week contact op om samen te kijken hoe."
- Formulier (zelfde velden als bestaande pagina):
  - Voor- en achternaam
  - Telefoonnummer
  - Url LinkedIn profiel
  - Checkbox: "JA, Gerke mag contact opnemen"
- Primaire CTA, donkerblauw: "Verzenden"
- Onderaan: "Volg ons" met LinkedIn icoon

### Scherm 14b: Kansen (5 tot 7 keer rechts)

- Zelfde stijl, andere kop
- Titel: "Er liggen kansen voor jullie."
- Subtekst: "Een paar van je antwoorden wijzen op duidelijke configurator-kansen. Laat je e-mail achter, dan stuurt Gerke je een korte analyse op maat."
- Formulier korter: alleen voor- en achternaam plus e-mailadres
- Primaire CTA: "Stuur mij de analyse"

### Scherm 14c: Nog niet (4 of minder keer rechts)

- Vriendelijke variant, geen formulier
- Titel: "Misschien is een configurator nu nog niet jullie prioriteit."
- Subtekst: "Geen probleem. Wil je je toch laten inspireren door wat collega's met een configurator hebben bereikt? Download dan het Configurator.nl inspiratiestuk."
- Secundaire CTA: "Download inspiratiestuk"
- Tertiaire link: "Speel opnieuw"

### Scherm 15: Bevestiging na verzending

- Eenvoudige bedankt-pagina
- Titel: "Bedankt, we nemen snel contact op."
- Optioneel: "Speel de Quickscan opnieuw" of "Terug naar de homepage"

## Componenten om los aan te leveren

- Swipe-kaart (template, 1 component met variabele tekst)
- Progressie-indicator met balk en tellertekst
- Twee ronde actieknoppen (nee/ja)
- Match-formulier (drie velden plus checkbox plus CTA)
- Kort match-formulier (twee velden plus CTA)
- Resultaatscherm header (titel plus subtekst plus illustratie/foto)
- Mobile bottom-sheet variant van de match-form (alternatief voor smalle schermen)

## Set-logica voor de stellingen (max 10 per sessie)

Kernset, 10 stellingen, geschikt voor iedereen:

1. Ons product heeft veel varianten, opties of maatwerk.
2. Klanten stellen telkens dezelfde vragen voordat ze beslissen.
3. Een offerte maken kost ons gemiddeld meer dan een uur.
4. We verliezen leads omdat het keuzeproces te complex is.
5. Onze website laat nu niet zien wát er allemaal mogelijk is.
6. Sales en engineering zijn veel tijd kwijt aan dezelfde rekensommen.
7. We willen méér verkopen zonder dat het team mee hoeft te groeien.
8. Fouten in offertes of orders kosten ons regelmatig geld.
9. We zijn klaar om dit jaar te investeren in een digitale verkoopoplossing.
10. Ik wil graag sparren met iemand die dit vaker heeft gedaan.

Bij keuze B2B in scherm 2: vervang stelling 5, 6 en 7 door:

- Onze klanten kopen pas na meerdere contactmomenten met sales.
- We werken met dealers, agenten of partners die ook moeten kunnen offreren.
- Een koppeling met ons ERP, CRM of PIM is voor ons belangrijk.

Bij keuze B2C in scherm 2: vervang stelling 5, 6 en 7 door:

- Onze klanten willen zelf online samenstellen, zonder hulp van sales.
- Een visuele weergave van het eindproduct is voor onze klanten doorslaggevend.
- Onze klanten haken af als ze de prijs niet direct zien, inclusief BTW.

Bij keuze Beide: gebruik de kernset, en voeg 1 B2B en 1 B2C extra toe in plaats van stelling 6 en 7.

## Microcopy voor design

- Tussenkop intro: "Past een configurator bij jouw bedrijf?"
- Subkop intro: "Doe de Quickscan. 10 stellingen, 2 minuten."
- Knop start: "Start de Quickscan"
- Knop nee: "Niet herkenbaar"
- Knop ja: "Ja, dat zijn wij"
- Tussenscherm: "Even rekenen..."
- Match titel: "It's a match!"
- Match CTA: "Verzenden"
- Kansen titel: "Er liggen kansen voor jullie."
- Kansen CTA: "Stuur mij de analyse"
- Nog niet titel: "Misschien is een configurator nu nog niet jullie prioriteit."
- Nog niet CTA: "Download inspiratiestuk"

## Assets

- Logo Configurator.nl (uit bestaande wireframe v2)
- Foto Gerke, portret 1:1, donkerblauwe achtergrond met gele cirkelvorm. Plaats als gerke-portret.png in dezelfde folder als deze brief. Wordt alleen gebruikt op het matchscherm (14a) en mag in de cirkelcompositie staan.
- Iconen: LinkedIn, vinkje, kruis (gebruik bestaande iconenset uit wireframe v2 indien aanwezig)

## Plaatsing op de website

- Homepage: teaser-blok met één stelling zichtbaar plus button "Doe de Quickscan", linkt naar losse pagina
- Losse pagina: volledige game, eigen URL (bijvoorbeeld configurator.nl/quickscan), eigen tracking en eigen meta-tags voor advertenties

Einde brief.
