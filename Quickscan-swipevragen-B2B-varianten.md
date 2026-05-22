# Swipegame Quickscan — B2B varianten

*Drie sets van 10 swipe-stellingen voor de Quickscan op Configurator.nl. Elke set heeft een eigen toon en is geschikt voor een ander type bezoeker. De stellingen zijn opgebouwd in oplopende kwalificatie: van algemene herkenning naar concrete pijn en koopbereidheid. Doel: "It's a match" met Willem.*

---

## Hoe te gebruiken

- Bezoeker swipet per stelling rechts (JA, herkenbaar) of links (nee).
- Match-logica is voor alle drie de varianten identiek (zie onder).
- Kies één variant, of A/B-test ze tegen elkaar.
- Houd het aantal stellingen op 10 — boven de 12 daalt de completion-rate hard.

### Match-logica

- **8–10× rechts** → *"It's a match! Willem belt je deze week."* Volledig contactformulier (naam, telefoon, LinkedIn).
- **5–7× rechts** → *"Er liggen kansen — Willem stuurt je een korte analyse."* E-mail-only formulier.
- **≤4× rechts** → *"Misschien is een configurator nog niet je prioriteit."* Soft CTA: inspiratiestuk of nieuwsbrief.

---

## Variant A — B2B Klassiek

*Toon: zakelijk, neutraal, geschikt voor industrie, maakbedrijven, groothandel en technische sectoren. Feitelijk en herkenbaar voor inkopers, sales-directeuren en operationeel verantwoordelijken.*

| # | Stelling (swipe rechts = JA) | Doel van de vraag |
|---|---|---|
| 1 | Ons assortiment is complex, modulair of bevat veel maatwerk. | Is er iets te configureren? |
| 2 | Een offerte opstellen kost gemiddeld meer dan een uur. | Pijn rond doorlooptijd. |
| 3 | Onze klanten kopen pas na meerdere contactmomenten met sales. | Lange salescyclus. |
| 4 | Sales en engineering rekenen vaak dezelfde dingen opnieuw uit. | Repeterend rekenwerk. |
| 5 | Fouten in offertes of orders kosten ons regelmatig marge. | Foutreductie als businesscase. |
| 6 | We willen onze inkoop- of productieprijzen zelf kunnen beheren. | Eigenaarschap rekenregels. |
| 7 | We werken met dealers, partners of meerdere verkoopkanalen. | Multi-channel B2B. |
| 8 | We willen klanten zelf laten samenstellen, ook buiten kantooruren. | 24/7 schaalbaarheid. |
| 9 | Een koppeling met ons ERP, CRM of PIM is voor ons belangrijk. | Integratie-eis. |
| 10 | We willen dit jaar concrete stappen zetten richting digitalisering. | Koopbereidheid / timing. |

---

## Variant B — B2B Modern / Punchy

*Toon: energiek, ondernemend, ik-vorm. Geschikt voor scale-ups, commerciële teams en bedrijven met een actieve marketing-mindset. Past goed bij Configurator.nl als merk dat het anders durft te doen.*

| # | Stelling (swipe rechts = JA) | Doel van de vraag |
|---|---|---|
| 1 | Mijn product is té goed voor een simpele productpagina. | Trots + complexiteit. |
| 2 | Ik wil dat een prospect 's avonds om 23.00 uur ook kan kopen. | Always-on sales. |
| 3 | Onze beste verkoper besteedt te veel tijd aan offertes uittypen. | Senior sales beter benutten. |
| 4 | Ik wil dat mijn website laat zíen wat we allemaal kunnen. | Etalage-functie. |
| 5 | Ons sales-team zegt te vaak "dat moet ik even uitzoeken". | Kennis ontsluiten. |
| 6 | Ik geloof in een no-nonsense ROI binnen 12 maanden. | Zakelijk denkraam. |
| 7 | Ik wil niet afhankelijk zijn van één bouwer voor onderhoud. | Toekomstvastheid. |
| 8 | Mijn klanten zijn professionals — geen consumenten. | Bevestiging B2B-context. |
| 9 | Ik wil dit kwartaal nog een eerste demo of sessie inplannen. | Heet of warm. |
| 10 | Als dit werkt, schaal ik het door naar andere productlijnen. | Lifetime value voor Configurator.nl. |

---

## Variant C — B2B Pijn-gedreven

*Toon: confronterend, herkenbaar, vertrekkend vanuit frustratie. Geschikt voor bedrijven die nog op het randje van "ik weet niet of dit voor mij is" staan en getriggerd worden door pijn-erkenning. Sterk voor retargeting-campagnes.*

| # | Stelling (swipe rechts = JA) | Doel van de vraag |
|---|---|---|
| 1 | We verliezen leads omdat ons aanbod te ingewikkeld lijkt. | Conversieprobleem. |
| 2 | Onze offertes zijn niet altijd consistent tussen verkopers. | Inconsistentie / risico. |
| 3 | Nieuwe medewerkers hebben maanden nodig om het assortiment te kennen. | Onboarding-pijn. |
| 4 | We zeggen "nee" tegen leads waar we eigenlijk "ja" op willen zeggen. | Verloren omzet. |
| 5 | Er gaat te veel tijd zitten in vragen die de website kan beantwoorden. | Tijdsverlies sales. |
| 6 | We hebben geen actueel overzicht van wat een product écht oplevert. | Marge-inzicht. |
| 7 | Onze concurrent ziet er digitaal slimmer uit dan wij. | Concurrentiedruk. |
| 8 | Onze klanten willen zelf rekenen — wij zijn daar nog niet klaar voor. | Klantverwachting. |
| 9 | We hebben de data en regels wel, maar ze zitten in iemands hoofd. | Tribal knowledge. |
| 10 | Als we niks doen, lopen we komend jaar opnieuw kansen mis. | Urgentie. |

---

## Designbriefing — voor Claude Design

### Visuele opbouw per kaart
- Eén stelling per kaart, gecentreerd, ruim wit (zwart op geel of zwart op wit).
- Onder de stelling: twee buttons of swipe-indicator (links = nee, rechts = ja).
- Progress-indicator bovenaan ("Vraag 3 van 10") — verhoogt voltooiingsrate.
- Optioneel: zachte animatie / micro-interactie bij swipe (tilt + fade).

### Mobiel first
- De bestaande Happy Horizon-game is mobiel ontworpen — neem dat als baseline.
- Knoppen minimaal 48×48 px, swipe-treshold ±30% van de kaartbreedte.
- Geen hover-states; alles touch-first.

### Branding
- Configurator.nl geel als accentkleur (achtergrond of swipe-rechts).
- Navy / donkerblauw voor tekst en CTA's, conform de It's-a-match-pagina.
- Foto van Willem alleen op de match-eindpagina, niet tussendoor.

### Eindscherm
- Toon de uitslag (match / kansen / nog niet) met één regel motivatie.
- Bij "match": formulier zoals de huidige It's-a-match-pagina (naam, telefoon, LinkedIn-URL, JA-checkbox).
- Optioneel: "opnieuw spelen" of "deel deze game".

### Tracking
- Meet completion-rate, dropout-vraag, en match-uitkomst per variant.
- Push de uitkomst per stelling door naar HubSpot of het CRM — waardevolle leadcontext voor Willem.
