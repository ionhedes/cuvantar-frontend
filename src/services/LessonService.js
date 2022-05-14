function getLessons() {

    // should we save every batch of reviews in the session storage?
    // that way we won't have to query the backend for reviews twice (when starting reviews and when ending them)
    // also we will be able to correlate the answer booleans and the cards

    return [
        { word: "sare", translation: "salt", definition: "Substanță cristalină, sfărâmicioasă, solubilă în apă și cu gust specific, care constituie un condiment de bază în alimentație și este folosită în industria conservelor, în tăbăcărie, în industria chimică clorură de sodiu" },
        { word: "lac", translation: "lake", definition: "Întindere mai mare de apă stătătoare, închisă între maluri, uneori cu scurgere la mare sau la un râu" },
        { word: "avion", translation: "plane", definition: "Aeronavă mai grea decât aerul, susținută de aripi și propulsată de motoare" },
        { word: "borcan", translation: "jar", definition: "Vas (cilindric) de sticlă (sau de lut, de faianță etc.), fără toartă, larg la gură și cu marginile ușor răsfrânte, folosit pentru păstrarea conservelor, a preparatelor farmaceutice"},
        { word: "cer", translation: "sky", definition: "Spațiu cosmic nesfârșit în care se află aștrii; (mai ales) spațiu de deasupra orizontului unui observator, care are o formă aparent emisferică, boltă cerească"},
    ];
}

function* getLessonsGenerator() {

    let list = getLessons();

    yield* list;
}

export default getLessonsGenerator;