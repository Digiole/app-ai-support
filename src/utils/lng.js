const translations = {

  "Example question": { "fi": "Esimerkkikysymys", "sv": "Exempelfråga", "es": "Ejemplo de pregunta." },
  "Nothing was found": { "fi": "Mitään ei löytynyt", "es": "No se encontró nada", "sv": "Inget hittades" },
  "Feedback:": { "fi": "Palaute:", "sv": "Respons:", "es": "Retroalimentación:" },
  "Send": { "fi": "Lähetä", "sv": "Skicka", "es": "Enviar" },
  "Add comment": { "fi": "Lisää kommentti", "sv": "Lägg till kommentar", "es": "Agregar comentario" },
  "Enter comment here": { "fi": "Kirjoita kommentti tähän", "sv": "Skriv kommentar här", "es": "Escriba un comentario aquí" },
  "{{chunks}} chunks were found. Average confidence is {{confidence}}": {
    "fi": "{{chunks}} palaa havaittiin. Keskimääräinen luottamus on {{confidence}}.", "sv": "{{chunks}} segment identifierade. Genomsnittligt förtroende är {{confidence}}.", "es": "{{chunks}} trozos fueron encontrados. La confianza promedio es {{confidence}}."
  },
  "There are no results that match your search criteria. Please try different keywords or broadening your search.": { "fi": "Antamallasi hakusanalla ei löytynyt tuloksia. Ole hyvä ja kokeile eri avainsanoja tai laajenna hakua.", "sv": "Det finns inga resultat som matchar dina sökkriterier. Prova olika sökord eller bredda din sökning.", "es": "No hay resultados que coincidan con tus criterios de búsqueda. Por favor, intenta con palabras clave diferentes o amplía tu búsqueda." },
  "More details could help improve the answer. Please provide additional context or clarification.": { "fi": "Enemmän yksityiskohtia voisi auttaa parantamaan vastausta. Anna lisäkontekstia tai selvennystä, ole hyvä.", "sv": "Ytterligare detaljer kan förbättra svaret. Vänligen ge ytterligare sammanhang eller förtydligande.", "es": "Más detalles podrían ayudar a mejorar la respuesta. Proporcione contexto adicional o aclaraciones, por favor." },
  "The answer can be improved by adding more details to the question.": { "fi": "Vastaus voi parantua lisäämällä enemmän yksityiskohtia kysymykseen.", "sv": "Svaret kan förbättras genom att lägga till mer information i frågan.", "es": "La respuesta puede mejorarse al agregar más detalles a la pregunta." },
  "Your query provided good results from the available content.": { "fi": "Kyselysi antoi hyviä tuloksia saatavilla olevasta sisällöstä.", "sv": "Din fråga gav bra resultat från tillgängligt innehåll.", "es": "Tu consulta proporcionó buenos resultados a partir del contenido disponible." }
}
/* 
if (values && Object.keys(values).length > 0) {
  Object.keys(values).forEach((v) => {
    //console.log("REPLACE ", v);
    const r = new RegExp("{{" + v + "}}", "g");
    //console.log(r);
    res = res.replace(r, values[v]);
  });
  //console.log("REPLACE ", res);
} */

export const __ = (txt, lng = "en", values) => {
  //  console.log("TRANSLATE ", txt, lng, values);
  let res = txt;
  if (translations?.[txt] !== undefined && translations[txt]?.[lng] !== undefined) {
    res = translations[txt][lng];
  }

  if (values && Object.keys(values).length > 0) {
    Object.keys(values).forEach((v) => {
      const r = new RegExp("{{" + v + "}}", "g");
      res = res.replace(r, values[v]);
    });
  }
  return res;
}