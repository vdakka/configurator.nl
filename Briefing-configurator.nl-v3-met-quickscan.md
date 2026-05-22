# Briefing configurator.nl, v3 met geïntegreerde Quickscan swipe game

Documentversie 3, mei 2026. Wijzigingen ten opzichte van v2:

- /quickscan is geen placeholder meer, maar een volledig uitgewerkte swipe game
- Nieuwe content-sectie CONTENT QUICKSCAN
- Nieuwe componenten in DATA-COMPONENTEN: SwipeCard, ProgressBar, RoundActionButton, ResultScreen, QuickscanForm
- Animaties uitgebreid met swipe-interacties
- /content/quickscan/ subfolder toegevoegd
- SEO meta toegevoegd voor /quickscan
- Werkvolgorde aangepast: quickscan is nu stap 6 in plaats van placeholder

═══════════════════════════════════════════════════════════════

Bouw configurator.nl. Het is een specialisme-site onder Happy Horizon, vergelijkbaar in opzet met shopify.happyhorizon.com. Doel: SEO-autoriteit opbouwen rond productconfiguratoren en kwalitatieve leads binnenhalen.

## BIJLAGEN

- Configurator_nl_Wireframe_v2.html (homepage wireframe, leidend voor structuur en interacties)
- Aanpak_-_Discovery.html (Discovery-pagina wireframe)
- Happy_Horizon_-_Visuele_identiteit.pdf (brand guide)
- gerkevandenakker_happyhorizon_com.jpg (foto Gerke, placeholder, vervangen voor go-live)

## TECH STACK

- Next.js 14 met App Router, TypeScript
- Tailwind CSS
- Framer Motion voor animaties (inclusief swipe-interacties op /quickscan)
- MDX-based content in /content (frontmatter + body), zodat ik teksten los van code kan aanpassen
- Stellingen en match-logica van de quickscan in /content/quickscan/statements.json, zodat aanpassen zonder code-deploy kan
- Deploy-target: Vercel
- Plausible-stub voor analytics (geen tracking pixels)
- Geef in je README een korte motivatie voor je technische keuzes (Next.js boven Astro, MDX boven Sanity, Framer Motion boven react-spring, etc.) zodat ik kan beoordelen of je advies past

## HUISSTIJL

