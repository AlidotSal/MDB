export default async function (urls) {
  try {
    return await Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    );
  } catch (e) {
    console.error(e);
    return e;
  }
}
