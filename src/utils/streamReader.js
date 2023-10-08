// Create a new TextDecoder instance
const textDecoder = new TextDecoder();

// Create a function to read the stream and convert it to a string
export async function readStreamToString(stream) {
  const reader = stream.getReader();
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += textDecoder.decode(value);
  }
  return result;
}