- Happy Blue #070733 als hoofdkleur (achtergronden, typografie)
- Happy Yellow #FCE512 als accent (CTA's, highlights, swipe rechts)
- Happy White #FFFFFF
- Happy Grey #F2F4F6 voor secundaire achtergronden
- Happy Sec #5E5E7A voor secundaire tekst en bronvermeldingen
- Secundaire kleuren beschikbaar maar niet dominant gebruiken: Happy Blue 1 #70B8FF, Happy Purple 1 #BB99FF, Happy Salmon 1 #FA8072 (Salmon mag worden gebruikt voor het swipe-links signaal op /quickscan)
- Fonts: Mont (primair, lokale @font-face) en Montserrat (fallback, Google Fonts)
- Headings: Mont Bold, ruime line-height, durf groot te gaan
- Body: Montserrat Regular
- Geen em-dashes in copy of generatieve elementen (gebruik komma's, punten of nieuwe zin)

## PAGINASTRUCTUUR

- / (homepage)
- /aanpak (Discovery-pagina)
- /cases (overzicht, lay-out conform shopify.happyhorizon.com/cases)
- /cases/[slug] (case-detail, template, eerste invulling Intergamma)
- /contact (drie ingangen: quickscan, gesprek, Discovery)
- /quickscan (volwaardige swipe game, geen placeholder)
- /branches/b2b en /branches/b2c (placeholder pagina's voor SEO-routing, later inhoudelijk uitwerken)

═══════════════════════════════════════════════════════════════
CONTENT HOMEPAGE
═══════════════════════════════════════════════════════════════

### HERO

H1: Configuratoren die werken. Voor je klant én je bedrijfsproces.

Subkop: Guided selling, configuratie en visualisatie in één. Strak geïntegreerd in je systeemlandschap. Wij bouwen configurators die niet stoppen bij de "voeg toe aan winkelwagen"-knop, maar door je hele organisatie heen werken.

Primaire CTA: Doe de quickscan
Secundaire CTA: Plan een gesprek met Gerke
Beide CTA's visueel gelijkwaardig naast elkaar.

Direct onder de CTA's, een stat-strip met drie cijfers:

- 50-90% sneller quote-to-order proces
- 30-80% minder orderfouten door validatie
- Weken in plaats van maanden tot time-to-market

Onder de strip in kleine grijze tekst: "Bron: Forrester Total Economic Impact of CPQ, Gartner CPQ Market Guide, Salesforce State of Sales."

### SECTIE: WAT EEN CONFIGURATOR ÉCHT IS

H2: Een configurator is geen formulier. Het is jouw digitale adviseur.

Lede: De meeste configurators kunnen één ding goed. Guided selling, óf configuratie, óf visualisatie. Wij geloven dat een configurator pas écht waarde levert als die drie samenkomen, en als hij praat met de systemen waar de rest van je bedrijf op draait.

Drie blokken naast elkaar:

Blok 1, H4: Guided selling
Body: Je klant weet vaak nog niet wat hij precies wil. De configurator stelt de juiste vragen, in de juiste volgorde, en helpt hem naar het beste product voor zijn situatie.

Blok 2, H4: Configuratie
Body: Regels, varianten, afhankelijkheden, prijzen. De configurator valideert in realtime, voorkomt onmogelijke combinaties en vertaalt keuzes direct naar productiegegevens.

Blok 3, H4: Visualisatie
Body: Wat je samenstelt, zie je gebeuren. Geen abstracte selectievelden, maar een product dat letterlijk vorm krijgt op het scherm. Vertrouwen omhoog, twijfel omlaag.

Afsluitende alinea onder de drie blokken: "Drie disciplines, één configurator. Daar bovenop een integratie-laag met je ERP, PIM, CRM en productie. Bedrijven die dit goed doen, zien volgens Forrester 10 tot 30 procent hogere conversie van quote naar order. Wij kennen die systemen, want we bouwen er al twintig jaar mee."

### SECTIE: MARKTVERSCHUIVING

H2: De configurator verschuift van verkooptool naar bedrijfsproces.

Drie korte stellingen op een rij:

H4: Van losse tool naar kern van het proces
Body: De configurator raakt sales, productie, ERP en service. Hij is geen apart eilandje, hij is de motor.

H4: Van maatwerk naar herbruikbaar platform
Body: Eén configurator-laag voor meerdere productgroepen, merken of landen. Schaalbaar, niet projectmatig.

H4: Van catalogus naar bron van waarheid
Body: Productregels en data leven in de configurator. Andere systemen luisteren mee.

Sluitalinea onder de rij: "De cijfers ondersteunen wat wij in de praktijk zien. Forrester en Gartner meten 20 tot 40 procent minder sales effort per order en 5 tot 15 procent hogere gemiddelde orderwaarde bij goed geïntegreerde configurators. Dat is geen verkooptool meer, dat is procesverbetering."

### SECTIE: WANNEER WEL OF NIET

H2: Niet voor elk product is een configurator de juiste keuze.

Lede: Een eerlijk antwoord vooraf bespaart een hoop geld en frustratie achteraf. Dit is hoe wij erover denken.

Linker kolom (groen), H3: Wanneer een configurator zichzelf terugverdient

- Je product heeft veel varianten of afhankelijkheden
- Maatwerk is herhaalbaar
- Fouten in offertes of orders zijn kostbaar
- Je wilt opschalen zonder evenredig meer mensen
- Je sales-team is bottleneck geworden in het proces

Klein-tekst onder de lijst: "Forrester ziet bij dit type bedrijven 50 tot 90 procent snellere quote-to-order doorlooptijden en 30 tot 80 procent minder orderfouten."

Rechter kolom (rood), H3: Wanneer een ander instrument slimmer is

- Elk product is volledig uniek
- Volumes zijn structureel laag
- Productlogica laat zich niet standaardiseren
- Je hebt eerst je data en processen op orde nodig

Afsluitende alinea onder de kolommen: "Twijfel je in welke kant je valt? Dat stellen we samen vast in een Discovery. Wij adviseren ook eerlijk als bouwen nu niet logisch is."

CTA-knop: Start met een quickscan

### SECTIE: DISCOVERY OP HOMEPAGE

H2: Een configurator bouwen begint niet bij code. Het begint bij Discovery.

Lede: Voor we ook maar één scherm tekenen, brengen we vier assen samen. Strategie, Mensen, Proces en Technologie. Pas als die kloppen, weten we wat we bouwen, voor wie, en waarom.

Behoud de vier-assen animatie zoals in de bestaande wireframe.

CTA-knop onder de animatie: Lees meer over onze aanpak

### SECTIE: CASES

H2: Wat we hebben gebouwd. En wat het opleverde.

Lede: Verschillende branches, verschillende systeemlandschappen. Eén gemene deler: guided selling, configuratie en visualisatie die in elkaar grijpen.

Case 1, H3: Intergamma raamdecoratie
Body: Zeven productgroepen, drie merken, meerdere leveranciers. Realtime prijs- en productvalidatie, gekoppeld aan dealer-voorraden en productiesystemen. Volledig in de eigen schil, geen iframes, geen externe redirects.

Cases 2-4 (placeholder, behoud uit huidige wireframe): Van Raam, Fetim, Mepal.

CTA: Bekijk alle cases

### SECTIE: CONTACT-CTA BLOK

H2: Daag ons uit met jouw configurator-vraagstuk.

Drie ingangen naast elkaar:

H3: Doe de quickscan
Body: Tien vragen, vijf minuten. Direct inzicht of een configurator bij jouw situatie past, en welke as je het eerst moet aanpakken.

H3: Plan een gesprek
Body: Een uur sparren met Gerke. Geen sales pitch, wel concrete adviezen die je morgen kunt gebruiken.

H3: Start een Discovery
Body: Vier tot zes weken. Vaste scope, vaste prijs. Een onderbouwd plan, een klikbaar prototype, en een go of no-go advies.

═══════════════════════════════════════════════════════════════
CONTENT DISCOVERY-PAGINA (/aanpak)
═══════════════════════════════════════════════════════════════

### HERO

H1: Onze aanpak: van vraag naar werkende configurator-propositie.
H2: Een gestructureerd onderzoek voor we ook maar één scherm tekenen.

Lede alinea 1: Een configurator raakt sales, productie, IT en service. Begin je bij code, dan los je het verkeerde probleem op. Begin je bij Discovery, dan weet je voor het eerste pixel waarom je bouwt wat je bouwt.

Lede alinea 2: De cijfers zijn helder. Forrester, Gartner en Salesforce meten bij goed geïntegreerde configurators 50 tot 90 procent snellere quote-to-order processen, 30 tot 80 procent minder orderfouten en 5 tot 15 procent hogere gemiddelde orderwaarde. Onze taak is om vooraf vast te stellen of jouw situatie zich daarvoor leent, en zo ja, hoe.

### SECTIE: DRIE SCENARIO'S

H4: Je oriënteert je en wil weten of het kan
Body: Je vermoedt dat een configurator past, maar wil het eerst objectief getoetst. Geen vendor-pitch, een eerlijke analyse.

H4: Je hebt een configurator, maar wil hem herzien
Body: Bestaande tool loopt vast. Te veel uitzonderingen, geen visualisatie, niet gekoppeld aan je systemen. Tijd voor een platform met groei-ruimte.

H4: Je hebt een business case, geen plan
Body: Directie is om, budget is er. Nu hard maken hoe dit eruit gaat zien, in welke volgorde, en met welke partners.

### SECTIE: VIER-ASSEN BLOK

H2: Strategie. Mensen. Proces. Technologie.

Lede: Elke as heeft eigen vragen en eigen deliverables. Samen vormen ze het beslismateriaal: bouwen of niet, wat eerst, met welke partners. Wij doorlopen ze altijd alle vier, parallel.

As 1, H3: Strategie. Bedrijfsdoelen en doelgroepen.
Body: Een configurator zonder business case is een mooi project zonder eigenaar. We brengen je markt, je doelen en je doelgroepen scherp in beeld, zodat elke latere ontwerpkeuze terugslaat op iets meetbaars. Hier komt onze marktkennis binnen. We weten wat werkt bij vergelijkbare bedrijven, en wat niet.
ROI-noot: "Dit fundament maakt het verschil tussen 5 en 15 procent verhoging van gemiddelde orderwaarde, en helemaal niets."

As 2, H3: Mensen. Toptaken en user flows.
Body: Een configurator is in de basis een gesprek tussen jou en je klant, in software. We brengen de toptaken in kaart, de momenten van twijfel, en het hulpniveau dat daarbij hoort. Inclusief de mensen aan jouw kant die met de configurator gaan werken. We brengen guided selling-logica in beeld, niet alleen de happy flow.
ROI-noot: "Goed begrip van toptaken correleert direct met 10 tot 30 procent hogere conversie van quote naar order."

As 3, H3: Proces. Architectuur en ketens.
Body: De configurator raakt sales, productie, ERP, service. We ontrafelen waar welke data woont, welke regels valideren wat, en hoe een order door je organisatie loopt. Zonder dit in kaart bouw je een mooi front-end, maar geen schaalbaar systeem. Dit is waar onze integratie-expertise onmisbaar wordt. We kennen je ERP, PIM en CRM van binnenuit.
ROI-noot: "Hier zit het grootste meetbare effect: 50 tot 90 procent snellere quote-to-order doorlooptijden en 30 tot 80 procent minder fouten."

As 4, H3: Technologie. Requirements en stack.
Body: Een technologie-keuze die past bij je team, je horizon en je budget. We toetsen kandidaat-stacks, beoordelen build vs buy, en geven concreet aan welke risico's je waar zit. Headless of API-first is geen religie, het is een keuze. Build, buy of een mix. We adviseren op basis van wat past, niet op basis van met wie wij partner zijn.
ROI-noot: "De juiste stack-keuze bepaalt of je in weken of in maanden naar live gaat."

### SECTIE: TIMELINE

H2: Week voor week. Wat doen wij, wat doen jullie.

Lede: Een Discovery vraagt commitment van beide kanten, niet alleen budget. Hieronder zie je wat we van jou nodig hebben en wat wij parallel uitvoeren.

H4: Week 1, Intake en scope
Body: We brengen vraag, ambitie en context in beeld. Twee korte sessies, geen 80 pagina's vooraf. Aan het eind: een afgebakende Discovery-scope op een A4.

H4: Week 2-4, Vier-assen onderzoek
Body: Parallel werken aan Strategie, Mensen, Proces en Technologie. Workshops, interviews, data-analyse, technische ontdekking. Eén keer per week een sync van 30 minuten.

H4: Week 5, Concept en roadmap
Body: We brengen de vier assen samen tot één configurator-visie, met fasering, kosten en risico's. Optioneel: een klikbaar prototype van het belangrijkste flow.

H4: Week 6, Go of no-go
Body: Presentatie aan jouw stuurgroep of directie. Een onderbouwd advies, geen powerpoint vol opties. Bouwen, fasen, of wachten. We adviseren ook eerlijk als nu niet het juiste moment is.

### SECTIE: WAT KRIJG JE

H2: Wat je aan het eind in handen hebt.

H4: Configurator-visie, Body: Eén plaat. Wat we bouwen, voor wie en waarom. Het anker voor alle latere keuzes.
H4: Vier-assen rapport, Body: Strategie, Mensen, Proces en Technologie. Bevindingen, beslissingen en open vragen.
H4: Architectuurplaat, Body: End-to-end systeemvisie. Welke componenten, welke data, welke koppelingen.
H4: Fasering en roadmap, Body: Drie tot vijf fases. Wat eerst, wat later, met geschatte kosten en doorlooptijden.
H4: Klikbaar prototype, Body: Het belangrijkste flow als interactieve demo. Concrete check op de aannames.
H4: Go of no-go advies, Body: Eerlijk en onderbouwd. Bouwen, fasen, of wachten. Inclusief risico's en aannames.

### SECTIE: INVESTERING

H2: Vaste scope. Vaste prijs. Vier tot zes weken.

Lede: Een Discovery is geen open einde. Voor we starten weet je wat je krijgt, wanneer, en wat het kost. Geen onverwachte meerwerken, geen uitlopende sessies. De investering bepalen we samen, op basis van scope en complexiteit. Vraag een offerte aan of plan een intake met Gerke.

Primaire CTA: Plan een intake met Gerke
Secundaire CTA: Bekijk eerst de quickscan

### SECTIE: FAQ

H2: Wat klanten ons vooraf vragen.

Vraag: Wat kost een Discovery?
Antwoord: Dat hangt af van je scope. Een afgebakende Discovery voor één productgroep verschilt van een meer-merken-traject met complexe systeemintegraties. In de intake bepalen we samen wat past. Vaste scope, vaste prijs vooraf.

Vraag: Waarom kan ik niet direct een configurator-build aanvragen?
Antwoord: Dat kan, maar wij doen het niet zonder Discovery. Te veel projecten gaan onderuit omdat ze beginnen bij het bouwen in plaats van bij het begrijpen. Onze ervaring is dat de Discovery-investering zich altijd terugverdient in scherpere keuzes en lagere bouwkosten.

Vraag: Wat als Discovery uitwijst dat we geen configurator moeten bouwen?
Antwoord: Dan adviseren we dat eerlijk. Dat is voorgekomen, en het is goed besteed geld geweest. Een verkeerd configurator-project kost een veelvoud.

### SECTIE: EIND-CTA

H2: Genoeg gelezen. Tijd voor jouw configurator-vraagstuk.

Twee kaarten:

H3: Plan een vrijblijvend gesprek
Body: Een uur sparren met Gerke over jouw situatie. Geen sales pitch, wel concrete adviezen die je morgen kunt gebruiken.

H3: Start een Discovery-traject
Body: Klaar voor de volgende stap? In vier tot zes weken leveren we een onderbouwd plan, een prototype en een go of no-go advies.

═══════════════════════════════════════════════════════════════
CONTENT QUICKSCAN (/quickscan)
═══════════════════════════════════════════════════════════════

Doel: in maximaal 10 stellingen ontdekt een bezoeker of een productconfigurator past bij zijn situatie. Eindigt in één van drie uitkomsten: It's a match, Er liggen kansen, of Nog niet. Bij match en kansen vraagt het scherm contactgegevens, zodat Gerke kan opvolgen.

Referentie voor toon en interactie: het Happy Horizon swipe-voorbeeld (zie bijlage).

### Flow van schermen

Scherm 1, intro:

- H1: Past een configurator bij jouw bedrijf?
- Subkop: Doe de quickscan. Tien stellingen, vijf minuten.
- Visueel: grote gele cirkelvorm linksachter (zelfde stijl als de Gerke-foto compositie elders op de site)
- Primaire CTA, Happy Yellow met Happy Blue tekst: Start de quickscan
- Microlink onder de CTA: Hoe werkt het? (opent tooltip)

Scherm 2, profielvraag:

- Eén kaart met de vraag: Wie zijn jouw klanten vooral?
- Drie keuzeknoppen, verticaal gestapeld op mobiel, horizontaal op desktop:
  - Vooral zakelijk (B2B)
  - Vooral consumenten (B2C)
  - Beide ongeveer evenveel
- Antwoord bepaalt welke 3 extra stellingen in de set komen (zie set-logica onder)
- Geen progressie-indicator op dit scherm

Scherm 3 tot en met 12, swipe-kaarten (template, 10 herhalingen):

- Bovenaan, gecentreerd: progressie-indicator "Vraag 3 van 10" plus voortgangsbalk in Happy Yellow
- Centraal: de kaart, met ruime witruimte
- Op de kaart:
  - Klein label bovenaan: Stelling
  - Hoofdtekst, groot en gecentreerd: de stelling
  - Onderaan in de kaart, subtiele swipe-hint: Swipe rechts als dit klopt
- Onder de kaart, twee ronde actieknoppen:
  - Links, Happy Salmon cirkel met kruis, label: Niet herkenbaar
  - Rechts, Happy Yellow cirkel met vinkje, label: Ja, dat zijn wij
- Op desktop: keyboard-navigatie met pijl-links en pijl-rechts, plus muisklik op de knoppen
- Optie Vorige als kleine tekstlink linksboven (alleen vanaf vraag 2)

Scherm 13, tussenscherm (optioneel, 1 seconde):

- Volledig scherm in Happy Blue
- Centraal in Happy Yellow: Even rekenen...
- Houdt spanning vast voor de uitslag

Scherm 14a, match (8 tot 10 keer rechts):

- Achtergrond: half wit, half geel, conform de bestaande Happy Horizon "It's a match" pagina
- Foto van Gerke rechtsboven in cirkelcompositie (gerkevandenakker_happyhorizon_com.jpg)
- Titel: It's a match!
- Subtekst: Op basis van jouw antwoorden is er een grote kans dat een configurator jullie verkoopproces flink helpt. Gerke neemt deze week contact op om samen te kijken hoe.
- Formulier:
  - Voor- en achternaam
  - Telefoonnummer
  - Url LinkedIn profiel
  - Checkbox: JA, Gerke mag contact opnemen
- Primaire CTA, Happy Blue: Verzenden
- Onderaan: Volg ons met LinkedIn icoon

Scherm 14b, kansen (5 tot 7 keer rechts):

- Zelfde stijl, andere kop
- Titel: Er liggen kansen voor jullie.
- Subtekst: Een paar van je antwoorden wijzen op duidelijke configurator-kansen. Laat je e-mail achter, dan stuurt Gerke je een korte analyse op maat.
- Formulier korter: alleen voor- en achternaam plus e-mailadres
- Primaire CTA: Stuur mij de analyse

Scherm 14c, nog niet (4 of minder keer rechts):

- Vriendelijke variant, geen formulier
- Titel: Misschien is een configurator nu nog niet jullie prioriteit.
- Subtekst: Geen probleem. Wil je je toch laten inspireren door wat collega's met een configurator hebben bereikt? Download dan het Configurator.nl inspiratiestuk.
- Secundaire CTA: Download inspiratiestuk
- Tertiaire link: Speel opnieuw

Scherm 15, bevestiging na verzending:

- Eenvoudige bedankt-pagina
- Titel: Bedankt, we nemen snel contact op.
- Links: Speel de quickscan opnieuw, of Terug naar de homepage

### Stellingen, totaal 16, per sessie 10 getoond

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

B2B-extras, 3 stellingen (vervangen stelling 5, 6 en 7 bij keuze "Vooral zakelijk"):

- Onze klanten kopen pas na meerdere contactmomenten met sales.
- We werken met dealers, agenten of partners die ook moeten kunnen offreren.
- Een koppeling met ons ERP, CRM of PIM is voor ons belangrijk.

B2C-extras, 3 stellingen (vervangen stelling 5, 6 en 7 bij keuze "Vooral consumenten"):

- Onze klanten willen zelf online samenstellen, zonder hulp van sales.
- Een visuele weergave van het eindproduct is voor onze klanten doorslaggevend.
- Onze klanten haken af als ze de prijs niet direct zien, inclusief BTW.

Bij keuze "Beide ongeveer evenveel": gebruik de kernset, en vervang stelling 6 en 7 door één B2B-extra en één B2C-extra (naar keuze van het algoritme, bijvoorbeeld eerste uit elke lijst).

### Match-logica

- 8 tot 10 keer rechts: It's a match, toon scherm 14a met volledig formulier
- 5 tot 7 keer rechts: Kansen, toon scherm 14b met kort formulier
- 0 tot 4 keer rechts: Nog niet, toon scherm 14c zonder formulier

### Microcopy

- Knop start: Start de quickscan
- Knop nee: Niet herkenbaar
- Knop ja: Ja, dat zijn wij
- Tussenscherm: Even rekenen...
- Match titel: It's a match!
- Match CTA: Verzenden
- Kansen titel: Er liggen kansen voor jullie.
- Kansen CTA: Stuur mij de analyse
- Nog niet titel: Misschien is een configurator nu nog niet jullie prioriteit.
- Nog niet CTA: Download inspiratiestuk

### Tracking

Per sessie loggen via Plausible-stub:

- quickscan_start, quickscan_question_answered (met index en richting), quickscan_dropoff (op welke vraag), quickscan_completed (met score), quickscan_result_match, quickscan_result_kansen, quickscan_result_nognniet, quickscan_form_submitted

Push antwoorden per stelling en eindscore mee als event-properties, zodat Gerke ze later in een dashboard kan terugzien.

═══════════════════════════════════════════════════════════════
ANIMATIES
═══════════════════════════════════════════════════════════════

- Hero: 3D shapes met subtiele float-loop (Happy Yellow en Happy Blue shapes, dieptewerking)
- Stat-strip: count-up animatie bij in-view, ongeveer 1,2 seconden. Voor range-notatie ("50-90%") count-up op het hoogste getal, hele range blijft zichtbaar
- Discovery-framework op homepage en /aanpak: scroll-getriggerde animatie waarbij de vier assen één voor één in beeld komen en verbinden naar een centraal punt. Tap of hover op een as opent de detail-inhoud (zoals in de bestaande wireframe)
- Cases-carousel: smooth horizontal scroll met momentum, geen autoplay
- Quickscan swipe-kaart: drag-gesture met Framer Motion (drag x-as, dragConstraints links/rechts). Bij voldoende drag-afstand (drempel ongeveer 30 procent van de kaartbreedte) of klik op knop: tilt 6 graden in de swipe-richting, fade-out in 250ms, volgende kaart slidet in van onderen in 200ms
- Quickscan voortgangsbalk: smooth fill bij elke nieuwe vraag, 300ms easing
- Quickscan tussenscherm: zachte pulserende dot in Happy Yellow, ongeveer 1 seconde
- Quickscan resultaatscherm: subtiele scale-in van de titel, 400ms ease-out
- Respect prefers-reduced-motion: alle animaties uit, content direct zichtbaar, swipe-kaart vervangen door eenvoudige twee-knoppen-keuze

═══════════════════════════════════════════════════════════════
CTA-HIËRARCHIE
═══════════════════════════════════════════════════════════════

Homepage hero: "Doe de quickscan" en "Plan een gesprek met Gerke" gelijkwaardig naast elkaar.
Eind elke sectie: contextuele CTA passend bij de fase van de sectie (na "wanneer wel of niet" naar quickscan, na cases naar gesprek of Discovery).
Discovery-pagina investering-sectie: "Plan een intake met Gerke" primair, "Bekijk eerst de quickscan" secundair.
Contact-blok homepage: drie CTA's gelijkwaardig (quickscan, gesprek, Discovery).
Sticky CTA in header op alle pagina's: één enkele knop "Plan een gesprek" rechtsboven, met Gerke's foto klein ernaast.
Quickscan resultaatschermen: primaire CTA gelijk aan de match-uitkomst, geen sticky header-CTA op deze pagina (zou afleiden van het formulier).

═══════════════════════════════════════════════════════════════
CONTACTPERSOON
═══════════════════════════════════════════════════════════════

Gerke is het gezicht. Bij CTA's voor gesprekken: "Plan een gesprek met Gerke". Op de contactpagina en in het investering-blok komt een korte bio met foto. Gebruik gerkevandenakker_happyhorizon_com.jpg als placeholder. Markeer als TODO: foto vervangen voor go-live.

Korte bio (te gebruiken naast foto): "Gerke van den Akker, configurator-lead bij Happy Horizon. Twintig jaar ervaring met digitale projecten waar systemen, mensen en processen samenkomen."

═══════════════════════════════════════════════════════════════
DATA-COMPONENTEN
═══════════════════════════════════════════════════════════════

Stat-strip component (herbruikbaar)

- Gebruikt op homepage hero, Discovery-hero, en losse stat-blokken per sectie
- Properties: grote getal-string, omschrijving, optionele bronvermelding
- Stijl: Happy Blue getal, body in Happy Sec (#5E5E7A), ruime witruimte
- Animatie: count-up bij in-view, 1,2 seconden
- Voor ranges count-up op het hoogste getal, hele range blijft zichtbaar
- Op mobiel: stack verticaal, max één kolom

Bron-vermelding component

- Voet onder elke stat-set
- Klein (text-sm), Happy Sec kleur, italic
- Default content: "Bron: Forrester Total Economic Impact of CPQ, Gartner CPQ Market Guide, Salesforce State of Sales."

SwipeCard component (quickscan)

- Properties: index, totalCount, statementText, onSwipe(richting)
- Gebaseerd op Framer Motion drag-gesture
- Mobiel en desktop bruikbaar: swipe, klik, of pijltjes
- Toont stelling in Mont Bold, gecentreerd, padding ruim
- Houdt zelf geen state, alleen presentatie en interactie

ProgressBar component (quickscan)

- Properties: currentIndex, totalCount
- Toont label "Vraag X van Y" plus een visuele balk
- Balk in Happy Yellow op Happy Grey achtergrond
- Smooth fill-animatie bij verandering, 300ms

RoundActionButton component (quickscan)

- Properties: variant ("yes" of "no"), label, onClick
- Variant yes: Happy Yellow cirkel, vinkje-icoon, label "Ja, dat zijn wij"
- Variant no: Happy Salmon cirkel, kruis-icoon, label "Niet herkenbaar"
- Hover en focus state goed zichtbaar

ResultScreen component (quickscan)

- Properties: variant ("match", "kansen", "nognniet"), score
- Variant match en kansen: rendert QuickscanForm (verschillende velden-set)
- Variant nognniet: rendert alleen CTA naar inspiratiestuk plus replay-link
- Foto van Gerke alleen bij variant match en kansen

QuickscanForm component (quickscan)

- Properties: fieldSet ("full" of "short"), onSubmit
- Field set "full": naam, telefoon, LinkedIn URL, akkoord-checkbox
- Field set "short": naam, e-mail
- HTML5 validatie + custom error states in Happy Salmon
- Submit handler: post naar /api/quickscan-submit (placeholder endpoint)

═══════════════════════════════════════════════════════════════
CONTENT-FOLDER OPZET
═══════════════════════════════════════════════════════════════

/content/
├── homepage.mdx
├── aanpak.mdx
├── contact.mdx
├── cases/
│   ├── intergamma-raamdecoratie.mdx
│   ├── van-raam.mdx
│   ├── fetim.mdx
│   └── mepal.mdx
├── quickscan/
│   ├── intro.mdx (titel, subkop, microlink-tekst)
│   ├── profile-question.mdx (vraagtekst en drie keuzelabels)
│   ├── statements.json (alle 16 stellingen, met velden id, text, category: "core" of "b2b" of "b2c", swapIndex: welke kern-stelling deze vervangt)
│   ├── results.mdx (drie resultaat-varianten, elk met titel, subtekst en CTA-tekst)
│   └── microcopy.json (knop-labels, tooltip-teksten, validatie-meldingen)
├── stats.json (zes ROI-cijfers met bronnen)
├── faqs.json (FAQ-items per pagina)
└── team.json (Gerke en eventueel later anderen)

Alle copy uit deze prompt komt in deze files. Verwijs vanuit components naar de MDX/JSON, niet hardcoded in TSX. De quickscan-content moet zonder code-deploy aanpasbaar zijn (productowner kan stellingen wijzigen).

═══════════════════════════════════════════════════════════════
SEO
═══════════════════════════════════════════════════════════════

Per pagina: title, meta-description, OG-tags, canonical, Twitter-card.

Voorgestelde meta-titles:

- Homepage: "Productconfigurator laten bouwen | configurator.nl"
- /aanpak: "Discovery voor productconfigurators | Onze aanpak"
- /cases: "Configurator cases en voorbeelden"
- /contact: "Contact | configurator.nl"
- /quickscan: "Quickscan, past een configurator bij jouw bedrijf?"

Voorgestelde meta-descriptions van max 155 tekens, voorbeeld homepage: "Configurators die werken voor je klant én je bedrijfsproces. Guided selling, configuratie en visualisatie in één, geïntegreerd in je systeemlandschap."

Voor /quickscan: "Tien stellingen, vijf minuten. Ontdek of een productconfigurator past bij jouw bedrijf en welke as je het eerst moet aanpakken."

Schema.org markup:

- Organization op alle pagina's (configurator.nl als brand, Happy Horizon als parent)
- Service op homepage
- FAQPage op /aanpak (FAQ-blok)
- BreadcrumbList op alle subpagina's
- CaseStudy op /cases/[slug]
- Quiz op /quickscan (gebruik Schema.org Quiz-type met hasPart Question)

Sitemap.xml en robots.txt. /quickscan opnemen in sitemap, maar resultaatschermen niet indexeren (noindex via dynamische meta-tag op result-state).

H1 één per pagina, logische H2/H3-hiërarchie zoals hierboven gespecificeerd.

Interne linking: vanuit elke pagina minimaal twee links naar andere relevante pagina's, met contextuele anchor-tekst (niet "klik hier"). Quickscan-pagina linkt aan het eind van het result-scherm bij variant "nognniet" naar /aanpak en /cases.

Semantisch verwante termen verwerken in body copy waar natuurlijk: guided selling, CPQ, product configurator, maatwerk online, headless commerce, API-first, configurator software, configurator laten bouwen, systeemintegratie, ERP-koppeling.

═══════════════════════════════════════════════════════════════
FOOTER
═══════════════════════════════════════════════════════════════

Conform shopify.happyhorizon.com:

- Happy Horizon merklink (rechtsboven)
- Vestigingen: Amsterdam, Arnhem, Den Haag, Eindhoven, Nijmegen, Tilburg, Utrecht (links naar respective HH-pagina's)
- Juridische links: cookiebeleid, privacybeleid, algemene voorwaarden (allemaal naar happyhorizon.com/nl/...)
- Copyright © 2026

═══════════════════════════════════════════════════════════════
ACCESSIBILITY
═══════════════════════════════════════════════════════════════

- WCAG 2.1 AA als minimum
- Kleur-contrast geverifieerd: Happy Blue op Happy Yellow knoppen, Happy Yellow tekst op Happy Blue achtergrond
- Focus-states zichtbaar (yellow outline, niet default browser)
- Alle interactieve elementen tab-bereikbaar
- Alt-tekst op alle visuals
- Reduce motion-support op alle animaties
- Quickscan swipe-gesture heeft volwaardig keyboard- en knop-alternatief, zodat de pagina ook bruikbaar is zonder touch of muis
- Stellingtekst op swipe-kaart altijd voorgelezen door screenreader bij wisseling (aria-live="polite" op de kaart-container)

═══════════════════════════════════════════════════════════════
PERFORMANCE
═══════════════════════════════════════════════════════════════

- Lighthouse-score 90+ op alle vier categorieën (Performance, Accessibility, Best Practices, SEO)
- Lazy-load voor cases-afbeeldingen en framework-animatie
- Quickscan-pagina blijft licht: Framer Motion alleen op deze route inladen (dynamic import), niet in de globale bundle
- Font-display: swap
- Critical CSS inlinen
- Images via Next/Image met passende sizes
- Preconnect naar fonts.googleapis.com

═══════════════════════════════════════════════════════════════
LEVER OP
═══════════════════════════════════════════════════════════════

1. Volledige codebase in een Git-repo (laat me het remote-adres weten)
2. README met:
   - Setup-instructies (Node-versie, install, dev, build)
   - Deploy-instructies (Vercel)
   - Content-update workflow (waar pas ik teksten aan, hoe wijzig ik quickscan-stellingen zonder code-deploy)
   - Hoe voeg ik een nieuwe case toe
   - Motivatie voor je technische keuzes
3. Volledige preview-URL op Vercel zodat ik feedback kan geven
4. Lijst van TODO's en placeholders die ik nog moet aanvullen (foto Gerke vervangen, eventuele case-content uitbreiden, quickscan-submit endpoint koppelen aan echte mail/CRM, etc.)

═══════════════════════════════════════════════════════════════
WERKVOLGORDE
═══════════════════════════════════════════════════════════════

1. Setup project + design system + componenten (header, footer, stat-strip, CTA-knoppen, hero-blok template)
2. Homepage volledig
3. Discovery-pagina volledig
4. Cases-overzicht en eerste case (Intergamma)
5. Contact-pagina
6. Quickscan-pagina volledig (intro, profielvraag, swipe-flow, resultaatschermen, formulieren)
7. Placeholder pagina's voor /branches
8. SEO finalisatie, schema markup, sitemap, robots
9. Performance- en a11y-audit

Lever tussentijds een preview na stap 2, stap 3 en stap 6, zodat ik kan bijsturen voor je verder bouwt. De quickscan vraagt om een extra interactie-check, vandaar de aparte preview na stap 6.

═══════════════════════════════════════════════════════════════
TOON & STIJL
═══════════════════════════════════════════════════════════════

Direct, zakelijk, persoonlijk. "Je", "jij", "wij". Korte zinnen. Geen em-dashes, gebruik komma's, punten of een nieuwe zin. Geen clichés, geen marketing-fluff. Schrijf zoals iemand die zijn vak verstaat en geen tijd verspilt.

Einde briefing.
