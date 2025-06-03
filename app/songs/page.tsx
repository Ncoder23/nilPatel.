import { createClient } from '@/lib/supabase'

export default async function Page() {
  console.log("Starting Supabase connection...")
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("Key length:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length)
  
  const supabase = createClient()
  console.log("Supabase client created")

  try {
    const { data: songs, error } = await supabase.from('songs').select()
    console.log("Query executed")
    console.log("Error if any:", error)
    console.log("Data received:", songs)

    if (error) {
      console.error("Supabase error:", error)
      return <div>Error loading songs: {error.message}</div>
    }

    return (
      <ul>
        {songs?.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    )
  } catch (e) {
    console.error("Unexpected error:", e)
    return <div>An unexpected error occurred</div>
  }
}
