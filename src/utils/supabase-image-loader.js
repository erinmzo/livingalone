const projectId = "nqqsefrllkqytkwxfshk"; // your supabase project id

export default function supabaseLoader({ src, width }) {
  return `${src}?width=${width}&quality=${75}`;
}
