export const encodeSquad = (factionName, squad) => {
    const squadData = {
      faction: factionName,
      ships: squad,
    };
    return btoa(JSON.stringify(squadData)); // Codificamos el objeto a Base64
  };
  
  export const decodeSquad = (encodedData) => {
    try {
      const decoded = atob(encodedData); // Decodificamos desde Base64
      return JSON.parse(decoded); // Convertimos la cadena en un objeto
    } catch (e) {
      console.error("Error al decodificar el escuadrón:", e);
      return null;
    }
  };