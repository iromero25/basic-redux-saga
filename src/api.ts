// change this to handle baseURl when in heroku
export const getAllNotes = async () => {
  try {
    const result = await fetch("http://localhost:3000/api/notes");
    return await result.json();
  } catch (e) {
    return console.error(e);
  }
};
