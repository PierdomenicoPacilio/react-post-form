import React, { useState } from "react";
import axios from "axios";

function App() {

  // variabili reattive dell'oggetto del form e del messaggio
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    body: "",
    public: false,
  });
  const [message, setMessage] = useState("");


  // funzione che alla modifica di un campo del form modifica l'oggetto
  // da inviare successivamente all'api
  function handleChange(event) {
    // vengono compilati i vari campi
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;
    const name = input.name;

    // viene compilato l'oggetto
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {

    // preveniamo il ricaricamento della pagina all'invio del form
    event.preventDefault();

    // chiamata all'Api con axios.post e risposta a schermo del risultato
    // sia positivo che negativo
    axios
      .post("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", formData)
      .then((response) => {
        console.log("Dati inviati:", response.data);
        // il messaggio a schermo scopare dopo 3sec
        setMessage("Post inviato!");
        setTimeout(() => setMessage(""), 3000);
        // i campi del form tornano vuoti depo l'invio
        setFormData({
          author: "",
          title: "",
          body: "",
          public: false,
        });
      })

      .catch((error) => {
        console.error("Errore durante l'invio:", error);
        setMessage("Errore durante l'invio del post, riprova.");
      });
  }

  return (
    <>

      <h1>Crea un nuovo post</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Autore:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Titolo:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Testo:</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="public"
              checked={formData.public}
              onChange={handleChange}
            />
            Rendi pubblico
          </label>
        </div>

        <button type="submit">Invia</button>

      </form>

      {message && <p>{message}</p>}
    </>
  );
}

export default App;